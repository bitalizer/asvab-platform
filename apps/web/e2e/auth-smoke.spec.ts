/**
 * Plan 02 happy-path smoke tests.
 *
 * Test 1: signup → onboarding wizard → dashboard
 * Test 2: every authed page renders without JS errors
 *
 * Uses serial mode so both tests share the same registered user.
 */

import { expect, test } from '@playwright/test';

const TEST_EMAIL = `smoke-${Date.now()}@example.test`;
const TEST_PASSWORD = 'plan02-smoke-test-pw';

const AUTHED_PAGES = [
  '/dashboard',
  '/practice',
  '/mock-exam',
  '/progress',
  '/learn',
  '/flashcards',
  '/mistakes',
  '/bookmarks',
  '/question-bank',
  '/study-plan',
  '/achievements',
  '/notifications',
  '/settings',
  '/profile',
] as const;

test.describe('Plan 02 smoke tests', () => {
  // Increase per-test timeout — first compile of each page is slow in dev mode.
  test.describe.configure({ mode: 'serial', timeout: 60_000 });

  test('signup → onboarding → dashboard happy path', async ({ page }) => {
    // ── Step 1: Sign up ────────────────────────────────────────────────────────
    await page.goto('/signup');

    // Fill name
    await page.getByLabel('Name').fill('Smoke Tester');

    // Fill email — prefer name attribute as react-hook-form may not wire label perfectly
    const emailInput = page
      .locator('input[name=email]')
      .or(page.getByLabel('Email', { exact: true }));
    await emailInput.first().fill(TEST_EMAIL);

    // Fill password
    const passwordInput = page
      .locator('input[name=password]')
      .or(page.getByLabel('Password', { exact: true }));
    await passwordInput.first().fill(TEST_PASSWORD);

    // Check terms checkbox — the visible label is a long string, so target by role
    await page.getByRole('checkbox').check();

    // Submit
    await page.getByRole('button', { name: /create account/i }).click();

    // ── Step 2: Onboarding wizard ──────────────────────────────────────────────
    await page.waitForURL('/onboarding', { timeout: 20_000 });

    // Step 1 — Welcome: click "Let's begin"
    await page.getByRole('button', { name: /let.{1,5}s begin/i }).click();

    // Step 2 — Branch: click the Army card (aria-pressed button)
    await page.getByRole('button', { name: /Army/i }).first().click();
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 3 — Target AFQT: just Continue
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 4 — Test date: just Continue
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 5 — Schedule: just Continue
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 6 — Background: click "HS grad" and "Algebra 2" chips, then Continue
    await page.getByRole('button', { name: /HS grad/i }).click();
    await page.getByRole('button', { name: /Algebra 2/i }).click();
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 7 — Diagnostic: click the "Skip for now" CARD (not the header skip).
    // The header has a button labeled just "Skip for now"; the diagnostic card
    // has a longer accessible name that includes "Start with lessons". Match
    // the card by that distinguishing text.
    await page.getByRole('button', { name: /start with lessons/i }).click();

    // Step 8 — Plan: click "Start Day 1"
    await page.getByRole('button', { name: /start day 1/i }).click();

    // ── Verify dashboard ───────────────────────────────────────────────────────
    await page.waitForURL('/dashboard', { timeout: 20_000 });
    await expect(page.getByText(/welcome back/i)).toBeVisible({ timeout: 15_000 });
  });

  test('every authed page renders without console errors', async ({ page }) => {
    // Log in as the user created in Test 1 (module-scoped TEST_EMAIL / TEST_PASSWORD)
    await page.goto('/login');

    const emailInput = page
      .locator('input[name=email]')
      .or(page.getByLabel('Email', { exact: true }));
    await emailInput.first().fill(TEST_EMAIL);

    const passwordInput = page
      .locator('input[name=password]')
      .or(page.getByLabel('Password', { exact: true }));
    await passwordInput.first().fill(TEST_PASSWORD);

    await page.getByRole('button', { name: /log in/i }).click();
    await page.waitForURL('/dashboard', { timeout: 20_000 });

    // Walk through each page and assert no pageerror events
    for (const path of AUTHED_PAGES) {
      const errors: string[] = [];
      const onError = (err: Error) => errors.push(err.message);
      page.on('pageerror', onError);

      await page.goto(path);
      await page.waitForLoadState('networkidle', { timeout: 30_000 });

      page.off('pageerror', onError);

      expect(errors, `Page ${path} had JS errors: ${errors.join('; ')}`).toHaveLength(0);
    }
  });
});
