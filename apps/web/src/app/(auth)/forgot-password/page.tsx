'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthCard } from '@/features/auth';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod/v3';

const forgotSchema = z.object({ email: z.string().email('Enter a valid email') });
type ForgotValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(values: ForgotValues) {
    setSubmitting(true);
    const result = await authClient.requestPasswordReset({
      email: values.email,
      redirectTo: '/reset-password',
    });
    setSubmitting(false);
    if (result.error) {
      toast.error(result.error.message ?? 'Could not send reset link');
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <AuthCard
        title="Check your inbox"
        subtitle="We sent you a link to reset your password. The link expires in 1 hour."
        footer={{ text: 'Wrong email?', linkHref: '/forgot-password', linkText: 'Try again' }}
      >
        <div className="rounded-md border border-line bg-bg-soft p-4 text-sm text-ink-2">
          In development, the reset URL is printed to the server console.
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={{ text: 'Remembered it?', linkHref: '/login', linkText: 'Log in' }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Sending…' : 'Send reset link'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
