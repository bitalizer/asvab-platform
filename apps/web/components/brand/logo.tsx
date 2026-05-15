import { cn } from '@/lib/utils';
import Link from 'next/link';

type LogoProps = {
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export function Logo({ href = '/', className, size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };
  const content = (
    <span className={cn('font-display font-bold tracking-tight text-ink', sizes[size], className)}>
      MissionReady
    </span>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}
