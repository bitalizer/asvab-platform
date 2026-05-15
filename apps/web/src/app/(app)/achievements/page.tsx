import { Icon } from '@/components/primitives/icon';
import { PageHeader } from '@/components/shell/page-header';
import { PLACEHOLDER_ACHIEVEMENTS } from '@/lib/placeholder-data';
import type { PlaceholderAchievement } from '@/lib/placeholder-data';

const CATEGORY_LABELS: Record<PlaceholderAchievement['category'], string> = {
  streaks: 'Streaks',
  milestones: 'Milestones',
  section_mastery: 'Section Mastery',
  mock_scores: 'Mock Scores',
  special: 'Special',
};

const CATEGORY_ORDER: PlaceholderAchievement['category'][] = [
  'streaks',
  'milestones',
  'section_mastery',
  'mock_scores',
  'special',
];

export default function AchievementsPage() {
  const grouped = CATEGORY_ORDER.reduce<
    Partial<Record<PlaceholderAchievement['category'], PlaceholderAchievement[]>>
  >((acc, cat) => {
    const items = PLACEHOLDER_ACHIEVEMENTS.filter((a) => a.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        eyebrow="ACHIEVEMENTS"
        title="Earned and in-progress"
        subtitle="Track milestones, streaks, and section mastery."
      />
      <div className="flex flex-col gap-8">
        {CATEGORY_ORDER.map((cat) => {
          const items = grouped[cat];
          if (!items) return null;
          return (
            <section key={cat}>
              <h3 className="mb-4 font-display text-[15px] font-semibold text-ink">
                {CATEGORY_LABELS[cat]}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((achievement) => (
                  <div
                    key={achievement.name}
                    className={`rounded-lg border p-4 shadow-card transition-shadow ${
                      achievement.unlocked
                        ? 'border-line bg-surface hover:shadow-hover-lift'
                        : 'border-line bg-bg-soft opacity-60'
                    }`}
                  >
                    {/* Icon */}
                    <div className="mb-3">
                      <div
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${
                          achievement.unlocked ? 'bg-brand-soft' : 'bg-bg'
                        }`}
                      >
                        <Icon
                          name={achievement.iconKey}
                          size={20}
                          className={achievement.unlocked ? 'text-brand' : 'text-ink-3'}
                        />
                      </div>
                    </div>

                    {/* Name + description */}
                    <p className="font-display text-[14px] font-semibold text-ink">
                      {achievement.name}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-3">{achievement.description}</p>

                    {/* Progress bar (if in-progress) */}
                    {achievement.progress !== undefined && !achievement.unlocked && (
                      <div className="mt-3">
                        <div className="mb-1 flex items-center justify-between text-[10px] text-ink-3">
                          <span>Progress</span>
                          <span>{Math.round(achievement.progress * 100)}%</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-line">
                          <div
                            className="h-full rounded-full bg-brand"
                            style={{ width: `${achievement.progress * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Unlocked indicator */}
                    {achievement.unlocked && (
                      <div className="mt-2">
                        <span className="text-[10px] font-medium text-success-deep">Unlocked</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
