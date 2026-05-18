import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

/**
 * Landing page for the server's OAuth callback redirect.
 * URL shape:  /auth/callback?token=<jwt>&returnTo=/some/path
 *
 * We pick up the token from the query string, hand it to AuthContext
 * which stores it and re-fetches /auth/me, then navigate the user to
 * either `returnTo` or back to /signin if anything fails.
 */
export default function AuthCallback(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setToken } = useAuth();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const token = searchParams.get('token');
    const returnTo = searchParams.get('returnTo') ?? '/';
    const error = searchParams.get('oauth_error');

    if (error || !token) {
      navigate(`/signin${error ? `?oauth_error=${encodeURIComponent(error)}` : ''}`, {
        replace: true,
      });
      return;
    }

    (async () => {
      try {
        await setToken(token);
        navigate(returnTo, { replace: true });
      } catch {
        navigate('/signin?oauth_error=Could+not+complete+sign-in', { replace: true });
      }
    })();
  }, [navigate, searchParams, setToken]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-base text-white">
      <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-sm text-muted tracking-widest">
        FINISHING SIGN-IN…
      </p>
    </div>
  );
}
