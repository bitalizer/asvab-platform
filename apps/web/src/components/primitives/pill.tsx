import { cn } from '@/lib/utils';

type PillProps = {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'brand';
  className?: string;
};

export function Pill({ children, variant = 'default', className }: PillProps) {
  const variantClasses = {
    default: 'bg-bg-soft text-ink-2 border-line',
    success: 'bg-success-soft text-success-deep border-success/30',
    danger: 'bg-danger-soft text-danger-deep border-danger/30',
    warning: 'bg-warning-soft text-warning-deep border-warning/30',
    brand: 'bg-brand-soft text-brand-deep border-brand/30',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
