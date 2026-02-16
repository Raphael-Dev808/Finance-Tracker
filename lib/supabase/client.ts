import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config';

const REMEMBER_ME_KEY = 'ft:rememberMe';

function getAuthStorage(): Storage {
  if (typeof window === 'undefined') return localStorage;
  const remember = localStorage.getItem(REMEMBER_ME_KEY);
  return remember === 'false' ? sessionStorage : localStorage;
}

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: {
        getItem: (key: string) => getAuthStorage().getItem(key),
        setItem: (key: string, value: string) => getAuthStorage().setItem(key, value),
        removeItem: (key: string) => getAuthStorage().removeItem(key),
      },
    },
  });
}

export function setRememberMe(remember: boolean) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(REMEMBER_ME_KEY, String(remember));
  }
}
