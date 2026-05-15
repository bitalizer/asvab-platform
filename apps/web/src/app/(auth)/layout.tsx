import { Logo } from '@/components/brand/logo';
import { BRAND } from '@/lib/brand';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-bg">
      <div className="hidden lg:flex flex-col justify-between border-r border-line bg-bg-soft p-10">
        <Logo size="lg" />
        <div className="max-w-md">
          <div className="font-display text-3xl leading-tight tracking-tight text-ink">
            {BRAND.tagline}
          </div>
          <p className="mt-4 text-ink-2">
            Adaptive practice and AI tutoring calibrated to your test date. Join 25,000+ future
            recruits.
          </p>
        </div>
        <div className="text-xs text-ink-3">{BRAND.legalDisclaimer}</div>
      </div>
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
