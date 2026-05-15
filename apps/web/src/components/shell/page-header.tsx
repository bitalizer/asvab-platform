import type { ReactNode } from 'react';

type PageHeaderProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  eyebrow?: string;
};

/**
 * Per-page header: eyebrow, title, subtitle, and an optional action slot.
 *
 * Rendered by individual pages (not by the layout) so each page can pass its
 * own copy. The persistent search/notifications/avatar cluster lives in
 * `<Topbar>` inside `(app)/layout.tsx`.
 */
export function PageHeader({ title, subtitle, action, eyebrow }: PageHeaderProps) {
  if (!eyebrow && !title && !subtitle && !action) return null;
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-6 lg:mb-8">
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-ink-3">
            {eyebrow}
          </div>
        )}
        {title && (
          <h1 className="font-display text-3xl lg:text-5xl leading-none tracking-tight text-ink">
            {title}
          </h1>
        )}
        {subtitle && (
          <div className="mt-3 max-w-xl text-base lg:text-lg text-ink-2 leading-relaxed">
            {subtitle}
          </div>
        )}
      </div>
      {action && <div>{action}</div>}
    </header>
  );
}
