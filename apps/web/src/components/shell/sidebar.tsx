import { Logo } from '@/components/brand/logo';
import { Icon } from '@/components/primitives/icon';
import { Button } from '@/components/ui/button';
import { NavLink } from './nav-link';

const PRIMARY_NAV = [
  { href: '/dashboard', label: 'Overview', iconName: 'home' as const },
  { href: '/practice', label: 'Practice', iconName: 'target' as const },
  { href: '/mock-exam', label: 'Mock Exams', iconName: 'timer' as const },
  { href: '/progress', label: 'Progress', iconName: 'chart' as const },
];

const LIBRARY_NAV = [
  { href: '/learn', label: 'Lessons', iconName: 'book' as const },
  { href: '/flashcards', label: 'Flashcards', iconName: 'cards' as const },
  { href: '/mistakes', label: 'Mistakes', iconName: 'refresh' as const },
  { href: '/bookmarks', label: 'Bookmarks', iconName: 'bookmark' as const },
  { href: '/question-bank', label: 'Question Bank', iconName: 'file' as const },
  { href: '/study-plan', label: 'Study Plan', iconName: 'calendar' as const },
];

const MORE_NAV = [
  { href: '/achievements', label: 'Achievements', iconName: 'trophy' as const },
  { href: '/notifications', label: 'Notifications', iconName: 'bell' as const },
  { href: '/settings', label: 'Settings', iconName: 'settings' as const },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-60 flex-col gap-1 border-r border-line bg-bg-soft px-3 py-5">
      <div className="px-3 pb-5">
        <Logo size="md" />
      </div>
      <nav aria-label="Primary" className="flex flex-col gap-0.5">
        {PRIMARY_NAV.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
      <div className="mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
        Library
      </div>
      <nav aria-label="Library" className="flex flex-col gap-0.5">
        {LIBRARY_NAV.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
      <div className="mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
        More
      </div>
      <nav aria-label="More" className="flex flex-col gap-0.5">
        {MORE_NAV.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
      <div className="flex-1" />
      <div className="rounded-lg border border-line bg-surface p-3">
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-3">
          Need a hand?
        </div>
        <div className="text-sm font-semibold text-ink">
          Ask the AI tutor — context-aware, 24/7.
        </div>
        <Button type="button" variant="ghost" size="sm" className="mt-2 w-full">
          <Icon name="chat" size={13} />
          Open chat
        </Button>
      </div>
    </aside>
  );
}
