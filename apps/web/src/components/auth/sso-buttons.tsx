'use client';

import { Button } from '@/components/ui/button';

export function SsoButtons() {
  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => {
          /* no-op until OAuth wired */
        }}
      >
        Continue with Google
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => {
          /* no-op until OAuth wired */
        }}
      >
        Continue with Apple
      </Button>
    </div>
  );
}
