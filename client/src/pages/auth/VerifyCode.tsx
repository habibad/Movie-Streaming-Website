import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Unlock, Clock } from 'lucide-react';
import AuthCard      from '@/components/auth/AuthCard';
import OtpInput      from '@/components/auth/OtpInput';
import BackToLogin   from '@/components/auth/BackToLogin';
import { useCountdown } from '@/hooks/useCountdown';
import { verifyCode, requestPasswordReset } from '@/utils/authApi';

/* Location-state shape passed in from Sign Up / Forgot Password screens */
interface RouteState {
  email?: string;
  flow?: 'signup' | 'reset';
}

const CODE_TTL_SECONDS = 114; // matches the 01:54 shown in the design

/** Mask "marwen@cinelens.com" → "m***@cinelens.com" for display */
function maskEmail(email: string): string {
  if (!email.includes('@')) return email;
  const [local, domain] = email.split('@');
  const first = local.charAt(0);
  return `${first}***@${domain}`;
}

export default function VerifyCode(): JSX.Element {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email = '', flow = 'signup' } = (state as RouteState) ?? {};

  const [code, setCode] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { formatted, expired, reset } = useCountdown(CODE_TTL_SECONDS);

  const handleVerify = async (): Promise<void> => {
    if (code.length !== 6 || submitting || expired) return;
    setSubmitting(true);
    setError('');

    try {
      await verifyCode({ email, code });
      if (flow === 'reset') {
        navigate('/reset-password', { state: { email, code } });
      } else {
        // Signup verification — straight into the app
        navigate('/');
      }
    } catch {
      setError('Invalid or expired code.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async (): Promise<void> => {
    if (!email) return;
    try {
      await requestPasswordReset({ email });
      setCode('');
      setError('');
      reset();
    } catch {
      setError('Could not resend code.');
    }
  };

  return (
    <AuthCard
      icon={<Unlock className="w-7 h-7 text-brand" aria-hidden="true" />}
      title="Security Verification"
      subtitle={
        <>
          Enter the 6-digit code sent to
          <br />
          <span className="text-white font-medium">{maskEmail(email || 'm***@cinelens.com')}</span>
        </>
      }
      footer={<BackToLogin />}
    >
      <div className="space-y-6">
        <OtpInput
          value={code}
          onChange={setCode}
          onComplete={handleVerify}
          disabled={submitting || expired}
        />

        {/* Countdown */}
        <p className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-widest text-muted uppercase">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          Code expires in{' '}
          <span className={expired ? 'text-brand' : 'text-brand tabular-nums'}>
            {expired ? 'EXPIRED' : formatted}
          </span>
        </p>

        {error && (
          <p role="alert" className="text-sm text-brand text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleVerify}
          disabled={code.length !== 6 || submitting || expired}
          className="btn-primary w-full !py-3 tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'VERIFYING…' : 'VERIFY & ACCESS'}
        </button>

        <div className="text-center text-sm">
          <p className="text-gray-400">Didn't receive the code?</p>
          <button
            type="button"
            onClick={handleResend}
            className="mt-1 text-xs text-white font-semibold tracking-widest underline underline-offset-4
                       hover:text-brand transition-colors"
          >
            RESEND CODE
          </button>
        </div>
      </div>
    </AuthCard>
  );
}
