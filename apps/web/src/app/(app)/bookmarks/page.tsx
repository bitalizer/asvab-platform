import { Icon } from '@/components/primitives/icon';
import { AppShell } from '@/components/shell/app-shell';
import { getSession } from '@/lib/data';
import { PLACEHOLDER_MISTAKES, PLACEHOLDER_SECTIONS } from '@/lib/placeholder-data';

// TODO: bookmark data wires up in Plan 05 alongside the practice session

function truncate(str: string, max: number) {
  return str.length > max ? `${str.slice(0, max)}…` : str;
}

export default async function BookmarksPage() {
  const session = await getSession();
  if (!session) throw new Error('Session expected — (app)/layout guards this route');

  const sampleRows = PLACEHOLDER_MISTAKES.slice(0, 2);

  return (
    <AppShell
      user={session.user}
      eyebrow="BOOKMARKS"
      title="Saved for later"
      subtitle="Questions you flagged during practice."
    >
      {/* Friendly empty state message */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-line bg-surface p-5 shadow-card">
        <div className="mt-0.5 text-ink-3">
          <Icon name="bookmark" size={20} />
        </div>
        <div>
          <p className="text-[15px] font-medium text-ink">No bookmarks yet.</p>
          <p className="mt-0.5 text-sm text-ink-3">
            Bookmark questions during practice to review them later.
          </p>
        </div>
      </div>

      {/* Sample placeholder rows */}
      <div className="rounded-lg border border-line bg-surface shadow-card">
        <div className="border-b border-line px-5 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-3">
            Sample — wires up in Plan 05
          </p>
        </div>
        <div className="divide-y divide-line">
          {sampleRows.map((item) => {
            const section = PLACEHOLDER_SECTIONS.find((s) => s.id === item.sectionId);
            return (
              <div key={item.id} className="flex items-start gap-4 px-5 py-4 opacity-50">
                <div className="mt-0.5 shrink-0">
                  {section && (
                    <span
                      className="inline-block rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold"
                      style={{
                        background: `hsl(${section.hue} 60% 92%)`,
                        color: `hsl(${section.hue} 55% 40%)`,
                      }}
                    >
                      {section.short}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-ink-3">{item.topic}</p>
                  <p className="mt-0.5 text-sm font-medium text-ink">
                    {truncate(item.question, 60)}
                  </p>
                </div>
                <div className="shrink-0 text-ink-3">
                  <Icon name="bookmark" size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
