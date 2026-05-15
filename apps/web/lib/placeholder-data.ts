import type { IconName } from '@/components/primitives/icon';
import type { Branch, SectionId } from '@asvab/db';

// ----- Types (mirror future DB shape) -----

export type PlaceholderUser = {
  name: string;
  initial: string;
  branch: Branch;
  branchLabel: string;
  targetAfqt: number;
  currentAfqt: number;
  startAfqt: number;
  streak: number;
  questionsToday: number;
  questionsTotal: number;
  studyMinutesWeek: number;
  accuracy: number;
  testDaysAway: number;
  testDate: string;
  xp: number;
  league: string;
};

export type PlaceholderSection = {
  id: SectionId;
  short: string;
  name: string;
  iconKey: IconName;
  mastery: number;
  afqt: boolean;
  hue: number;
};

export type PlaceholderJob = {
  code: string;
  title: string;
  branch: Branch;
  scores: Record<string, number>;
  your: Record<string, number>;
  qualified: boolean;
  description: string;
  civilian: string;
  bonus: string;
  training: string;
  popularity: number;
};

export type PlaceholderCompositeScore = {
  code: string;
  name: string;
  your: number;
  change: number;
};

export type PlaceholderTask = {
  id: number;
  type: 'practice' | 'lesson' | 'flash' | 'drill';
  title: string;
  time: string;
  chip: string;
  iconKey: IconName;
  done: boolean;
  focus?: boolean;
};

export type PlaceholderBadge = {
  iconKey: IconName;
  name: string;
  date: string;
};

export type PlaceholderAchievement = {
  iconKey: IconName;
  name: string;
  description: string;
  unlocked: boolean;
  category: 'streaks' | 'milestones' | 'section_mastery' | 'mock_scores' | 'special';
  progress?: number;
};

export type PlaceholderLesson = {
  id: string;
  sectionId: SectionId;
  title: string;
  duration: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
};

export type PlaceholderDeck = {
  id: string;
  name: string;
  cards: number;
  dueToday: number;
  mastery: number;
  lastStudied: string;
  source: 'user' | 'public' | 'auto';
};

export type PlaceholderMistake = {
  id: string;
  sectionId: SectionId;
  topic: string;
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  daysAgo: number;
};

export type PlaceholderNotification = {
  id: string;
  type: 'reminder' | 'streak' | 'badge' | 'plan' | 'announcement';
  title: string;
  body: string;
  read: boolean;
  daysAgo: number;
};

// ----- Constants — ported from prototype/shared.jsx and individual screens -----

export const PLACEHOLDER_USER: PlaceholderUser = {
  name: 'Marcus',
  initial: 'M',
  branch: 'army',
  branchLabel: 'U.S. Army',
  targetAfqt: 75,
  currentAfqt: 68,
  startAfqt: 49,
  streak: 12,
  questionsToday: 23,
  questionsTotal: 1842,
  studyMinutesWeek: 312,
  accuracy: 0.78,
  testDaysAway: 23,
  testDate: 'Jun 3, 2026',
  xp: 4820,
  league: 'Gold',
};

export const PLACEHOLDER_SECTIONS: PlaceholderSection[] = [
  {
    id: 'ar',
    short: 'AR',
    name: 'Arithmetic Reasoning',
    iconKey: 'calc',
    mastery: 0.72,
    hue: 215,
    afqt: true,
  },
  {
    id: 'wk',
    short: 'WK',
    name: 'Word Knowledge',
    iconKey: 'book',
    mastery: 0.86,
    hue: 145,
    afqt: true,
  },
  {
    id: 'pc',
    short: 'PC',
    name: 'Paragraph Comp.',
    iconKey: 'paragraph',
    mastery: 0.81,
    hue: 195,
    afqt: true,
  },
  {
    id: 'mk',
    short: 'MK',
    name: 'Math Knowledge',
    iconKey: 'function',
    mastery: 0.54,
    hue: 15,
    afqt: true,
  },
  {
    id: 'gs',
    short: 'GS',
    name: 'General Science',
    iconKey: 'atom',
    mastery: 0.68,
    hue: 270,
    afqt: false,
  },
  {
    id: 'ei',
    short: 'EI',
    name: 'Electronics Info',
    iconKey: 'bolt',
    mastery: 0.41,
    hue: 50,
    afqt: false,
  },
  {
    id: 'as',
    short: 'AS',
    name: 'Auto & Shop',
    iconKey: 'wrench',
    mastery: 0.62,
    hue: 25,
    afqt: false,
  },
  {
    id: 'mc',
    short: 'MC',
    name: 'Mechanical Comp.',
    iconKey: 'gear',
    mastery: 0.58,
    hue: 60,
    afqt: false,
  },
  {
    id: 'ao',
    short: 'AO',
    name: 'Assembling Objects',
    iconKey: 'shapes',
    mastery: 0.71,
    hue: 330,
    afqt: false,
  },
];

export const PLACEHOLDER_JOBS: PlaceholderJob[] = [
  {
    code: '11B',
    title: 'Infantryman',
    branch: 'army',
    scores: { CO: 87 },
    your: { CO: 92 },
    qualified: true,
    description: 'Close combat. Lead the assault.',
    civilian: 'Law enforcement, Security',
    bonus: '$8,000',
    training: '22 weeks OSUT, Fort Moore',
    popularity: 5,
  },
  {
    code: '17C',
    title: 'Cyber Operations Specialist',
    branch: 'army',
    scores: { ST: 112 },
    your: { ST: 108 },
    qualified: false,
    description: 'Conduct offensive and defensive cyber operations.',
    civilian: 'Cybersecurity Analyst',
    bonus: '$40,000',
    training: '31 weeks, Fort Eisenhower',
    popularity: 5,
  },
  {
    code: '68W',
    title: 'Combat Medic Specialist',
    branch: 'army',
    scores: { ST: 101, GT: 107 },
    your: { ST: 108, GT: 105 },
    qualified: false,
    description: 'Provide medical treatment in the field.',
    civilian: 'EMT, Paramedic, RN',
    bonus: '$12,000',
    training: '16 weeks AIT',
    popularity: 5,
  },
  {
    code: '35F',
    title: 'Intelligence Analyst',
    branch: 'army',
    scores: { ST: 101 },
    your: { ST: 108 },
    qualified: true,
    description: 'Analyze intelligence from multiple sources.',
    civilian: 'Intel Analyst, Federal Agencies',
    bonus: '$15,000',
    training: '16 weeks, Fort Huachuca',
    popularity: 4,
  },
  {
    code: '25B',
    title: 'Information Technology Specialist',
    branch: 'army',
    scores: { ST: 95 },
    your: { ST: 108 },
    qualified: true,
    description: 'Maintain Army networks and systems.',
    civilian: 'Network Admin, SysOps',
    bonus: '$10,000',
    training: '20 weeks AIT',
    popularity: 4,
  },
  {
    code: '31B',
    title: 'Military Police',
    branch: 'army',
    scores: { ST: 91 },
    your: { ST: 108 },
    qualified: true,
    description: 'Law enforcement on base and downrange.',
    civilian: 'Police Officer',
    bonus: '$8,000',
    training: '20 weeks OSUT',
    popularity: 4,
  },
  {
    code: '12B',
    title: 'Combat Engineer',
    branch: 'army',
    scores: { CO: 87 },
    your: { CO: 92 },
    qualified: true,
    description: 'Build bridges, breach obstacles, demolitions.',
    civilian: 'Construction, HazMat',
    bonus: '$10,000',
    training: '14 weeks OSUT',
    popularity: 3,
  },
  {
    code: '15T',
    title: 'UH-60 Helicopter Repairer',
    branch: 'army',
    scores: { MM: 104 },
    your: { MM: 95 },
    qualified: false,
    description: 'Maintain Black Hawk airframes.',
    civilian: 'Aviation Mechanic (FAA A&P)',
    bonus: '$18,000',
    training: '15 weeks AIT',
    popularity: 4,
  },
  {
    code: '92Y',
    title: 'Unit Supply Specialist',
    branch: 'army',
    scores: { CL: 90 },
    your: { CL: 99 },
    qualified: true,
    description: 'Supply chain and logistics.',
    civilian: 'Warehouse, Logistics Manager',
    bonus: '$2,000',
    training: '10 weeks AIT',
    popularity: 3,
  },
  {
    code: '13F',
    title: 'Joint Fire Support Specialist',
    branch: 'army',
    scores: { FA: 93 },
    your: { FA: 96 },
    qualified: true,
    description: 'Coordinate close air support and artillery.',
    civilian: 'Limited civilian equivalent',
    bonus: '$11,000',
    training: '13 weeks OSUT',
    popularity: 3,
  },
];

export const PLACEHOLDER_COMPOSITE_SCORES: PlaceholderCompositeScore[] = [
  { code: 'GT', name: 'General Technical', your: 105, change: 8 },
  { code: 'CL', name: 'Clerical', your: 99, change: 4 },
  { code: 'CO', name: 'Combat', your: 92, change: 6 },
  { code: 'EL', name: 'Electronics', your: 88, change: 3 },
  { code: 'FA', name: 'Field Artillery', your: 96, change: 5 },
  { code: 'GM', name: 'General Maint.', your: 91, change: 4 },
  { code: 'MM', name: 'Mechanical Maint.', your: 95, change: 7 },
  { code: 'OF', name: 'Operators/Food', your: 94, change: 5 },
  { code: 'SC', name: 'Surveillance/Comms', your: 102, change: 6 },
  { code: 'ST', name: 'Skilled Technical', your: 108, change: 9 },
];

export const PLACEHOLDER_TODAY_TASKS: PlaceholderTask[] = [
  {
    id: 1,
    type: 'practice',
    title: '20 Math Knowledge questions',
    time: '15 min',
    chip: 'Practice',
    iconKey: 'function',
    done: false,
    focus: true,
  },
  {
    id: 2,
    type: 'lesson',
    title: 'Lesson · Quadratic Equations',
    time: '12 min',
    chip: 'Lesson',
    iconKey: 'book',
    done: true,
  },
  {
    id: 3,
    type: 'flash',
    title: '15 Word Knowledge flashcards',
    time: '8 min',
    chip: 'Flashcards',
    iconKey: 'cards',
    done: false,
  },
  {
    id: 4,
    type: 'drill',
    title: 'Review 7 mistakes from yesterday',
    time: '10 min',
    chip: 'Mistake drill',
    iconKey: 'refresh',
    done: false,
  },
];

export const PLACEHOLDER_RECENT_BADGES: PlaceholderBadge[] = [
  { iconKey: 'flame', name: 'Streak 10', date: '5d ago' },
  { iconKey: 'trophy', name: 'Perfect Set', date: '1w ago' },
  { iconKey: 'book', name: 'Bookworm', date: '2w ago' },
  { iconKey: 'bolt', name: 'Speed Demon', date: '3w ago' },
];

export const PLACEHOLDER_ACHIEVEMENTS: PlaceholderAchievement[] = [
  {
    iconKey: 'flame',
    name: 'Streak 10',
    description: 'Study for 10 consecutive days',
    unlocked: true,
    category: 'streaks',
  },
  {
    iconKey: 'flame',
    name: 'Streak 30',
    description: 'Study for 30 consecutive days',
    unlocked: false,
    category: 'streaks',
    progress: 0.4,
  },
  {
    iconKey: 'trophy',
    name: 'Perfect Set',
    description: 'Get 100% on a practice set',
    unlocked: true,
    category: 'milestones',
  },
  {
    iconKey: 'book',
    name: 'Bookworm',
    description: 'Complete 25 lessons',
    unlocked: true,
    category: 'milestones',
  },
  {
    iconKey: 'bolt',
    name: 'Speed Demon',
    description: 'Beat the average time on 10 sets',
    unlocked: true,
    category: 'milestones',
  },
  {
    iconKey: 'gauge',
    name: 'Hit 70 AFQT',
    description: 'Reach an AFQT prediction of 70',
    unlocked: false,
    category: 'mock_scores',
    progress: 0.97,
  },
  {
    iconKey: 'gauge',
    name: 'Hit 90 AFQT',
    description: 'Reach an AFQT prediction of 90',
    unlocked: false,
    category: 'mock_scores',
  },
  {
    iconKey: 'sparkles',
    name: 'Early Bird',
    description: 'Complete a session before 8am',
    unlocked: false,
    category: 'special',
  },
];

export const PLACEHOLDER_LESSONS: PlaceholderLesson[] = [
  {
    id: 'mk-linear-equations',
    sectionId: 'mk',
    title: 'Linear Equations & Systems',
    duration: '14 min',
    status: 'in_progress',
    progress: 0.68,
  },
  {
    id: 'mk-quadratics',
    sectionId: 'mk',
    title: 'Quadratic Equations',
    duration: '12 min',
    status: 'completed',
    progress: 1,
  },
  {
    id: 'wk-prefixes',
    sectionId: 'wk',
    title: 'Common Prefixes & Suffixes',
    duration: '10 min',
    status: 'completed',
    progress: 1,
  },
  {
    id: 'wk-roots',
    sectionId: 'wk',
    title: 'Latin & Greek Roots',
    duration: '15 min',
    status: 'in_progress',
    progress: 0.4,
  },
  {
    id: 'pc-mainidea',
    sectionId: 'pc',
    title: 'Finding the Main Idea',
    duration: '11 min',
    status: 'not_started',
    progress: 0,
  },
  {
    id: 'ar-percent',
    sectionId: 'ar',
    title: 'Percent & Proportion',
    duration: '13 min',
    status: 'not_started',
    progress: 0,
  },
  {
    id: 'ei-ohms',
    sectionId: 'ei',
    title: "Ohm's Law",
    duration: '9 min',
    status: 'not_started',
    progress: 0,
  },
  {
    id: 'gs-cells',
    sectionId: 'gs',
    title: 'Cell Biology Basics',
    duration: '14 min',
    status: 'not_started',
    progress: 0,
  },
];

export const PLACEHOLDER_FLASHCARD_DECKS: PlaceholderDeck[] = [
  {
    id: 'wk-vocab-core',
    name: 'WK Vocabulary — Core',
    cards: 240,
    dueToday: 18,
    mastery: 0.62,
    lastStudied: 'Today',
    source: 'public',
  },
  {
    id: 'gs-bio',
    name: 'GS — Biology',
    cards: 120,
    dueToday: 6,
    mastery: 0.55,
    lastStudied: '2d ago',
    source: 'public',
  },
  {
    id: 'mk-formulas',
    name: 'Math Formulas',
    cards: 64,
    dueToday: 8,
    mastery: 0.72,
    lastStudied: 'Yesterday',
    source: 'public',
  },
  {
    id: 'auto-mistakes',
    name: 'My Mistakes',
    cards: 31,
    dueToday: 12,
    mastery: 0.28,
    lastStudied: '3d ago',
    source: 'auto',
  },
  {
    id: 'user-custom',
    name: 'My WK Tough Words',
    cards: 18,
    dueToday: 4,
    mastery: 0.4,
    lastStudied: '5d ago',
    source: 'user',
  },
];

export const PLACEHOLDER_MISTAKES: PlaceholderMistake[] = [
  {
    id: 'm1',
    sectionId: 'mk',
    topic: 'Quadratic equations',
    question: 'Solve x² − 5x + 6 = 0',
    yourAnswer: 'x = 1, 6',
    correctAnswer: 'x = 2, 3',
    daysAgo: 1,
  },
  {
    id: 'm2',
    sectionId: 'mk',
    topic: 'Linear equations',
    question: '3x − 7 = 2x + 5, x = ?',
    yourAnswer: '−2',
    correctAnswer: '12',
    daysAgo: 1,
  },
  {
    id: 'm3',
    sectionId: 'wk',
    topic: 'Synonyms',
    question: 'Synonym for ELOQUENT',
    yourAnswer: 'Quiet',
    correctAnswer: 'Articulate',
    daysAgo: 2,
  },
  {
    id: 'm4',
    sectionId: 'gs',
    topic: 'Cells',
    question: 'Powerhouse of the cell?',
    yourAnswer: 'Ribosome',
    correctAnswer: 'Mitochondrion',
    daysAgo: 3,
  },
  {
    id: 'm5',
    sectionId: 'ei',
    topic: "Ohm's Law",
    question: 'I = V/R. If V = 12V, R = 4Ω, I = ?',
    yourAnswer: '48 A',
    correctAnswer: '3 A',
    daysAgo: 4,
  },
];

export const PLACEHOLDER_NOTIFICATIONS: PlaceholderNotification[] = [
  {
    id: 'n1',
    type: 'reminder',
    title: 'Time to study',
    body: "You haven't practiced today. Keep your streak alive.",
    read: false,
    daysAgo: 0,
  },
  {
    id: 'n2',
    type: 'badge',
    title: 'Achievement unlocked',
    body: "You earned 'Streak 10'. Keep going!",
    read: false,
    daysAgo: 5,
  },
  {
    id: 'n3',
    type: 'plan',
    title: 'Plan adjusted',
    body: 'We moved MK practice up — your weak section needs it.',
    read: true,
    daysAgo: 6,
  },
  {
    id: 'n4',
    type: 'announcement',
    title: 'New lessons added',
    body: '4 new MK lessons are now available.',
    read: true,
    daysAgo: 10,
  },
];
