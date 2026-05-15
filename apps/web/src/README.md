# apps/web/src/

Source code for the MissionReady web app. Top-level subfolders below.

| Folder | Purpose |
|---|---|
| `app/` | Next.js App Router (pages, layouts, route handlers). Each route folder may contain `_components/` and other `_*` private folders for route-local code. |
| `app/layouts/` | Shared layout *helper components* composed into the route-group `layout.tsx` files. (The `layout.tsx` files themselves must stay at their file-convention paths.) |
| `components/` | Reusable UI shared across **multiple routes**: `ui/` (shadcn primitives), `shell/` (AppShell), `brand/` (Logo, Mascot), `charts/` (Ring, Sparkline), `primitives/` (Icon, Pill), `auth/` (auth-card, sso-buttons). |
| `config/` | App-wide config: constants, navigation, theme. Currently empty — populate as needed. |
| `contexts/` | React Contexts used across multiple components. Currently empty. |
| `features/` | Feature modules. Each feature can have `components/`, `hooks/`, `services/`, `types/`, `utils/`. Use this when a feature spans multiple routes or has substantial domain logic. |
| `hooks/` | Globally-reusable hooks (`useDebounce`, `useLocalStorage`, ...). Currently empty. |
| `lib/` | Library code. `data/` is the server-only data layer (Drizzle access, request-cached). `api/`, `services/`, `utils/` are for non-DB library code. Top-level files like `auth.ts`, `env.ts`, `brand.ts`, `placeholder-data.ts`, `onboarding.ts`, `email.ts`, `email-templates.ts`, `utils.ts` live here. |
| `providers/` | Global providers (theme, query client, etc.). Currently empty — providers are mounted in the root layout directly until we have enough to extract. |
| `stores/` | Client-side state stores (e.g., Zustand, Redux). Currently empty. |
| `styles/` | Global stylesheets. `tokens.css` holds the prototype CSS variables. |
| `types/` | Globally-shared TypeScript types (API contracts, shared interfaces). Currently empty — most types live in `@asvab/db` or alongside the code that uses them. |
| `utils/` | Generic helpers (validation, formatting, etc.). Currently empty — until duplication shows up, helpers live next to their callers. |
| `middleware.ts` | Next.js edge middleware. Enforces session-cookie check on protected routes. |
| `__tests__/` | Vitest unit tests that don't live next to their source. Co-located `*.test.ts` files are also picked up. |

## Rules

- The `@/` import alias points to this directory (`src/`).
- Code in `@asvab/db` is the single source for DB schema + types. Only `lib/data/*` imports from it.
- `'server-only'` directive on data-layer files prevents accidental client imports.
- Single-use UI components live in `app/<route>/_components/`, never in `components/`.
