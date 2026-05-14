import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackToLogin(): JSX.Element {
  return (
    <Link
      to="/signin"
      className="inline-flex items-center gap-2 text-xs text-muted tracking-widest font-semibold uppercase
                 hover:text-white transition-colors"
    >
      <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
      Back to Login
    </Link>
  );
}
