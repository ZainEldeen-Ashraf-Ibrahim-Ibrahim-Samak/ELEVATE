import { describe, expect, it } from 'vitest';
import { en } from './locales/en';
import { ar } from './locales/ar';
import { translate, translateList } from './translate';

function keyPaths(tree: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(tree).flatMap(([k, v]) => {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v != null && typeof v === 'object' && !Array.isArray(v)) {
      return keyPaths(v as Record<string, unknown>, path);
    }
    return [path];
  });
}

describe('i18n locales', () => {
  it('ar covers every en key (no missing translations)', () => {
    expect(keyPaths(ar as unknown as Record<string, unknown>).sort()).toEqual(
      keyPaths(en as unknown as Record<string, unknown>).sort(),
    );
  });

  it('has no empty strings in any locale', () => {
    for (const tree of [en, ar]) {
      const flat = keyPaths(tree as unknown as Record<string, unknown>);
      for (const path of flat) {
        const value = path
          .split('.')
          .reduce<unknown>((n, p) => (n as Record<string, unknown>)[p], tree);
        if (typeof value === 'string') expect(value.length, path).toBeGreaterThan(0);
      }
    }
  });
});

describe('translate', () => {
  it('resolves nested keys', () => {
    expect(translate('en', 'nav.trainers')).toBe('Trainers');
    expect(translate('ar', 'nav.trainers')).toBe('المدربون');
  });

  it('interpolates params', () => {
    expect(translate('en', 'trainerProfile.bookIntro', { name: 'Omar K.' })).toBe(
      'Book intro call with Omar K.',
    );
  });

  it('falls back to the key when missing', () => {
    expect(translate('en', 'does.not.exist')).toBe('does.not.exist');
  });

  it('returns perk lists', () => {
    expect(translateList('en', 'pricing.plans.coached.perks')).toHaveLength(4);
    expect(translateList('ar', 'pricing.plans.coached.perks')).toHaveLength(4);
  });
});
