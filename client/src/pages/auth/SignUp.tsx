import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '@/components/auth/AuthCard';
import FormInput from '@/components/auth/FormInput';
import PasswordInput from '@/components/auth/PasswordInput';
import SocialButton from '@/components/auth/SocialButton';
import { signup, startOAuth, storeToken } from '@/utils/authApi';
import { useAuth } from '@/context/AuthContext';
import type { AuthProvider } from '@/types';

export default function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!name || !email || !password || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await signup({ name, email, password });
      storeToken(res.token);
      setUser(res.user);
      navigate('/verify-code', { state: { email, flow: 'signup' } });
    } catch (err) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        'Could not create account. Try a different email.';
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
      title="Start Your Cinematic Journey"
      subtitle="Experience premium cultural storytelling."
      footer={
        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <Link
            to="/signin"
            className="text-brand font-bold hover:text-brand-light transition-colors"
          >
            Sign In
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          label="Name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />

        <FormInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <PasswordInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          minLength={8}
          required
        />

        {error && (
          <p role="alert" className="text-sm text-brand text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full !py-3 tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'CREATING ACCOUNT…' : 'CREATE ACCOUNT'}
        </button>
      </form>

      {/* OR SIGN UP WITH divider */}
      <div className="mt-7 flex items-center gap-3" aria-hidden="true">
        <div className="flex-1 h-px bg-line" />
        <span className="text-xs text-muted font-semibold tracking-widest">
          OR SIGN UP WITH
        </span>
        <div className="flex-1 h-px bg-line" />
      </div>

      {/* SSO buttons */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <SocialButton provider="google" onClick={() => handleSso('google')} />
        <SocialButton provider="facebook" onClick={() => handleSso('facebook')} />
      </div>
    </AuthCard>
  );
}
