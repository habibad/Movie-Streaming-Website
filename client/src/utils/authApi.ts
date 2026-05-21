import api, { post } from '@/utils/api';
import type {
  LoginPayload,
  SignupPayload,
  ForgotPasswordPayload,
  VerifyCodePayload,
  ResetPasswordPayload,
  ResendCodePayload,
  AuthResponse,
  ApiEnvelope,
  AuthProvider,
  User,
} from '@/types';

/* ── Helper to unwrap the {success, data} envelope ─────────── */
async function unwrap<T>(p: Promise<ApiEnvelope<T>>): Promise<T> {
  const res = await p;
  return res.data;
}

/* ── Credential auth ───────────────────────────────────────── */

export function login(body: LoginPayload): Promise<AuthResponse> {
  return unwrap(post<ApiEnvelope<AuthResponse>, LoginPayload>('/auth/login', body));
}

export function signup(body: SignupPayload): Promise<AuthResponse> {
  return unwrap(post<ApiEnvelope<AuthResponse>, SignupPayload>('/auth/signup', body));
}

export async function logout(): Promise<void> {
  await post<ApiEnvelope<null>, Record<string, never>>('/auth/logout', {});
}

export async function getMe(): Promise<User> {
  const res = await api.get<ApiEnvelope<User>>('/auth/me');
  const userData = res.data.data;
  return userData;
}

/* ── Password reset flow ───────────────────────────────────── */

export function requestPasswordReset(
  body: ForgotPasswordPayload,
): Promise<{ message: string }> {
  return post<{ message: string }, ForgotPasswordPayload>('/auth/forgot-password', body);
}

export function verifyCode(
  body: VerifyCodePayload,
): Promise<{ verified: boolean }> {
  return unwrap(
    post<ApiEnvelope<{ verified: boolean }>, VerifyCodePayload>('/auth/verify-code', body),
  );
}

export function resetPassword(
  body: ResetPasswordPayload,
): Promise<{ message: string }> {
  return post<{ message: string }, ResetPasswordPayload>('/auth/reset-password', body);
}

export function resendCode(
  body: ResendCodePayload,
): Promise<{ message: string }> {
  return post<{ message: string }, ResendCodePayload>('/auth/resend-code', body);
}

/* ── OAuth redirect ────────────────────────────────────────── */

/**
 * Send the user to the server's OAuth start URL, which will redirect them
 * to Google / Facebook, then back to /auth/callback on the client.
 */
export function startOAuth(provider: AuthProvider, returnTo: string = '/'): void {
  const base =
    import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/v1';
  const url = new URL(`${base}/auth/${provider}`);
  url.searchParams.set('returnTo', returnTo);
  window.location.href = url.toString();
}

/* ── Local token helpers — same key your old code used ───── */

export function storeToken(token: string): void {
  localStorage.setItem('bt_token', token);
}

export function clearToken(): void {
  localStorage.removeItem('bt_token');
}

export function getToken(): string | null {
  return localStorage.getItem('bt_token');
}
