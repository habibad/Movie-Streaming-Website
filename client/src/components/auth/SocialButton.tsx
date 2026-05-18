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

function FacebookIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12Z"
      />
      <path
        fill="#fff"
        d="m16.671 15.47.532-3.47h-3.328V9.749c0-.949.465-1.874 1.956-1.874h1.513V4.922s-1.374-.234-2.686-.234c-2.741 0-4.533 1.661-4.533 4.668V12H7.078v3.47h3.047v8.385a12.06 12.06 0 0 0 3.75 0V15.47h2.796Z"
      />
    </svg>
  );
}

const LABELS: Record<AuthProvider, string> = {
  google: 'GOOGLE',
  facebook: 'FACEBOOK',
};

export default function SocialButton({
  provider,
  onClick,
  disabled,
}: SocialButtonProps): JSX.Element {
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
      {provider === 'google' ? <GoogleIcon /> : <FacebookIcon />}
      {LABELS[provider]}
    </button>
  );
}
