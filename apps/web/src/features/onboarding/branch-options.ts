import type { Branch } from '@asvab/db';

export const BRANCHES: ReadonlyArray<{
  id: Branch;
  name: string;
  min: number;
  popular: string;
  color: string;
}> = [
  {
    id: 'army',
    name: 'Army',
    min: 31,
    popular: 'Infantry, MP, Medic, Cyber',
    color: 'var(--branch-army)',
  },
  {
    id: 'navy',
    name: 'Navy',
    min: 35,
    popular: 'Nuclear, Corpsman, IT, Aviation',
    color: 'var(--branch-navy)',
  },
  {
    id: 'marines',
    name: 'Marines',
    min: 32,
    popular: 'Infantry, Recon, Intel',
    color: 'var(--branch-marines)',
  },
  {
    id: 'air_force',
    name: 'Air Force',
    min: 36,
    popular: 'Pilot, Cyber, PJ, Linguist',
    color: 'var(--branch-af)',
  },
  {
    id: 'coast_guard',
    name: 'Coast Guard',
    min: 40,
    popular: 'Rescue, ME, MK, AST',
    color: 'var(--branch-cg)',
  },
  {
    id: 'space_force',
    name: 'Space Force',
    min: 60,
    popular: 'Cyber, Intel, Operations',
    color: 'var(--branch-space)',
  },
  {
    id: 'undecided',
    name: 'Undecided',
    min: 31,
    popular: 'Explore all branches',
    color: 'var(--ink-3)',
  },
];
