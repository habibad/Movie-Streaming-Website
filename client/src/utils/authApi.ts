import { post } from '@/utils/api';
import type {
  LoginPayload,
  SignupPayload,
  ForgotPasswordPayload,
  VerifyCodePayload,
  ResetPasswordPayload,
  AuthResponse,
} from '@/types';

/* ── Endpoints — adjust paths once your backend routes are defined ── */

export function login(body: LoginPayload): Promise<AuthResponse> {
  return post<AuthResponse, LoginPayload>('/auth/login', body);
}

export function signup(body: SignupPayload): Promise<AuthResponse> {
  return post<AuthResponse, SignupPayload>('/auth/signup', body);
}

export function requestPasswordReset(
  body: ForgotPasswordPayload,
): Promise<{ message: string }> {
  return post<{ message: string }, ForgotPasswordPayload>('/auth/forgot-password', body);
}

export function verifyCode(
  body: VerifyCodePayload,
): Promise<{ verified: boolean }> {
  return post<{ verified: boolean }, VerifyCodePayload>('/auth/verify-code', body);
}

export function resetPassword(
  body: ResetPasswordPayload,
): Promise<{ message: string }> {
  return post<{ message: string }, ResetPasswordPayload>('/auth/reset-password', body);
}

/* ── Local token helpers — same key used in your existing api.ts ─── */

export function storeToken(token: string): void {
  localStorage.setItem('bt_token', token);
}

export function clearToken(): void {
  localStorage.removeItem('bt_token');
}

export function getToken(): string | null {
  return localStorage.getItem('bt_token');
}