import { Pill } from '@/components/primitives/pill';
import { PageHeader } from '@/components/shell/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type QuestionStatus = 'Attempted' | 'Correct' | 'Wrong' | 'Bookmarked' | 'Unattempted';
type Difficulty = 'Easy' | 'Medium' | 'Hard';

const SAMPLE_QUESTIONS: {
  id: string;
  section: string;
  preview: string;
  difficulty: Difficulty;
  status: QuestionStatus;
}[] = [
  {
    id: 'q01',
    section: 'AR',
    preview: 'A train travels 240 miles in 3 hours. What is its average speed in mph?',
    difficulty: 'Easy',
    status: 'Correct',
  },
  {
    id: 'q02',
    section: 'MK',
    preview: 'Solve for x: 2x² − 8 = 0',
    difficulty: 'Medium',
    status: 'Wrong',
  },
  {
    id: 'q03',
    section: 'WK',
    preview: 'LOQUACIOUS most nearly means: (A) Quiet (B) Talkative (C) Aggressive (D) Lazy',
    difficulty: 'Easy',
    status: 'Correct',
  },
  {
    id: 'q04',
    section: 'PC',
    preview: 'The main idea of the passage is best described as which of the following?',
    difficulty: 'Medium',
    status: 'Unattempted',
  },
  {
    id: 'q05',
    section: 'GS',
    preview: 'Which organelle is responsible for producing ATP in a cell?',
    difficulty: 'Easy',
    status: 'Correct',
  },
  {
    id: 'q06',
    section: 'EI',
    preview: 'In a series circuit with R1 = 10Ω and R2 = 15Ω and V = 25V, find the current.',
    difficulty: 'Medium',
    status: 'Wrong',
  },
  {
    id: 'q07',
    section: 'AS',
    preview: 'Which tool is used to measure the inside diameter of a cylinder bore?',
    difficulty: 'Hard',
    status: 'Unattempted',
  },
  {
    id: 'q08',
    section: 'MC',
    preview: 'A Class 2 lever has the fulcrum at one end. Where is the load?',
    difficulty: 'Medium',
    status: 'Attempted',
  },
  {
    id: 'q09',
    section: 'AO',
    preview: 'Which 3-D shape can be assembled from the given 2-D net?',
    difficulty: 'Hard',
    status: 'Bookmarked',
  },
  {
    id: 'q10',
    section: 'MK',
    preview: 'Simplify: (3x² · 2x³) / x⁴',
    difficulty: 'Hard',
    status: 'Unattempted',
  },
];

function difficultyPillVariant(d: Difficulty) {
  if (d === 'Easy') return 'success' as const;
  if (d === 'Medium') return 'warning' as const;
  return 'danger' as const;
}

function statusPillVariant(s: QuestionStatus) {
  if (s === 'Correct') return 'success' as const;
  if (s === 'Wrong') return 'danger' as const;
  if (s === 'Bookmarked') return 'brand' as const;
  return 'default' as const;
}

export default function QuestionBankPage() {
  return (
    <>
      <PageHeader
        eyebrow="QUESTION BANK"
        title="Browse every question"
        subtitle="Filter, search, and add to custom practice sets."
      />
      {/* Filter row */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <select
          disabled
          className="h-8 rounded-md border border-line bg-surface px-3 text-sm text-ink-2 opacity-70"
        >
          <option>Section</option>
        </select>
        <select
          disabled
          className="h-8 rounded-md border border-line bg-surface px-3 text-sm text-ink-2 opacity-70"
        >
          <option>Topic</option>
        </select>
        <select
          disabled
          className="h-8 rounded-md border border-line bg-surface px-3 text-sm text-ink-2 opacity-70"
        >
          <option>Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <select
          disabled
          className="h-8 rounded-md border border-line bg-surface px-3 text-sm text-ink-2 opacity-70"
        >
          <option>Status</option>
          <option>Attempted</option>
          <option>Correct</option>
          <option>Wrong</option>
          <option>Bookmarked</option>
          <option>Unattempted</option>
        </select>
        <div className="flex-1 min-w-[200px]">
          <Input
            type="search"
            placeholder="Search by keyword..."
            className="h-8 text-sm"
            readOnly
          />
        </div>
      </div>

      {/* Questions list */}
      <div className="rounded-lg border border-line bg-surface shadow-card">
        <div className="divide-y divide-line">
          {SAMPLE_QUESTIONS.map((q) => (
            <div key={q.id} className="flex items-center gap-4 px-5 py-3.5">
              {/* Section badge */}
              <span className="w-8 shrink-0 font-mono text-xs font-semibold text-ink-3">
                {q.section}
              </span>

              {/* Preview */}
              <p className="flex-1 min-w-0 truncate text-sm text-ink">{q.preview}</p>

              {/* Pills */}
              <div className="flex shrink-0 items-center gap-2">
                <Pill variant={difficultyPillVariant(q.difficulty)} className="text-[10px]">
                  {q.difficulty}
                </Pill>
                <Pill
                  variant={statusPillVariant(q.status)}
                  className="hidden text-[10px] sm:inline-flex"
                >
                  {q.status}
                </Pill>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="sm" className="text-xs">
                  Preview
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Attempt
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Bookmark
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
