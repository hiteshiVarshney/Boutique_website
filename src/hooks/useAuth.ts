import { useState, useEffect, useCallback } from 'react';

export type AuthState = {
  authenticated: boolean;
  username: string | null;
  loading: boolean;
};

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    authenticated: false,
    username: null,
    loading: true,
  });

  const checkSession = useCallback(() => {
    return fetch('/api/auth/session', { credentials: 'include' })
      .then((res) => res.json())
      .then((data: { authenticated: boolean; username?: string }) => {
        setAuth({
          authenticated: data.authenticated,
          username: data.username ?? null,
          loading: false,
        });
        return data.authenticated;
      })
      .catch(() => {
        setAuth({ authenticated: false, username: null, loading: false });
        return false;
      });
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {});
    setAuth({ authenticated: false, username: null, loading: false });
  }, []);

  return { auth, checkSession, logout };
}
