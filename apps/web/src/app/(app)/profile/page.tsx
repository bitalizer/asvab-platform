import { Icon } from '@/components/primitives/icon';
import { PageHeader } from '@/components/shell/page-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BRANCHES } from '@/features/onboarding';
import { getProfile, getSession } from '@/lib/data';
import { PLACEHOLDER_ACHIEVEMENTS } from '@/lib/placeholder-data';

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) throw new Error('Session expected — (app)/layout guards this route');
  const profile = await getProfile(session.user.id);

  const branchId = profile?.branches?.[0];
  const branch = branchId ? BRANCHES.find((b) => b.id === branchId) : undefined;
  const targetAfqt = profile?.targetAfqt ?? '—';

  const initials = session.user.name
    ? session.user.name
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  const topAchievements = PLACEHOLDER_ACHIEVEMENTS.filter((a) => a.unlocked).slice(0, 3);

  return (
    <>
      <PageHeader eyebrow="Profile" title={session.user.name ?? 'Recruit'} />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar card */}
        <Card className="h-fit">
          <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
            <Avatar className="size-20">
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-display text-lg font-semibold text-ink">
                {session.user.name ?? 'Recruit'}
              </p>
              <p className="mt-0.5 text-sm text-ink-3">{session.user.email}</p>
            </div>
            <Button variant="outline" size="sm">
              Edit profile
            </Button>
          </CardContent>
        </Card>

        {/* Main column */}
        <div className="flex flex-col gap-6">
          {/* Public stats card */}
          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border border-line bg-bg-soft p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-3">
                    Branch
                  </div>
                  <div className="mt-1 font-display text-xl font-semibold text-ink">
                    {branch?.name ?? '—'}
                  </div>
                </div>
                <div className="rounded-lg border border-line bg-bg-soft p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-3">
                    Target AFQT
                  </div>
                  <div className="mt-1 font-display text-xl font-semibold text-ink">
                    {targetAfqt}
                  </div>
                </div>
                <div className="rounded-lg border border-line bg-bg-soft p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-3">
                    Current AFQT
                  </div>
                  <div className="mt-1 font-display text-xl font-semibold text-ink">—</div>
                </div>
                <div className="rounded-lg border border-line bg-bg-soft p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-3">
                    Streak
                  </div>
                  <div className="mt-1 font-display text-xl font-semibold text-ink">—</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements showcase card */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              {topAchievements.length === 0 ? (
                <p className="text-sm text-ink-3">No achievements unlocked yet.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {topAchievements.map((achievement) => (
                    <div
                      key={achievement.name}
                      className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3"
                    >
                      <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft">
                        <Icon name={achievement.iconKey} size={18} className="text-brand" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-display text-[14px] font-semibold text-ink">
                          {achievement.name}
                        </p>
                        <p className="text-xs text-ink-3">{achievement.description}</p>
                      </div>
                      <span className="ml-auto shrink-0 text-[10px] font-medium text-success-deep">
                        Unlocked
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
