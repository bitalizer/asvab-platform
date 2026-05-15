'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthCard } from '@/features/auth';
import { SsoButtons } from '@/features/auth';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod/v3';

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required').max(80),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  acceptTerms: z.boolean().refine((v) => v === true, { message: 'You must accept the terms' }),
});

type SignupValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', acceptTerms: false },
  });

  async function onSubmit(values: SignupValues) {
    setSubmitting(true);
    const result = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    setSubmitting(false);
    if (result.error) {
      toast.error(result.error.message ?? 'Sign up failed');
      return;
    }
    router.push('/onboarding');
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Join 25,000+ future recruits."
      footer={{ text: 'Already have an account?', linkHref: '/login', linkText: 'Log in' }}
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
                <Label className="text-xs text-ink-2 leading-snug">
                  I agree to the{' '}
                  <a href="/terms" className="underline">
                    Terms
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="underline">
                    Privacy Policy
                  </a>
                  .
                </Label>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Creating account…' : 'Create account'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
