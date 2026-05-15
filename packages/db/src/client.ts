import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/index';

export type Database = NodePgDatabase<typeof schema>;

type CacheEntry = {
  pool: Pool;
  db: Database;
};

const globalForDb = globalThis as unknown as {
  __mrDbCache?: Map<string, CacheEntry>;
};

function getCache(): Map<string, CacheEntry> {
  if (!globalForDb.__mrDbCache) {
    globalForDb.__mrDbCache = new Map();
  }
  return globalForDb.__mrDbCache;
}

export function getDb(connectionString: string): Database {
  const cache = getCache();
  const existing = cache.get(connectionString);
  if (existing) {
    return existing.db;
  }
  const pool = new Pool({
    connectionString,
    connectionTimeoutMillis: 10_000,
  });
  const db = drizzle(pool, { schema });
  cache.set(connectionString, { pool, db });
  return db;
}

export async function closeDb(): Promise<void> {
  const cache = getCache();
  await Promise.all(Array.from(cache.values()).map((entry) => entry.pool.end()));
  cache.clear();
}
