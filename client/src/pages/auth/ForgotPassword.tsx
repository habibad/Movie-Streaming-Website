import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard     from '@/components/auth/AuthCard';
import FormInput    from '@/components/auth/FormInput';
import BackToLogin  from '@/components/auth/BackToLogin';
import { requestPasswordReset } from '@/utils/authApi';

export default function ForgotPassword(): JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      await requestPasswordReset({ email });
      // Move to OTP screen and remember which flow + email
      navigate('/verify-code', { state: { email, flow: 'reset' } });
    } catch {
      setError('Could not send reset link. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Forgot Password?"
      subtitle={<>Enter your email address and we'll send<br />you a link to reset your password.</>}
      footer={<BackToLogin />}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          label="Email Address"
          smallCaps
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
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
          className="btn-primary w-full !py-3 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Sending…' : 'Send'}
        </button>
      </form>
    </AuthCard>
  );
}
