import { BRAND } from './brand';
import type { EmailMessage } from './email';

type UserInfo = { name?: string | null; email: string };

export function resetPasswordEmail(user: UserInfo, url: string): EmailMessage {
  return {
    to: user.email,
    subject: `Reset your ${BRAND.name} password`,
    body: `Hi ${user.name ?? 'there'},

Click to reset your password:
${url}

If you didn't request this, ignore this email.`,
  };
}

export function verifyEmail(user: UserInfo, url: string): EmailMessage {
  return {
    to: user.email,
    subject: `Verify your ${BRAND.name} email`,
    body: `Hi ${user.name ?? 'there'},

Click to verify your email:
${url}`,
  };
}
