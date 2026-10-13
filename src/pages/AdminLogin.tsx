import { useState } from 'react';
import { Lock, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { boutiqueInfo } from '@/data/boutique';
import type { Route } from '@/hooks/useRoute';

type AdminLoginProps = {
  navigate: (r: Route) => void;
  onSuccess: () => void;
};

export function AdminLogin({ navigate, onSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => ({ error: 'Login failed. Please try again.' }));

      if (!res.ok) {
        setError(data.error || 'Login failed. Please try again.');
        return;
      }

      onSuccess();
    } catch {
      setError('Cannot connect to the backend server. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-5">
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate('home')}
          className="mb-8 flex items-center gap-1.5 text-sm text-ink-400 transition-colors hover:text-rose-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </button>

        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="font-serif text-2xl font-light text-ink-900">Admin Login</h1>
            <p className="mt-1 text-sm text-ink-500">{boutiqueInfo.name} Product Management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-ink-500">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-ink-200 bg-ink-50/50 px-4 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-rose-400 focus:bg-white disabled:opacity-50"
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-ink-500">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-ink-200 bg-ink-50/50 px-4 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-rose-400 focus:bg-white disabled:opacity-50"
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm uppercase tracking-wider text-white transition-all hover:bg-rose-600 hover:shadow-lg disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Sign In
                </>
              )}
            </button>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
