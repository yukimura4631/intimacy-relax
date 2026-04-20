import { createClient } from '@supabase/supabase-js';

function cleanEnv(value) {
  if (!value) return '';
  const trimmed = String(value).trim();
  const withoutQuotes =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))
      ? trimmed.slice(1, -1)
      : trimmed;
  return withoutQuotes.trim();
}

const supabaseUrl = cleanEnv(process.env.REACT_APP_SUPABASE_URL);
const supabaseAnonKey = cleanEnv(process.env.REACT_APP_SUPABASE_ANON_KEY);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

function looksLikeSupabaseUrl(value) {
  return /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(value);
}

function looksLikeJwt(value) {
  if (!value) return false;
  const parts = value.split('.');
  return parts.length === 3 && value.length > 40 && value.startsWith('eyJ');
}

export const supabaseConfigWarning = (() => {
  if (!supabaseUrl && !supabaseAnonKey) return '';
  if (!supabaseUrl) return 'REACT_APP_SUPABASE_URL が未設定です。';
  if (!supabaseAnonKey) return 'REACT_APP_SUPABASE_ANON_KEY が未設定です。';
  if (!looksLikeSupabaseUrl(supabaseUrl)) return 'Supabase URLの形式が不正っぽいです（例: https://xxxx.supabase.co）。';
  if (!looksLikeJwt(supabaseAnonKey))
    return 'Supabase anon key が不正っぽいです（通常は長いJWTで、"anon public" のキーを使います）。';
  return '';
})();

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
