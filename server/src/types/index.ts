import type { Request } from 'express';

/* ── Auth extensions ─────────────────────────────────────────── */
export interface AuthPayload {
  userId: string;
  email: string;
  sessionId: string;
  role: 'ADMIN' | 'MODERATOR' | 'USER';
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

/* ── Shared API response shapes ──────────────────────────────── */
export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: unknown;
}

/* ── Auth request body types ─────────────────────────────────── */
export interface RegisterBody {
  email: string;
  password: string;
  name: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface ForgotPasswordBody {
  email: string;
}

export interface VerifyCodeBody {
  email: string;
  code: string;
  purpose?: 'signup' | 'reset';
}

export interface ResetPasswordBody {
  email: string;
  code: string;
  newPassword: string;
}

/* ── Other request body types ────────────────────────────────── */
export interface CreateMovieBody {
  title: string;
  description?: string;
  poster: string;
  backdrop?: string;
  category: 'vod' | 'featured' | 'trending';
  genre?: string;
  year?: number;
  duration?: number;
  rating?: number;
  isFeatured?: boolean;
}

export interface CreateActorBody {
  name: string;
  bio?: string;
  image: string;
  nationality?: string;
}

export interface CreateEpisodeBody {
  title: string;
  description?: string;
  thumbnail: string;
  scheduledAt: string;
  endsAt: string;
}

export interface MovieQuery {
  category?: string;
  featured?: string;
  page?: string;
  limit?: string;
}

/* ── Public user shape returned to the client ────────────────── */
export interface PublicUser {
  id: string;
  email: string;
  name: string;
  image: string | null;
  emailVerified: boolean;
  role: 'ADMIN' | 'MODERATOR' | 'USER';
  createdAt: Date;
}
