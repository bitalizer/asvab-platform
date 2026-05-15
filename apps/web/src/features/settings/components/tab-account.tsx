'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import type { SessionUser } from '@/lib/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod/v3';

// ── Schemas ─────────────────────────────────────────────────────────────────

const changeEmailSchema = z.object({
  newEmail: z.string().email('Enter a valid email'),
});

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ChangeEmailValues = z.infer<typeof changeEmailSchema>;
type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

// ── Sub-components ────────────────────────────────────────────────────────

function ChangeEmailCard({ currentEmail }: { currentEmail: string }) {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<ChangeEmailValues>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: { newEmail: '' },
  });

  async function onSubmit(values: ChangeEmailValues) {
    setSubmitting(true);
    const result = await authClient.changeEmail({
      newEmail: values.newEmail,
      callbackURL: '/settings',
    });
    setSubmitting(false);
    if (result.error) {
      toast.error(result.error.message ?? 'Failed to change email');
      return;
    }
    toast.success('Verification sent — check your new inbox to confirm the change.');
    form.reset();
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <h2 className="font-semibold text-ink">Change email</h2>
      <p className="mt-1 text-sm text-ink-2">Current: {currentEmail}</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Update email'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function ChangePasswordCard() {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  async function onSubmit(values: ChangePasswordValues) {
    setSubmitting(true);
    const result = await authClient.changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      revokeOtherSessions: false,
    });
    setSubmitting(false);
    if (result.error) {
      toast.error(result.error.message ?? 'Failed to change password');
      return;
    }
    toast.success('Password updated.');
    form.reset();
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      <h2 className="font-semibold text-ink">Change password</h2>
      <p className="mt-1 text-sm text-ink-2">
        Choose a strong password you haven&apos;t used before.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="current-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving…' : 'Update password'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function DeleteAccountCard({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');
  const [deleting, setDeleting] = useState(false);

  const confirmed = confirmInput.trim() === userEmail;

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch('/api/account/delete', { method: 'DELETE' });
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        toast.error(body.error ?? 'Failed to delete account');
        setDeleting(false);
        return;
      }
      await authClient.signOut();
      router.push('/login');
    } catch {
      toast.error('Something went wrong. Please try again.');
      setDeleting(false);
    }
  }

  return (
    <div className="rounded-lg border border-destructive/40 bg-surface p-6">
      <h2 className="font-semibold text-destructive">Delete account</h2>
      <p className="mt-1 text-sm text-ink-2">
        Permanently remove your account and all associated data. This cannot be undone.
      </p>
      <div className="mt-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button
                variant="outline"
                className="border-destructive/60 text-destructive hover:bg-destructive/5 hover:text-destructive"
              />
            }
          >
            Delete account
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete account forever?</DialogTitle>
              <DialogDescription>
                This will permanently delete your account and all your data. To confirm, type your
                email address below.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2">
              <Input
                type="email"
                placeholder={userEmail}
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                autoComplete="off"
              />
            </div>
            <DialogFooter>
              <Button variant="danger" disabled={!confirmed || deleting} onClick={handleDelete}>
                {deleting ? 'Deleting…' : 'Delete forever'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// ── Public export ─────────────────────────────────────────────────────────

type AccountTabProps = {
  user: SessionUser;
};

export function AccountTab({ user }: AccountTabProps) {
  return (
    <div className="flex flex-col gap-6">
      <ChangeEmailCard currentEmail={user.email} />
      <ChangePasswordCard />
      <DeleteAccountCard userEmail={user.email} />
    </div>
  );
}
