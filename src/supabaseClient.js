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

// Next.js（クライアント側に露出する環境変数は `NEXT_PUBLIC_`）
// ※ 移行期間の互換のため、REACT_APP_ もフォールバックで読めるようにしています。
const supabaseUrl = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL);
const supabaseAnonKey = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY);

function looksLikeSupabaseUrl(value) {
  return /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(value);
}

function looksLikeJwt(value) {
  if (!value) return false;
  const parts = value.split('.');
  return parts.length === 3 && value.length > 40 && value.startsWith('eyJ');
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && looksLikeSupabaseUrl(supabaseUrl) && looksLikeJwt(supabaseAnonKey)
);

export const supabaseConfigWarning = (() => {
  if (!supabaseUrl && !supabaseAnonKey) return '';
  if (!supabaseUrl)
    return 'NEXT_PUBLIC_SUPABASE_URL が未設定です（Vercel/本番は環境変数を設定して再デプロイが必要です）。';
  if (!supabaseAnonKey)
    return 'NEXT_PUBLIC_SUPABASE_ANON_KEY が未設定です（Vercel/本番は環境変数を設定して再デプロイが必要です）。';
  if (!looksLikeSupabaseUrl(supabaseUrl)) return 'Supabase URLの形式が不正っぽいです（例: https://xxxx.supabase.co）。';
  if (!looksLikeJwt(supabaseAnonKey))
    return 'Supabase anon key が不正っぽいです（通常は長いJWTで、"anon public" のキーを使います）。';
  return '';
})();

export const supabase = (() => {
  if (!isSupabaseConfigured) return null;
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to create Supabase client.', error);
    return null;
  }
})();
