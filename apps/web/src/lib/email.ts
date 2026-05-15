export type EmailMessage = {
  to: string;
  subject: string;
  body: string;
};

export interface EmailAdapter {
  sendEmail(message: EmailMessage): Promise<void>;
}

class ConsoleEmailAdapter implements EmailAdapter {
  async sendEmail({ to, subject, body }: EmailMessage): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      // Plan 11 replaces this with Resend. Production no-op until then.
      return;
    }
    console.log(`[email] to=${to} subject="${subject}"\n${body}\n`);
  }
}

export const emailAdapter: EmailAdapter = new ConsoleEmailAdapter();
