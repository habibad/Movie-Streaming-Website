import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Unlock } from 'lucide-react';
import AuthCard      from '@/components/auth/AuthCard';
import PasswordInput from '@/components/auth/PasswordInput';
import BackToLogin   from '@/components/auth/BackToLogin';
import { resetPassword } from '@/utils/authApi';

interface RouteState {
  email?: string;
  code?: string;
}

export default function ResetPassword(): JSX.Element {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email = '', code = '' } = (state as RouteState) ?? {};

  const [newPassword, setNewPassword]     = useState<string>('');
  const [confirmPassword, setConfirm]     = useState<string>('');
  const [submitting, setSubmitting]       = useState<boolean>(false);
  const [error, setError]                 = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (submitting) return;

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await resetPassword({ email, code, newPassword });
      navigate('/signin');
    } catch {
      setError('Could not reset password. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      icon={<Unlock className="w-7 h-7 text-brand" aria-hidden="true" />}
      title="Security Verification"
      subtitle="Enter the new password"
      footer={<BackToLogin />}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <PasswordInput
          label="New Password"
          placeholder="••••••••"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
          minLength={8}
          required
        />

        <PasswordInput
          label="Re-enter password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
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
          {submitting ? 'Saving…' : 'Next'}
        </button>
      </form>
    </AuthCard>
  );
}
