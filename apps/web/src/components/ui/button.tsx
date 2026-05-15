import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-[15px] font-medium tracking-[-0.005em] transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-1 focus-visible:ring-offset-bg [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-ink text-bg hover:bg-brand-press rounded-md border border-ink',
        secondary: 'bg-surface text-ink border border-line-strong hover:bg-bg-soft rounded-md',
        ghost: 'bg-transparent text-ink hover:bg-bg-soft rounded-md',
        outline: 'bg-transparent text-ink border border-line hover:border-line-strong rounded-md',
        danger: 'bg-danger text-bg hover:bg-danger-deep rounded-md border border-danger',
        link: 'text-ink underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-[13px]',
        default: 'h-10 px-4 py-[11px]',
        lg: 'h-12 px-6 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'primary',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
