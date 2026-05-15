import { deleteUser, getSession } from '@/lib/data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function DELETE() {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  await deleteUser(session.user.id);
  return Response.json({ ok: true });
}
