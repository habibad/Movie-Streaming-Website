import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

let _transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (_transporter) return _transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  _transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT ?? '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return _transporter;
}

export async function sendMail({ to, subject, html, text }: SendMailOptions): Promise<void> {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM ?? 'BlackTree.TV <no-reply@blacktree.tv>';

  if (!transporter) {
    console.log('\n📧  [DEV EMAIL]');
    console.log(`    From:    ${from}`);
    console.log(`    To:      ${to}`);
    console.log(`    Subject: ${subject}`);
    console.log(`    Body:    ${text ?? html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()}\n`);
    return;
  }

  await transporter.sendMail({ from, to, subject, html, text });
}

/* ── Pre-built templates ─────────────────────────────────────── */

function otpTemplate(code: string, purpose: 'signup' | 'reset'): { subject: string; html: string; text: string } {
  const title =
    purpose === 'signup' ? 'Confirm your email' : 'Reset your password';
  const intro =
    purpose === 'signup'
      ? 'Use the code below to finish creating your BlackTree.TV account.'
      : 'Use the code below to reset your BlackTree.TV password.';

  return {
    subject: `${title} — ${code}`,
    text: `${intro}\n\nYour code: ${code}\nThis code expires in 10 minutes.`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:32px;background:#0a0a0a;font-family:Inter,Arial,sans-serif;color:#fff">
  <div style="max-width:480px;margin:0 auto;background:#141414;border:1px solid #232323;border-radius:12px;padding:32px;">
    <h1 style="margin:0 0 8px;font-size:20px;letter-spacing:0.5px;">${title}</h1>
    <p style="margin:0 0 24px;color:#9ca3af;font-size:14px;line-height:1.5;">${intro}</p>
    <div style="text-align:center;padding:20px;background:#0a0a0a;border:1px solid #232323;border-radius:8px;margin-bottom:24px;">
      <div style="font-size:32px;letter-spacing:8px;font-weight:700;color:#fff;font-family:'Courier New',monospace;">${code}</div>
    </div>
    <p style="margin:0;color:#6b7280;font-size:12px;">This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.</p>
  </div>
</body>
</html>`,
  };
}

export async function sendOtpEmail(to: string, code: string, purpose: 'signup' | 'reset' = 'signup'): Promise<void> {
  const { subject, html, text } = otpTemplate(code, purpose);
  await sendMail({ to, subject, html, text });
}
