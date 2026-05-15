import { headers } from 'next/headers';
import { getAuth } from './auth';

export async function getServerSession() {
  const auth = getAuth();
  return auth.api.getSession({ headers: await headers() });
}

export type SessionUser = NonNullable<Awaited<ReturnType<typeof getServerSession>>>['user'];
