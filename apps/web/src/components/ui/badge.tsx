import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-sm border px-2 py-0.5 text-xs font-mono uppercase tracking-wider font-semibold whitespace-nowrap shrink-0',
  {
    variants: {
      variant: {
        default: 'border-line bg-bg-soft text-ink-2',
        solid: 'border-ink bg-ink text-bg',
        brand: 'border-brand bg-brand-soft text-brand-deep',
        success: 'border-success bg-success-soft text-success-deep',
        danger: 'border-danger bg-danger-soft text-danger-deep',
        warning: 'border-warning bg-warning-soft text-warning-deep',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

function Badge({
  className,
  variant = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
}

export { Badge, badgeVariants };
