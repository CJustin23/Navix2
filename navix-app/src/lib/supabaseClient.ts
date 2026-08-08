import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// True once navix-app/.env.local (or the Vercel project's env vars) actually
// has real values. Exported so the UI can show a "not configured yet" notice
// instead of silently failing.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  // Deliberately NOT throwing here: throwing at module load would crash the
  // whole React tree (blank page) before the user ever sees the UI. Instead
  // we fall back to a placeholder client — every real auth/data call against
  // it will fail with a clear network/auth error (caught by the existing
  // try/catch around each call), which is a far better failure mode while
  // Supabase isn't wired up yet than a blank screen.
  console.warn(
    'Supabase chưa được cấu hình (thiếu VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY trong navix-app/.env.local). ' +
      'Giao diện vẫn hiển thị bình thường, nhưng đăng ký/đăng nhập và mọi thao tác lưu dữ liệu sẽ báo lỗi cho tới khi bạn cấu hình. ' +
      'Xem navix-app/.env.example.'
  );
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'public-anon-key-placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false
    }
  }
);
