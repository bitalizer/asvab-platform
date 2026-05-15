import { AppShell } from '@/components/shell/app-shell';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/data';

const EXAM_TYPES = [
  {
    name: 'Full ASVAB (CAT)',
    duration: '~2.5 hrs',
    sections: 'All 9 sections',
    description: 'Adaptive, mimics PiCAT',
  },
  {
    name: 'Full ASVAB (P&P)',
    duration: '~3 hrs',
    sections: 'All 9 sections',
    description: 'Paper version, linear',
  },
  {
    name: 'AFQT-Only',
    duration: '~1.5 hrs',
    sections: '4 AFQT sections',
    description: 'Quick AFQT prediction',
  },
  {
    name: 'Single Section Timed',
    duration: 'varies',
    sections: 'Pick one',
    description: 'Drill a section under timing',
  },
  {
    name: 'Custom Mock',
    duration: 'varies',
    sections: 'Pick sections + difficulty',
    description: 'Build your own',
  },
];

export default async function MockExamPage() {
  const session = await getSession();
  if (!session) throw new Error('Session expected — (app)/layout guards this route');

  return (
    <AppShell
      user={session.user}
      eyebrow="MOCK EXAMS"
      title="Test under real conditions"
      subtitle="Practice the exam day. Adaptive (CAT) or paper (P&P)."
    >
      {/* Exam type cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXAM_TYPES.map((exam) => (
          <div
            key={exam.name}
            className="flex flex-col rounded-lg border border-line bg-surface p-5 shadow-card"
          >
            <h3 className="font-display text-[17px] font-semibold text-ink">{exam.name}</h3>
            <p className="mt-1 font-mono text-sm text-ink-3">{exam.duration}</p>
            <p className="mt-2 flex-1 text-sm text-ink-2">{exam.description}</p>
            <div className="mt-1">
              <span className="inline-block rounded-full bg-bg-soft px-2.5 py-0.5 text-xs text-ink-3">
                {exam.sections}
              </span>
            </div>
            <div className="mt-4">
              <Button size="sm" className="w-full">
                Start exam
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent mock exams */}
      <div className="mt-10">
        <h2 className="mb-4 font-display text-lg font-semibold text-ink">Recent mock exams</h2>
        <div className="rounded-lg border border-line bg-surface px-6 py-10 text-center shadow-card">
          <p className="text-sm text-ink-3">No mock exams yet — take your first above.</p>
        </div>
      </div>
    </AppShell>
  );
}
