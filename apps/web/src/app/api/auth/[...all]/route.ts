import { getAuth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request): Promise<Response> {
  return toNextJsHandler(getAuth()).GET(req);
}

export async function POST(req: Request): Promise<Response> {
  return toNextJsHandler(getAuth()).POST(req);
}
