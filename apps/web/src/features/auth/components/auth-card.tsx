import { BRAND } from '@/lib/brand';
import Link from 'next/link';
import type { ReactNode } from 'react';

type AuthCardProps = {
  title: string;
  subtitle?: string;
  footer?: { text: string; linkHref: string; linkText: string };
  children: ReactNode;
};

export function AuthCard({ title, subtitle, footer, children }: AuthCardProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="lg:hidden">
        <div className="text-lg font-display font-bold tracking-tight text-ink">{BRAND.name}</div>
      </div>
      <div>
        <h1 className="font-display text-3xl leading-tight tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-ink-2">{subtitle}</p>}
      </div>
      {children}
      {footer && (
        <div className="text-sm text-ink-2">
          {footer.text}{' '}
          <Link
            href={footer.linkHref}
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            {footer.linkText}
          </Link>
        </div>
      )}
    </div>
  );
}
