import { getEnv } from '@/lib/env';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    getEnv();
    return Response.json({
      status: 'ok',
      service: 'web',
      ts: Date.now(),
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return Response.json(
        {
          status: 'error',
          service: 'web',
          ts: Date.now(),
        },
        { status: 503 },
      );
    }
    throw err;
  }
}
