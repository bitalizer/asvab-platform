import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const PLANS = [
  {
    id: 'monthly',
    label: 'Monthly',
    price: '$29',
    per: 'per month',
    tag: null,
  },
  {
    id: 'quarterly',
    label: 'Quarterly',
    price: '$59',
    per: 'every 3 months',
    tag: 'Most popular',
  },
  {
    id: 'lifetime',
    label: 'Lifetime',
    price: '$149',
    per: 'one-time',
    tag: null,
  },
] as const;

export function SubscriptionTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Current plan */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Current plan</h2>
        <div className="mt-3 flex items-center gap-3">
          <Badge variant="default" className="text-sm">
            Free
          </Badge>
          <span className="text-sm text-ink-2">Limited practice questions &amp; features</span>
        </div>
      </div>

      {/* Upgrade options */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Upgrade your plan</h2>
        <p className="mt-1 text-sm text-ink-2">Unlock unlimited practice, AI coaching, and more.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="relative rounded-lg border border-line bg-bg p-4 text-center"
            >
              {plan.tag && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <Badge className="text-xs">{plan.tag}</Badge>
                </div>
              )}
              <div className="font-semibold text-ink">{plan.label}</div>
              <div className="mt-1 font-display text-2xl font-bold text-ink">{plan.price}</div>
              <div className="text-xs text-ink-3">{plan.per}</div>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Select
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment method */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Payment method</h2>
        <p className="mt-3 text-sm text-ink-2">No card on file.</p>
        <Button variant="outline" size="sm" className="mt-3">
          Add payment method
        </Button>
      </div>

      <Separator />

      {/* Invoices */}
      <div className="rounded-lg border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Invoices</h2>
        <p className="mt-3 text-sm text-ink-2">No invoices yet.</p>
      </div>

      {/* Cancel */}
      <div>
        <Button
          variant="outline"
          className="border-destructive/60 text-destructive hover:bg-destructive/5 hover:text-destructive"
        >
          Cancel subscription
        </Button>
      </div>
    </div>
  );
}
