import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { envSchema } from './env';

const valid = {
  DATABASE_URL: 'postgresql://u:p@h:5432/db',
  REDIS_URL: 'redis://localhost:6379',
  BETTER_AUTH_SECRET: 'a'.repeat(32),
  BETTER_AUTH_URL: 'http://localhost:3000',
  AI_SERVICE_URL: 'http://localhost:8000',
};

describe('envSchema', () => {
  it('parses a valid env object', () => {
    const result = envSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('rejects a short BETTER_AUTH_SECRET', () => {
    const result = envSchema.safeParse({ ...valid, BETTER_AUTH_SECRET: 'short' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid DATABASE_URL', () => {
    const result = envSchema.safeParse({ ...valid, DATABASE_URL: 'not-a-url' });
    expect(result.success).toBe(false);
  });

  it('accepts the optional OAuth fields when omitted', () => {
    const result = envSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.GOOGLE_CLIENT_ID).toBeUndefined();
    }
  });

  it('rejects the placeholder secret from .env.example', () => {
    const result = envSchema.safeParse({
      ...valid,
      BETTER_AUTH_SECRET: 'replace-with-32-char-random-string-min',
    });
    expect(result.success).toBe(false);
  });
});

describe('getEnv()', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('does not throw at module import time when env is invalid', async () => {
    vi.stubEnv('DATABASE_URL', '');
    vi.stubEnv('REDIS_URL', '');
    vi.stubEnv('BETTER_AUTH_SECRET', '');
    vi.stubEnv('BETTER_AUTH_URL', '');
    vi.stubEnv('AI_SERVICE_URL', '');

    await expect(import('./env')).resolves.toBeDefined();
  });

  it('caches the parsed env between calls', async () => {
    vi.stubEnv('DATABASE_URL', valid.DATABASE_URL);
    vi.stubEnv('REDIS_URL', valid.REDIS_URL);
    vi.stubEnv('BETTER_AUTH_SECRET', valid.BETTER_AUTH_SECRET);
    vi.stubEnv('BETTER_AUTH_URL', valid.BETTER_AUTH_URL);
    vi.stubEnv('AI_SERVICE_URL', valid.AI_SERVICE_URL);

    const mod = await import('./env');
    const first = mod.getEnv();

    vi.stubEnv('DATABASE_URL', 'postgresql://different:host@new:5432/db');
    const second = mod.getEnv();

    expect(second).toBe(first);
    expect(second.DATABASE_URL).toBe(valid.DATABASE_URL);
  });
});
