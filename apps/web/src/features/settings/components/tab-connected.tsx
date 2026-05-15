import { Button } from '@/components/ui/button';

const PROVIDERS = [
  {
    id: 'google',
    label: 'Google',
    description: 'Sign in with your Google account.',
  },
  {
    id: 'apple',
    label: 'Apple',
    description: 'Sign in with your Apple ID.',
  },
] as const;

export function ConnectedAccountsTab() {
  return (
    <div className="flex flex-col gap-4">
      {PROVIDERS.map((provider) => (
        <div key={provider.id} className="rounded-lg border border-line bg-surface p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-ink">{provider.label}</div>
              <div className="mt-0.5 text-sm text-ink-2">{provider.description}</div>
            </div>
            <Button variant="outline" size="sm">
              Link account
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
