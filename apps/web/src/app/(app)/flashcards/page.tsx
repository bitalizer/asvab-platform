import { PageHeader } from '@/components/shell/page-header';
import { Button } from '@/components/ui/button';
import { PLACEHOLDER_FLASHCARD_DECKS } from '@/lib/placeholder-data';
import type { PlaceholderDeck } from '@/lib/placeholder-data';

function DeckCard({ deck }: { deck: PlaceholderDeck }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-line bg-surface p-4 shadow-card">
      <div className="flex-1 min-w-0">
        <p className="font-display text-[15px] font-semibold text-ink truncate">{deck.name}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-3">
          <span>{deck.cards} cards</span>
          <span className={deck.dueToday > 0 ? 'text-brand font-semibold' : undefined}>
            {deck.dueToday > 0 ? `${deck.dueToday} due today` : 'None due'}
          </span>
          <span>{Math.round(deck.mastery * 100)}% mastery</span>
          <span>Last studied: {deck.lastStudied}</span>
        </div>
        <div className="mt-2 h-1 w-full max-w-[200px] overflow-hidden rounded-full bg-bg-soft">
          <div
            className="h-full rounded-full bg-brand"
            style={{ width: `${deck.mastery * 100}%` }}
          />
        </div>
      </div>
      <div className="ml-4 shrink-0">
        <Button size="sm" variant="ghost">
          Study
        </Button>
      </div>
    </div>
  );
}

export default function FlashcardsPage() {
  const myDecks = PLACEHOLDER_FLASHCARD_DECKS.filter(
    (d) => d.source === 'user' || d.source === 'auto',
  );
  const publicDecks = PLACEHOLDER_FLASHCARD_DECKS.filter((d) => d.source === 'public');

  return (
    <>
      <PageHeader
        eyebrow="FLASHCARDS"
        title="Spaced repetition"
        subtitle="Cards you'll see again before you forget them."
      />
      {/* My Decks */}
      <section className="mb-8">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 className="font-display text-[15px] font-semibold text-ink">My Decks</h3>
          <Button variant="outline" size="sm">
            Create New Deck
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          {myDecks.map((deck) => (
            <DeckCard key={deck.id} deck={deck} />
          ))}
        </div>
      </section>

      {/* Public Decks */}
      <section>
        <h3 className="mb-3 font-display text-[15px] font-semibold text-ink">Public Decks</h3>
        <div className="flex flex-col gap-3">
          {publicDecks.map((deck) => (
            <DeckCard key={deck.id} deck={deck} />
          ))}
        </div>
      </section>
    </>
  );
}
