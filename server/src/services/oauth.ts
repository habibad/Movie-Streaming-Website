/**
 * OAuth service for Google and Facebook.
 *
 * Implements the Authorization Code flow manually (no passport.js dependency)
 * using native fetch. Both providers follow the same general shape:
 *   1. Redirect user to provider's auth page with our client_id + redirect_uri
 *   2. Provider redirects back to our callback with ?code=...
 *   3. We exchange the code for an access_token
 *   4. We use the access_token to fetch the user's profile
 *   5. We upsert a User + Account in the DB and create a Session
 */

import { AppError } from '../middleware/errorHandler';

export type OAuthProvider = 'google' | 'facebook';

export interface OAuthUserProfile {
  providerId: 'google' | 'facebook';
  providerAccountId: string;     // their id on the provider
  email: string;
  emailVerified: boolean;
  name: string;
  image: string | null;
  accessToken: string;
  refreshToken: string | null;
  idToken: string | null;
  accessTokenExpiresAt: Date | null;
  scope: string | null;
}

/* ── Provider configs ────────────────────────────────────────── */

interface ProviderConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
  authUrl: string;
  tokenUrl: string;
  userInfoUrl: string;
}

function getConfig(provider: OAuthProvider): ProviderConfig {
  if (provider === 'google') {
    const cfg = {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      redirectUri:
        process.env.GOOGLE_REDIRECT_URI ??
        `${process.env.SERVER_URL ?? 'http://localhost:4000'}/api/v1/auth/google/callback`,
      scope: 'openid email profile',
      authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      userInfoUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
    };
    if (!cfg.clientId || !cfg.clientSecret) {
      throw new AppError('Google OAuth is not configured on the server', 500);
    }
    return cfg;
  }

  // facebook
  const cfg = {
    clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
    redirectUri:
      process.env.FACEBOOK_REDIRECT_URI ??
      `${process.env.SERVER_URL ?? 'http://localhost:4000'}/api/v1/auth/facebook/callback`,
    scope: 'email,public_profile',
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    userInfoUrl: 'https://graph.facebook.com/me?fields=id,name,email,picture.type(large)',
  };
  if (!cfg.clientId || !cfg.clientSecret) {
    throw new AppError('Facebook OAuth is not configured on the server', 500);
  }
  return cfg;
}

/* ── Step 1: Build authorization URL ─────────────────────────── */

export function getAuthorizationUrl(provider: OAuthProvider, state: string): string {
  const cfg = getConfig(provider);
  const params = new URLSearchParams({
    client_id: cfg.clientId,
    redirect_uri: cfg.redirectUri,
    response_type: 'code',
    scope: cfg.scope,
    state,
  });

  if (provider === 'google') {
    params.set('access_type', 'offline');
    params.set('prompt', 'consent');
  }

  return `${cfg.authUrl}?${params.toString()}`;
}

/* ── Step 2 + 3: Exchange code for token, fetch profile ──────── */

async function exchangeCodeForToken(
  provider: OAuthProvider,
  code: string,
): Promise<{
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in?: number;
  scope?: string;
}> {
  const cfg = getConfig(provider);

  const body = new URLSearchParams({
    client_id: cfg.clientId,
    client_secret: cfg.clientSecret,
    code,
    redirect_uri: cfg.redirectUri,
    grant_type: 'authorization_code',
  });

  const res = await fetch(cfg.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new AppError(`OAuth token exchange failed: ${errBody}`, 400);
  }
  return res.json() as Promise<{
    access_token: string;
    refresh_token?: string;
    id_token?: string;
    expires_in?: number;
    scope?: string;
  }>;
}

async function fetchGoogleProfile(accessToken: string): Promise<{
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
}> {
  const cfg = getConfig('google');
  const res = await fetch(cfg.userInfoUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new AppError('Failed to fetch Google profile', 400);
  return res.json() as Promise<{
    sub: string;
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
  }>;
}

async function fetchFacebookProfile(accessToken: string): Promise<{
  id: string;
  email?: string;
  name: string;
  picture: { data: { url: string } };
}> {
  const cfg = getConfig('facebook');
  const url = `${cfg.userInfoUrl}&access_token=${encodeURIComponent(accessToken)}`;
  const res = await fetch(url);
  if (!res.ok) throw new AppError('Failed to fetch Facebook profile', 400);
  return res.json() as Promise<{
    id: string;
    email?: string;
    name: string;
    picture: { data: { url: string } };
  }>;
}

/**
 * Top-level: given a `code` from the provider's callback redirect, return the
 * normalized OAuthUserProfile shape ready to upsert into the DB.
 */
export async function exchangeCodeForProfile(
  provider: OAuthProvider,
  code: string,
): Promise<OAuthUserProfile> {
  const tokens = await exchangeCodeForToken(provider, code);

  if (provider === 'google') {
    const profile = await fetchGoogleProfile(tokens.access_token);
    if (!profile.email) {
      throw new AppError('Google account has no email associated', 400);
    }
    return {
      providerId: 'google',
      providerAccountId: profile.sub,
      email: profile.email,
      emailVerified: profile.email_verified ?? true,
      name: profile.name,
      image: profile.picture ?? null,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token ?? null,
      idToken: tokens.id_token ?? null,
      accessTokenExpiresAt: tokens.expires_in
        ? new Date(Date.now() + tokens.expires_in * 1000)
        : null,
      scope: tokens.scope ?? 'openid email profile',
    };
  }

  // facebook
  const profile = await fetchFacebookProfile(tokens.access_token);
  if (!profile.email) {
    throw new AppError(
      'Facebook did not return an email — make sure your app requests the "email" permission.',
      400,
    );
  }
  return {
    providerId: 'facebook',
    providerAccountId: profile.id,
    email: profile.email,
    emailVerified: true, // Facebook only returns emails for verified accounts
    name: profile.name,
    image: profile.picture?.data?.url ?? null,
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token ?? null,
    idToken: null,
    accessTokenExpiresAt: tokens.expires_in
      ? new Date(Date.now() + tokens.expires_in * 1000)
      : null,
    scope: tokens.scope ?? 'email,public_profile',
  };
}
