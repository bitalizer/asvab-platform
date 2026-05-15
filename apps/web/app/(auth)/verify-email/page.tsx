'use client';

import { AuthCard } from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function VerifyEmailPage() {
  const { data: session } = authClient.useSession();
  const [sending, setSending] = useState(false);

  async function handleResend() {
    if (!session?.user?.email) {
      toast.error('You must be logged in to resend verification.');
      return;
    }
    setSending(true);
    const result = await authClient.sendVerificationEmail({ email: session.user.email });
    setSending(false);
    if (result.error) {
      toast.error(result.error.message ?? 'Could not send verification');
      return;
    }
    toast.success('Verification email sent. Check your inbox.');
  }

  return (
    <AuthCard
      title="Verify your email"
      subtitle="We sent a verification link to your inbox. Click it to confirm your account."
      footer={{ text: 'Already verified?', linkHref: '/dashboard', linkText: 'Go to dashboard' }}
    >
      <div className="rounded-md border border-line bg-bg-soft p-4 text-sm text-ink-2">
        In development, the verification URL is printed to the server console.
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={handleResend}
        disabled={sending}
        className="w-full"
      >
        {sending ? 'Sending…' : 'Resend verification email'}
      </Button>
    </AuthCard>
  );
}
