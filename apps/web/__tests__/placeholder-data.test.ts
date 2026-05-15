import {
  PLACEHOLDER_ACHIEVEMENTS,
  PLACEHOLDER_COMPOSITE_SCORES,
  PLACEHOLDER_FLASHCARD_DECKS,
  PLACEHOLDER_JOBS,
  PLACEHOLDER_LESSONS,
  PLACEHOLDER_MISTAKES,
  PLACEHOLDER_NOTIFICATIONS,
  PLACEHOLDER_RECENT_BADGES,
  PLACEHOLDER_SECTIONS,
  PLACEHOLDER_TODAY_TASKS,
  PLACEHOLDER_USER,
} from '@/lib/placeholder-data';
import { describe, expect, it } from 'vitest';

describe('placeholder data shape', () => {
  it('has 9 ASVAB sections, 4 of which are AFQT-critical', () => {
    expect(PLACEHOLDER_SECTIONS).toHaveLength(9);
    expect(PLACEHOLDER_SECTIONS.filter((s) => s.afqt)).toHaveLength(4);
  });

  it('has at least 10 jobs', () => {
    expect(PLACEHOLDER_JOBS.length).toBeGreaterThanOrEqual(10);
  });

  it('PLACEHOLDER_USER has required fields', () => {
    expect(PLACEHOLDER_USER.name).toBeTruthy();
    expect(PLACEHOLDER_USER.targetAfqt).toBeGreaterThan(0);
    expect(PLACEHOLDER_USER.currentAfqt).toBeGreaterThan(0);
  });

  it('all section mastery values are in [0, 1]', () => {
    for (const s of PLACEHOLDER_SECTIONS) {
      expect(s.mastery).toBeGreaterThanOrEqual(0);
      expect(s.mastery).toBeLessThanOrEqual(1);
    }
  });

  it('composite scores are positive', () => {
    expect(PLACEHOLDER_COMPOSITE_SCORES.length).toBeGreaterThan(0);
    for (const c of PLACEHOLDER_COMPOSITE_SCORES) {
      expect(c.your).toBeGreaterThan(0);
    }
  });

  it('today tasks have valid types', () => {
    for (const t of PLACEHOLDER_TODAY_TASKS) {
      expect(['practice', 'lesson', 'flash', 'drill']).toContain(t.type);
    }
  });

  it('all lists are non-empty', () => {
    expect(PLACEHOLDER_RECENT_BADGES.length).toBeGreaterThan(0);
    expect(PLACEHOLDER_ACHIEVEMENTS.length).toBeGreaterThan(0);
    expect(PLACEHOLDER_LESSONS.length).toBeGreaterThan(0);
    expect(PLACEHOLDER_FLASHCARD_DECKS.length).toBeGreaterThan(0);
    expect(PLACEHOLDER_MISTAKES.length).toBeGreaterThan(0);
    expect(PLACEHOLDER_NOTIFICATIONS.length).toBeGreaterThan(0);
  });
});
