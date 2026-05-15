'use client';

import { AuthCard } from '@/components/auth/auth-card';
import { SsoButtons } from '@/components/auth/sso-buttons';
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
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod/v3';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') ?? '/dashboard';
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: LoginValues) {
    setSubmitting(true);
    const result = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });
    setSubmitting(false);
    if (result.error) {
      toast.error(result.error.message ?? 'Login failed');
      return;
    }
    router.push(next);
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to continue your training."
      footer={{ text: "Don't have an account?", linkHref: '/signup', linkText: 'Sign up' }}
    >
      <SsoButtons />
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-t border-line" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-bg px-2 text-ink-3">or</span>
        </div>
      </div>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-baseline justify-between">
                  <span>Password</span>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-normal text-ink-2 underline-offset-4 hover:underline"
                  >
                    Forgot?
                  </Link>
                </FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="current-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Logging in…' : 'Log in'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
