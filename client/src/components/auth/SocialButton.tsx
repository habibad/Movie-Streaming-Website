import type { AuthProvider } from '@/types';

interface SocialButtonProps {
  provider: AuthProvider;
  onClick: () => void;
  disabled?: boolean;
}

/* ── Inline brand icons so we don't pull a new dependency ──────── */
function GoogleIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.227c0-.815-.07-1.6-.2-2.354H12v4.45h5.382a4.6 4.6 0 0 1-1.995 3.018v2.509h3.227c1.886-1.738 2.986-4.3 2.986-7.623Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.964-.895 6.614-2.418l-3.227-2.509c-.895.6-2.036.954-3.387.954-2.605 0-4.81-1.76-5.595-4.123H3.073v2.59A9.997 9.997 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.405 13.904A6.012 6.012 0 0 1 6.09 12c0-.659.114-1.3.314-1.904V7.504H3.073A9.997 9.997 0 0 0 2 12c0 1.614.386 3.14 1.073 4.495l3.332-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.973c1.468 0 2.786.504 3.823 1.495l2.868-2.868C16.96 2.99 14.696 2 12 2A9.997 9.997 0 0 0 3.073 7.505l3.332 2.59C7.19 7.732 9.395 5.973 12 5.973Z"
      />
    </svg>
  );
}

function AppleIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.04c-.03-2.83 2.31-4.19 2.42-4.25-1.32-1.92-3.37-2.18-4.1-2.21-1.75-.18-3.41 1.03-4.3 1.03-.89 0-2.26-1-3.71-.97-1.91.03-3.67 1.11-4.65 2.81-1.98 3.43-.51 8.52 1.42 11.31.94 1.37 2.07 2.9 3.55 2.85 1.42-.06 1.96-.92 3.68-.92 1.72 0 2.21.92 3.71.89 1.53-.03 2.5-1.39 3.44-2.77 1.08-1.59 1.53-3.13 1.56-3.21-.03-.02-2.99-1.15-3.02-4.56ZM14.23 3.79c.78-.94 1.31-2.25 1.16-3.55-1.12.05-2.48.74-3.29 1.68-.72.83-1.36 2.17-1.19 3.45 1.26.1 2.54-.64 3.32-1.58Z" />
    </svg>
  );
}

const LABELS: Record<AuthProvider, string> = {
  google: 'GOOGLE',
  apple:  'APPLE',
};

export default function SocialButton({ provider, onClick, disabled }: SocialButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Continue with ${LABELS[provider]}`}
      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                 bg-bg-card border border-line text-white text-sm font-semibold tracking-wider
                 hover:border-gray-500 active:scale-[0.98]
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-all"
    >
      {provider === 'google' ? <GoogleIcon /> : <AppleIcon />}
      {LABELS[provider]}
    </button>
  );
}
