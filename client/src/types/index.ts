/** Public user shape returned by the API. */
export interface User {
  id: string;
  email: string;
  name: string;
  image: string | null;
  emailVerified: boolean;
  role: 'ADMIN' | 'MODERATOR' | 'USER';
  avatar?: string | null; // Optional alias for `image` to simplify UI code
  createdAt: string;
  // Computed convenience for UI code that still reads `user.isPremium`
  isPremium?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyCodePayload {
  email: string;
  code: string;
  purpose?: 'signup' | 'reset';
}

export interface ResetPasswordPayload {
  email: string;
  code: string;
  newPassword: string;
}

export interface ResendCodePayload {
  email: string;
  purpose?: 'signup' | 'reset';
}

export interface AuthResponse {
  user: User;
  token: string;
}

/** API envelope returned by the backend. */
export interface ApiEnvelope<T> {
  success: true;
  data: T;
  message?: string;
}

export interface NavLink {
  label: string;
  to: string;
}

/** Providers for the SSO buttons. */
export type AuthProvider = 'google' | 'facebook';
