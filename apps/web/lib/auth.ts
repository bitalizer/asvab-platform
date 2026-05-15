import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { getDb } from '@mr/db';
import { betterAuth } from 'better-auth';
import { admin } from 'better-auth/plugins';
import { getEnv } from './env';

type SocialProvider = { clientId: string; clientSecret: string };

function resolveSocialProvider(
  name: string,
  id: string | undefined,
  secret: string | undefined,
): SocialProvider | undefined {
  if (!id && !secret) {
    return undefined;
  }
  if (!id || !secret) {
    throw new Error(
      `${name} OAuth: both clientId and clientSecret must be set, or both left empty.`,
    );
  }
  return { clientId: id, clientSecret: secret };
}

// No explicit return type on purpose: lets TypeScript infer the narrow
// concrete shape that the admin() plugin contributes to the user table.
function buildAuth() {
  const env = getEnv();
  const db = getDb(env.DATABASE_URL);

  const google = resolveSocialProvider('Google', env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET);
  const apple = resolveSocialProvider('Apple', env.APPLE_CLIENT_ID, env.APPLE_CLIENT_SECRET);

  return betterAuth({
    database: drizzleAdapter(db, { provider: 'pg' }),
    emailAndPassword: {
      enabled: true,
      // autoSignIn=false requires email verification before login.
      // The Resend-backed verification flow is wired in a later plan; until then,
      // email/password signups cannot log in. Social providers work normally.
      autoSignIn: false,
    },
    socialProviders: {
      ...(google ? { google } : {}),
      ...(apple ? { apple } : {}),
    },
    plugins: [admin()],
    trustedOrigins: [env.BETTER_AUTH_URL],
  });
}

export type Auth = ReturnType<typeof buildAuth>;

let cached: Auth | undefined;

export function getAuth(): Auth {
  if (!cached) {
    cached = buildAuth();
  }
  return cached;
}
