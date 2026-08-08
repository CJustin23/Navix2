// Hand-written to mirror supabase/migrations/0001_init.sql. If the schema
// changes, update this file to match (or regenerate with
// `supabase gen types typescript` once the Supabase CLI is wired up).

export type SimulationStatus = 'draft' | 'published' | 'closed';
export type SubmissionSource = 'ai' | 'local';
export type ReferralStatus = 'pending' | 'registered';
export type UserRole = 'student' | 'business';

export interface SimulationCriterionRow {
  name: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface InterviewRound {
  name: string;
  questions: string[];
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; role: UserRole; email: string; phone: string | null; created_at: string };
        Insert: { id: string; role: UserRole; email: string; phone?: string | null };
        Update: Partial<{ phone: string | null }>;
      };
      student_details: {
        Row: {
          profile_id: string;
          full_name: string | null;
          dob: string | null;
          gender: string | null;
          university: string | null;
          major: string | null;
          gpa: string | null;
        };
        Insert: Partial<Database['public']['Tables']['student_details']['Row']> & { profile_id: string };
        Update: Partial<Database['public']['Tables']['student_details']['Row']>;
      };
      business_details: {
        Row: {
          profile_id: string;
          company_name: string | null;
          industry: string | null;
          rep_name: string | null;
          website: string | null;
          tax_code: string | null;
          notes: string | null;
        };
        Insert: Partial<Database['public']['Tables']['business_details']['Row']> & { profile_id: string };
        Update: Partial<Database['public']['Tables']['business_details']['Row']>;
      };
      career_test_results: {
        Row: {
          id: string;
          student_id: string;
          riasec_scores: Record<string, number>;
          top_categories: string[];
          completed_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          riasec_scores: Record<string, number>;
          top_categories: string[];
        };
        Update: never;
      };
      cv_profiles: {
        Row: {
          student_id: string;
          full_name: string | null;
          title: string | null;
          email: string | null;
          phone: string | null;
          university: string | null;
          major: string | null;
          gpa: string | null;
          summary: string | null;
          experience: string | null;
          projects: string | null;
          skills: string[];
          exported_at: string | null;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['cv_profiles']['Row']> & { student_id: string };
        Update: Partial<Database['public']['Tables']['cv_profiles']['Row']>;
      };
      simulations: {
        Row: {
          id: string;
          business_id: string;
          title: string;
          category: string | null;
          position: string | null;
          description: string | null;
          tasks: string[];
          format: string | null;
          criteria: string[];
          status: SimulationStatus;
          deadline: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['simulations']['Row']> & { business_id: string; title: string };
        Update: Partial<Database['public']['Tables']['simulations']['Row']>;
      };
      simulation_submissions: {
        Row: {
          id: string;
          simulation_id: string;
          student_id: string;
          answer_text: string;
          score: number;
          criteria: SimulationCriterionRow[];
          strengths: string[];
          improvements: string[];
          overall: string | null;
          reference_answer: string | null;
          source: SubmissionSource;
          submitted_at: string;
        };
        Insert: Partial<Database['public']['Tables']['simulation_submissions']['Row']> & {
          simulation_id: string;
          student_id: string;
          answer_text: string;
          score: number;
        };
        Update: never;
      };
      interview_templates: {
        Row: {
          id: string;
          business_id: string | null;
          domain: string;
          position: string | null;
          rounds: InterviewRound[];
          status: SimulationStatus;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['interview_templates']['Row']> & { domain: string };
        Update: Partial<Database['public']['Tables']['interview_templates']['Row']>;
      };
      interview_sessions: {
        Row: {
          id: string;
          student_id: string;
          template_id: string | null;
          domain: string;
          position: string | null;
          enterprise_name: string | null;
          started_at: string;
          completed_at: string | null;
        };
        Insert: Partial<Database['public']['Tables']['interview_sessions']['Row']> & {
          student_id: string;
          domain: string;
        };
        Update: Partial<Database['public']['Tables']['interview_sessions']['Row']>;
      };
      interview_answers: {
        Row: {
          id: string;
          session_id: string;
          question_index: number;
          question_text: string;
          answer_text: string;
          score: number;
          strengths: string[];
          improvements: string[];
          reference_answer: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['interview_answers']['Row']> & {
          session_id: string;
          question_index: number;
          question_text: string;
          answer_text: string;
          score: number;
        };
        Update: never;
      };
      referrals: {
        Row: {
          id: string;
          referrer_id: string;
          referred_email: string | null;
          status: ReferralStatus;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['referrals']['Row']> & { referrer_id: string };
        Update: Partial<Database['public']['Tables']['referrals']['Row']>;
      };
      certificates: {
        Row: { id: string; student_id: string; title: string; score: number | null; issued_at: string };
        Insert: { id?: string; student_id: string; title: string; score?: number | null };
        Update: never;
      };
    };
  };
}
