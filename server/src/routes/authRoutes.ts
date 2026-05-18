import { Router } from 'express';
import {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  verifyCode,
  resetPassword,
  resendCode,
} from '../controllers/authController';
import { startOAuth, oauthCallback } from '../controllers/oauthController';
import { requireAuth } from '../middleware/auth';

const router = Router();

/* ── Credential auth ─────────────────────────────────────────── */
router.post('/register', register);
router.post('/signup', register);          // alias for the client which uses /auth/signup
router.post('/login', login);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, getMe);

/* ── Password reset / email verification ─────────────────────── */
router.post('/forgot-password', forgotPassword);
router.post('/verify-code', verifyCode);
router.post('/reset-password', resetPassword);
router.post('/resend-code', resendCode);

/* ── OAuth: Google ───────────────────────────────────────────── */
router.get('/google', startOAuth('google'));
router.get('/google/callback', oauthCallback('google'));

/* ── OAuth: Facebook ─────────────────────────────────────────── */
router.get('/facebook', startOAuth('facebook'));
router.get('/facebook/callback', oauthCallback('facebook'));

export default router;
