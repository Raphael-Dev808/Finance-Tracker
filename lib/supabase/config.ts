// Configuração Supabase - usa env ou fallback (necessário pois Next.js às vezes não carrega .env no client)
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://zjnvwudlpfidbhpkgmne.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqbnZ3dWRscGZpZGJocGtnbW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMjg2NTEsImV4cCI6MjA4NjYwNDY1MX0.sv8Cn1PSNvPWPATm2jft0evcFNqeem8gEw2W8iIhcbE';

export { SUPABASE_URL, SUPABASE_ANON_KEY };
