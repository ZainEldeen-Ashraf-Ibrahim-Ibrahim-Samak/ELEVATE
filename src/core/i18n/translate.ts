import { en, type Messages } from './locales/en';
import { ar } from './locales/ar';

export type Locale = 'en' | 'ar';

export const locales: Record<Locale, Messages> = { en, ar };
export const defaultLocale: Locale = 'en';

export type TranslateParams = Record<string, string | number>;
export type TranslateFn = (key: string, params?: TranslateParams) => string;

/**
 * Resolves a dot-separated key (e.g. "pricing.plans.coached.name") against the
 * locale's message tree, falling back to the default locale, then to the key
 * itself so missing entries are visible instead of blank.
 */
export function translate(locale: Locale, key: string, params?: TranslateParams): string {
  const value = lookup(locales[locale], key) ?? lookup(locales[defaultLocale], key) ?? key;
  if (params == null) return value;
  return value.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}

/** Returns the string array at a dot-separated key (e.g. plan perks). */
export function translateList(locale: Locale, key: string): string[] {
  const node = lookupNode(locales[locale], key) ?? lookupNode(locales[defaultLocale], key);
  return Array.isArray(node) ? node.map(String) : [];
}

function lookupNode(tree: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>((node, part) => {
    if (node != null && typeof node === 'object' && part in (node as Record<string, unknown>)) {
      return (node as Record<string, unknown>)[part];
    }
    return undefined;
  }, tree);
}

function lookup(tree: unknown, key: string): string | undefined {
  const node = lookupNode(tree, key);
  return typeof node === 'string' ? node : undefined;
}
