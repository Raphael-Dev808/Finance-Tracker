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
        getItem: (key) => getAuthStorage().getItem(key),
        setItem: (key, value) => getAuthStorage().setItem(key, value),
        removeItem: (key) => getAuthStorage().removeItem(key),
      },
    },
  });
}

export function setRememberMe(remember: boolean) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(REMEMBER_ME_KEY, String(remember));
  }
}
