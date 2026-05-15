import IORedis from 'ioredis';
import { getEnv } from './env.js';

let cached: IORedis | undefined;

export function getConnection(): IORedis {
  if (!cached) {
    const env = getEnv();
    // lazyConnect=true defers the TCP handshake until connect() is awaited
    // explicitly. Combined with the await in index.ts, this gives us fast-fail
    // behavior on boot when Redis is unreachable, without racing the first
    // command against an in-flight handshake.
    //
    // BullMQ Workers in a later plan will use a separate connection where the
    // default behavior (eager connect + maxRetriesPerRequest:null) is what's
    // wanted — they need to survive transient reconnects mid-job.
    cached = new IORedis(env.REDIS_URL, {
      maxRetriesPerRequest: null,
      lazyConnect: true,
    });
    cached.on('error', (err: Error) => {
      console.error('[worker] redis connection error:', err);
    });
  }
  return cached;
}

export async function closeConnection(): Promise<void> {
  if (cached) {
    await cached.quit();
    cached = undefined;
  }
}
