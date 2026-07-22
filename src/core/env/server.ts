import 'server-only';

/**
 * Server-only environment config. Importing 'server-only' makes any
 * accidental client-bundle import of this module fail at build time instead
 * of silently leaking a value that was never meant to reach the browser.
 */
function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const serverEnv = {
  siteUrl: process.env.SITE_URL ?? 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV,
} as const;

export function assertServerEnv(): void {
  required('SITE_URL', serverEnv.siteUrl);
}
