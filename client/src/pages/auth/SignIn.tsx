import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard       from '@/components/auth/AuthCard';
import FormInput      from '@/components/auth/FormInput';
import PasswordInput  from '@/components/auth/PasswordInput';
import { login, storeToken } from '@/utils/authApi';

export default function SignIn(): JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail]       = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!email || !password || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await login({ email, password });
      storeToken(res.token);
      navigate('/');
    } catch {
      setError('Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Sign In"
      subtitle="Experience premium cultural storytelling."
      footer={
        <p className="text-sm text-gray-400">
          Don't have a account?{' '}
          <Link to="/signup" className="text-brand font-bold hover:text-brand-light transition-colors">
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
    </AuthCard>
  );
}
