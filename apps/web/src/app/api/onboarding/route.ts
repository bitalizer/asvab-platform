import { onboardingSchema } from '@/features/onboarding/schema';
import { getSession, upsertProfileFromOnboarding } from '@/lib/data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json(
      { error: { formErrors: ['Unauthorized'], fieldErrors: {} } },
      { status: 401 },
    );
  }

  const json = await req.json().catch(() => null);
  if (json === null) {
    return Response.json(
      { error: { formErrors: ['Invalid JSON'], fieldErrors: {} } },
      { status: 400 },
    );
  }

  const parsed = onboardingSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await upsertProfileFromOnboarding(session.user.id, {
    branches: parsed.data.branches,
    targetAfqt: parsed.data.targetAfqt,
    testDate: parsed.data.testDate ? new Date(parsed.data.testDate) : null,
    testFormat: parsed.data.testFormat,
    weeklyHoursAvailable: parsed.data.weeklyHoursAvailable,
    studyTimes: parsed.data.studyTimes,
    educationLevel: parsed.data.educationLevel,
    lastMathClass: parsed.data.lastMathClass,
    diagnosticChoice: parsed.data.diagnosticChoice,
  });

  return Response.json({ ok: true });
}
