import { Icon } from '@/components/primitives/icon';
import { PageHeader } from '@/components/shell/page-header';
import { Button } from '@/components/ui/button';
import {
  AfqtCard,
  ContinueLesson,
  CountdownCard,
  RecentBadges,
  SectionMastery,
  TodayPlan,
  WeeklyStats,
} from '@/features/dashboard';
import { getProfile, getSession } from '@/lib/data';
import {
  PLACEHOLDER_ACHIEVEMENTS,
  PLACEHOLDER_RECENT_BADGES,
  PLACEHOLDER_SECTIONS,
  PLACEHOLDER_TODAY_TASKS,
  PLACEHOLDER_USER,
} from '@/lib/placeholder-data';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) throw new Error('Session expected — (app)/layout guards this route');
  const profile = await getProfile(session.user.id);

  const firstName = session.user.name?.split(' ')[0] ?? 'Recruit';
  const targetAfqt = profile?.targetAfqt ?? PLACEHOLDER_USER.targetAfqt;
  const testDate = profile?.testDate ?? null;
  const daysAway = testDate
    ? Math.max(0, Math.round((testDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : PLACEHOLDER_USER.testDaysAway;
  const testDateLabel = testDate
    ? testDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : PLACEHOLDER_USER.testDate;
  const formatLabel = profile?.testFormat
    ? `MEPS · ${profile.testFormat.toUpperCase()}-ASVAB`
    : 'MEPS · CAT-ASVAB';

  const afqtTrend = [62, 64, 65, 65, 66, 67, PLACEHOLDER_USER.currentAfqt];
  const weeklyStats = [
    {
      label: 'Questions',
      value: String(PLACEHOLDER_USER.questionsToday),
      delta: '+8',
      sub: 'today',
    },
    {
      label: 'Accuracy',
      value: `${Math.round(PLACEHOLDER_USER.accuracy * 100)}%`,
      delta: '+4 pts',
      sub: 'all sections',
    },
    { label: 'Study time', value: '5h 12m', delta: '+1h', sub: 'this week' },
    {
      label: 'XP earned',
      value: PLACEHOLDER_USER.xp.toLocaleString(),
      delta: '+220',
      sub: 'weekly',
    },
  ];

  return (
    <>
      <PageHeader
        title={`Welcome back, ${firstName}.`}
        subtitle={
          <>
            {daysAway} days from your test. You're{' '}
            <span className="text-brand">tracking ahead of schedule</span>.
          </>
        }
        action={
          <Button>
            <Icon name="play" size={12} /> Start today's session
          </Button>
        }
      />
      <AfqtCard
        currentAfqt={PLACEHOLDER_USER.currentAfqt}
        targetAfqt={targetAfqt}
        startAfqt={PLACEHOLDER_USER.startAfqt}
      />
      <div className="mt-5 grid gap-5 lg:grid-cols-[2fr_1fr]">
        <TodayPlan initialTasks={PLACEHOLDER_TODAY_TASKS} />
        <div className="flex flex-col gap-4">
          <CountdownCard daysAway={daysAway} testDate={testDateLabel} format={formatLabel} />
          <WeeklyStats stats={weeklyStats} afqtTrend={afqtTrend} />
        </div>
      </div>
      <div className="mt-5">
        <SectionMastery sections={PLACEHOLDER_SECTIONS} />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ContinueLesson
          section="Algebra · 14 min total"
          title="Linear Equations & Systems"
          progress={0.68}
          duration="4 min"
        />
        <RecentBadges
          badges={PLACEHOLDER_RECENT_BADGES}
          totalCount={PLACEHOLDER_ACHIEVEMENTS.length}
        />
      </div>
    </>
  );
}
