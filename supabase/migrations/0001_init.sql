-- NAVIX MVP schema — run this once in the Supabase SQL editor (or via the
-- Supabase CLI) on a fresh project. Safe to re-run: every statement is
-- idempotent (IF NOT EXISTS / CREATE OR REPLACE / DROP POLICY IF EXISTS).
--
-- Design notes (see plan for full rationale):
--   * One `profiles` row per auth.users row; role-specific columns live in
--     `student_details` / `business_details` so neither role's fields
--     pollute the other.
--   * No separate "progress" table — journey completion is derived by the
--     app from the existence of rows in these tables (career_test_results,
--     simulation_submissions, cv_profiles.exported_at, etc).
--   * RLS is the actual security boundary: the frontend talks to Postgres
--     directly with the anon key for plain CRUD, so every table must be
--     locked down here, not just in application code.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('student','business')),
  email text not null,
  phone text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- student_details
-- ---------------------------------------------------------------------------
create table if not exists public.student_details (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  full_name text,
  dob date,
  gender text,
  university text,
  major text,
  gpa text
);

alter table public.student_details enable row level security;

drop policy if exists "student_details_select_own" on public.student_details;
create policy "student_details_select_own" on public.student_details
  for select using (auth.uid() = profile_id);

-- A business can see the name/university of a student who has actually
-- submitted to one of that business's own simulations or interview
-- sessions — this is what makes the "Ứng viên tiềm năng" screen real.
drop policy if exists "student_details_select_for_recruiter" on public.student_details;
create policy "student_details_select_for_recruiter" on public.student_details
  for select using (
    exists (
      select 1 from public.simulation_submissions sub
      join public.simulations sim on sim.id = sub.simulation_id
      where sub.student_id = student_details.profile_id
        and sim.business_id = auth.uid()
    )
    or exists (
      select 1 from public.interview_sessions sess
      join public.interview_templates tpl on tpl.id = sess.template_id
      where sess.student_id = student_details.profile_id
        and tpl.business_id = auth.uid()
    )
  );

drop policy if exists "student_details_upsert_own" on public.student_details;
create policy "student_details_upsert_own" on public.student_details
  for insert with check (auth.uid() = profile_id);

drop policy if exists "student_details_update_own" on public.student_details;
create policy "student_details_update_own" on public.student_details
  for update using (auth.uid() = profile_id);

-- ---------------------------------------------------------------------------
-- business_details — company name/industry are not sensitive, so any
-- authenticated user can read them (needed to show "Công ty: NovaTech" on
-- a published simulation card); only the owner can write.
-- ---------------------------------------------------------------------------
create table if not exists public.business_details (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  company_name text,
  industry text,
  rep_name text,
  website text,
  tax_code text,
  notes text
);

alter table public.business_details enable row level security;

drop policy if exists "business_details_select_authenticated" on public.business_details;
create policy "business_details_select_authenticated" on public.business_details
  for select using (auth.role() = 'authenticated');

drop policy if exists "business_details_upsert_own" on public.business_details;
create policy "business_details_upsert_own" on public.business_details
  for insert with check (auth.uid() = profile_id);

drop policy if exists "business_details_update_own" on public.business_details;
create policy "business_details_update_own" on public.business_details
  for update using (auth.uid() = profile_id);

-- ---------------------------------------------------------------------------
-- Auto-create profile + role-specific row on signup, from the metadata
-- passed in supabase.auth.signUp({ options: { data: { role, full_name, ... } } }).
-- security definer so it can write despite the caller not being "logged in"
-- yet at insert time.
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  chosen_role text := coalesce(new.raw_user_meta_data->>'role', 'student');
begin
  insert into public.profiles (id, role, email, phone)
  values (new.id, chosen_role, new.email, new.raw_user_meta_data->>'phone')
  on conflict (id) do nothing;

  if chosen_role = 'student' then
    insert into public.student_details (profile_id, full_name, dob, gender, university, major, gpa)
    values (
      new.id,
      new.raw_user_meta_data->>'full_name',
      nullif(new.raw_user_meta_data->>'dob', '')::date,
      new.raw_user_meta_data->>'gender',
      new.raw_user_meta_data->>'university',
      new.raw_user_meta_data->>'major',
      new.raw_user_meta_data->>'gpa'
    )
    on conflict (profile_id) do nothing;
  else
    insert into public.business_details (profile_id, company_name, industry, rep_name, website, tax_code, notes)
    values (
      new.id,
      new.raw_user_meta_data->>'company_name',
      new.raw_user_meta_data->>'industry',
      new.raw_user_meta_data->>'rep_name',
      new.raw_user_meta_data->>'website',
      new.raw_user_meta_data->>'tax_code',
      new.raw_user_meta_data->>'notes'
    )
    on conflict (profile_id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- career_test_results — one row per completed RIASEC attempt (history kept,
-- "done" signal in the app = at least one row exists for this student).
-- ---------------------------------------------------------------------------
create table if not exists public.career_test_results (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  riasec_scores jsonb not null,
  top_categories text[] not null default '{}',
  completed_at timestamptz not null default now()
);

alter table public.career_test_results enable row level security;

drop policy if exists "career_test_results_owner_all" on public.career_test_results;
create policy "career_test_results_owner_all" on public.career_test_results
  for all using (auth.uid() = student_id) with check (auth.uid() = student_id);

-- ---------------------------------------------------------------------------
-- cv_profiles — one CV per student for MVP.
-- ---------------------------------------------------------------------------
create table if not exists public.cv_profiles (
  student_id uuid primary key references public.profiles(id) on delete cascade,
  full_name text,
  title text,
  email text,
  phone text,
  university text,
  major text,
  gpa text,
  summary text,
  experience text,
  projects text,
  skills text[] not null default '{}',
  exported_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.cv_profiles enable row level security;

drop policy if exists "cv_profiles_owner_all" on public.cv_profiles;
create policy "cv_profiles_owner_all" on public.cv_profiles
  for all using (auth.uid() = student_id) with check (auth.uid() = student_id);

-- A business can view the CV of a student who applied to one of its
-- postings (same pattern as student_details above).
drop policy if exists "cv_profiles_select_for_recruiter" on public.cv_profiles;
create policy "cv_profiles_select_for_recruiter" on public.cv_profiles
  for select using (
    exists (
      select 1 from public.simulation_submissions sub
      join public.simulations sim on sim.id = sub.simulation_id
      where sub.student_id = cv_profiles.student_id
        and sim.business_id = auth.uid()
    )
    or exists (
      select 1 from public.interview_sessions sess
      join public.interview_templates tpl on tpl.id = sess.template_id
      where sess.student_id = cv_profiles.student_id
        and tpl.business_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- simulations — created by a business, published for students to attempt.
-- ---------------------------------------------------------------------------
create table if not exists public.simulations (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  category text,
  position text,
  description text,
  tasks text[] not null default '{}',
  format text,
  criteria text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft','published','closed')),
  deadline date,
  created_at timestamptz not null default now()
);

alter table public.simulations enable row level security;

drop policy if exists "simulations_owner_all" on public.simulations;
create policy "simulations_owner_all" on public.simulations
  for all using (auth.uid() = business_id) with check (auth.uid() = business_id);

drop policy if exists "simulations_select_published" on public.simulations;
create policy "simulations_select_published" on public.simulations
  for select using (status = 'published');

-- ---------------------------------------------------------------------------
-- simulation_submissions — a student's answer + AI/local grading result.
-- ---------------------------------------------------------------------------
create table if not exists public.simulation_submissions (
  id uuid primary key default gen_random_uuid(),
  simulation_id uuid not null references public.simulations(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  answer_text text not null,
  score int not null,
  criteria jsonb not null default '[]',
  strengths text[] not null default '{}',
  improvements text[] not null default '{}',
  overall text,
  reference_answer text,
  source text not null default 'local' check (source in ('ai','local')),
  submitted_at timestamptz not null default now()
);

create index if not exists simulation_submissions_student_idx on public.simulation_submissions (student_id);
create index if not exists simulation_submissions_simulation_idx on public.simulation_submissions (simulation_id);

alter table public.simulation_submissions enable row level security;

drop policy if exists "simulation_submissions_student_all" on public.simulation_submissions;
create policy "simulation_submissions_student_all" on public.simulation_submissions
  for all using (auth.uid() = student_id) with check (auth.uid() = student_id);

drop policy if exists "simulation_submissions_select_for_owner_business" on public.simulation_submissions;
create policy "simulation_submissions_select_for_owner_business" on public.simulation_submissions
  for select using (
    exists (
      select 1 from public.simulations sim
      where sim.id = simulation_submissions.simulation_id
        and sim.business_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- interview_templates — business_id null = generic/system question set
-- (seeded from the existing interviewQuestionsMap catalog).
-- ---------------------------------------------------------------------------
create table if not exists public.interview_templates (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.profiles(id) on delete cascade,
  domain text not null,
  position text,
  rounds jsonb not null default '[]',
  status text not null default 'draft' check (status in ('draft','published','closed')),
  created_at timestamptz not null default now()
);

alter table public.interview_templates enable row level security;

drop policy if exists "interview_templates_owner_all" on public.interview_templates;
create policy "interview_templates_owner_all" on public.interview_templates
  for all using (auth.uid() = business_id) with check (auth.uid() = business_id);

drop policy if exists "interview_templates_select_readable" on public.interview_templates;
create policy "interview_templates_select_readable" on public.interview_templates
  for select using (status = 'published' or business_id is null);

-- ---------------------------------------------------------------------------
-- interview_sessions / interview_answers
-- ---------------------------------------------------------------------------
create table if not exists public.interview_sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  template_id uuid references public.interview_templates(id) on delete set null,
  domain text not null,
  position text,
  enterprise_name text,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists interview_sessions_student_idx on public.interview_sessions (student_id);

alter table public.interview_sessions enable row level security;

drop policy if exists "interview_sessions_student_all" on public.interview_sessions;
create policy "interview_sessions_student_all" on public.interview_sessions
  for all using (auth.uid() = student_id) with check (auth.uid() = student_id);

drop policy if exists "interview_sessions_select_for_owner_business" on public.interview_sessions;
create policy "interview_sessions_select_for_owner_business" on public.interview_sessions
  for select using (
    exists (
      select 1 from public.interview_templates tpl
      where tpl.id = interview_sessions.template_id
        and tpl.business_id = auth.uid()
    )
  );

create table if not exists public.interview_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.interview_sessions(id) on delete cascade,
  question_index int not null,
  question_text text not null,
  answer_text text not null,
  score int not null,
  strengths text[] not null default '{}',
  improvements text[] not null default '{}',
  reference_answer text,
  created_at timestamptz not null default now()
);

create index if not exists interview_answers_session_idx on public.interview_answers (session_id);

alter table public.interview_answers enable row level security;

drop policy if exists "interview_answers_via_own_session" on public.interview_answers;
create policy "interview_answers_via_own_session" on public.interview_answers
  for all using (
    exists (
      select 1 from public.interview_sessions sess
      where sess.id = interview_answers.session_id
        and sess.student_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.interview_sessions sess
      where sess.id = interview_answers.session_id
        and sess.student_id = auth.uid()
    )
  );

drop policy if exists "interview_answers_select_for_owner_business" on public.interview_answers;
create policy "interview_answers_select_for_owner_business" on public.interview_answers
  for select using (
    exists (
      select 1 from public.interview_sessions sess
      join public.interview_templates tpl on tpl.id = sess.template_id
      where sess.id = interview_answers.session_id
        and tpl.business_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- referrals
-- ---------------------------------------------------------------------------
create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.profiles(id) on delete cascade,
  referred_email text,
  status text not null default 'pending' check (status in ('pending','registered')),
  created_at timestamptz not null default now()
);

alter table public.referrals enable row level security;

drop policy if exists "referrals_owner_all" on public.referrals;
create policy "referrals_owner_all" on public.referrals
  for all using (auth.uid() = referrer_id) with check (auth.uid() = referrer_id);

-- ---------------------------------------------------------------------------
-- certificates
-- ---------------------------------------------------------------------------
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  score int,
  issued_at timestamptz not null default now()
);

alter table public.certificates enable row level security;

drop policy if exists "certificates_owner_all" on public.certificates;
create policy "certificates_owner_all" on public.certificates
  for all using (auth.uid() = student_id) with check (auth.uid() = student_id);
