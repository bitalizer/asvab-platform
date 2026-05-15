import { closeConnection, getConnection } from './lib/redis.js';

async function main(): Promise<void> {
  console.log('[worker] starting');
  const connection = getConnection();
  await connection.connect();
  await connection.ping();
  console.log('[worker] connected to Redis');
  console.log('[worker] ready');
  // Job queues will be registered in a later plan.
  // The process stays alive because the ioredis connection holds it open.
}

main().catch((err: unknown) => {
  console.error('[worker] startup failed:', err);
  process.exit(1);
});

const shutdown = async (signal: string): Promise<void> => {
  console.log(`[worker] ${signal} received, shutting down`);
  await closeConnection();
  process.exit(0);
};

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});
