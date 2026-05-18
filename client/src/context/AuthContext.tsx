import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { User } from '@/types';
import {
  getMe,
  logout as apiLogout,
  clearToken,
  storeToken,
  getToken,
} from '@/utils/authApi';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  /** Set user after a successful login/signup (and persist locally). */
  setUser: (user: User | null) => void;
  /** Re-fetch /auth/me — useful after profile updates or OAuth callback. */
  refresh: () => Promise<void>;
  /** Save a token and re-fetch the user. */
  setToken: (token: string) => Promise<void>;
  /** Log out: clear cookie via API, then wipe local storage. */
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USER_STORAGE_KEY = 'bt_user';

function loadStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function persistUser(u: User | null): void {
  if (u) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u));
  else localStorage.removeItem(USER_STORAGE_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUserState] = useState<User | null>(loadStoredUser);
  const [loading, setLoading] = useState<boolean>(true);

  const setUser = useCallback((u: User | null): void => {
    setUserState(u);
    persistUser(u);
  }, []);

  const refresh = useCallback(async (): Promise<void> => {
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
      clearToken();
    }
  }, [setUser]);

  const setToken = useCallback(async (token: string): Promise<void> => {
    storeToken(token);
    await refresh();
  }, [refresh]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await apiLogout();
    } catch {
      /* even if the API call fails, still wipe the client state */
    }
    setUser(null);
    clearToken();
  }, [setUser]);

  // On mount: if we have a token OR a cookie, try to fetch the current user.
  // Either way, the loading flag flips false at the end so UI can stop showing a spinner.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const hasToken = !!getToken();
      // We try /me regardless of token because the cookie alone can authenticate
      try {
        const me = await getMe();
        if (!cancelled) setUser(me);
      } catch {
        if (!cancelled && !hasToken) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, refresh, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
