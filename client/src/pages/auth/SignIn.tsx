import { useState, useEffect, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthCard from '@/components/auth/AuthCard';
import FormInput from '@/components/auth/FormInput';
import PasswordInput from '@/components/auth/PasswordInput';
import SocialButton from '@/components/auth/SocialButton';
import { login, startOAuth, storeToken } from '@/utils/authApi';
import { useAuth } from '@/context/AuthContext';
import type { AuthProvider } from '@/types';

export default function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Pick up OAuth errors that the server may have appended to the redirect
  useEffect(() => {
    const oauthError = searchParams.get('oauth_error');
    if (oauthError) setError(oauthError);
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!email || !password || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await login({ email, password });
      storeToken(res.token);
      setUser(res.user);
      navigate('/');
    } catch (err) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        'Invalid email or password.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSso = (provider: AuthProvider): void => {
    startOAuth(provider, '/');
  };

  return (
    <AuthCard
      title="Sign In"
      subtitle="Experience premium cultural storytelling."
      footer={
        <p className="text-sm text-gray-400">
          Don't have a account?{' '}
          <Link
            to="/signup"
            className="text-brand font-bold hover:text-brand-light transition-colors"
          >
            Sign Up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <div>
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <div className="mt-2 text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-muted hover:text-white underline underline-offset-2 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-brand text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full !py-3 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      {/* OR SIGN IN WITH divider */}
      <div className="mt-7 flex items-center gap-3" aria-hidden="true">
        <div className="flex-1 h-px bg-line" />
        <span className="text-xs text-muted font-semibold tracking-widest">
          OR SIGN IN WITH
        </span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <SocialButton provider="google" onClick={() => handleSso('google')} />
        <SocialButton provider="facebook" onClick={() => handleSso('facebook')} />
      </div>
    </AuthCard>
  );
}
