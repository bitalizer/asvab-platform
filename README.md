# asvab-platform

ASVAB prep platform. The product ships under the **MissionReady** brand; the codebase uses the technical name `asvab-platform` and the `@asvab/*` namespace for workspace packages.

Monorepo for web (Next.js 16.2), worker (Node + BullMQ), and ai (Python + FastAPI).

## Quick start (local dev)

```bash
pnpm install
cp .env.example .env  # fill in secrets before running
pnpm dev
```

## Apps

- `apps/web` — Next.js public site + admin (port 3000)
- `apps/worker` — BullMQ worker (no port)
- `apps/ai` — Python FastAPI AI service (port 8000)

## Packages

- `packages/db` — Drizzle schema + migrations
- `packages/config` — shared tsconfig and biome config
