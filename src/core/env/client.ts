import type { Locale } from '@/core/i18n/translate';

/**
 * Client-safe environment config. Only NEXT_PUBLIC_* vars are readable in
 * the browser, so every value here must come from one. Values are resolved
 * once at module load and validated so a bad .env fails fast instead of
 * silently falling through to `undefined` deep in a component.
 */
function readLocale(value: string | undefined): Locale {
  return value === 'ar' ? 'ar' : 'en';
}

export const clientEnv = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? 'ELEVATE',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api',
  defaultLocale: readLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE),
} as const;
