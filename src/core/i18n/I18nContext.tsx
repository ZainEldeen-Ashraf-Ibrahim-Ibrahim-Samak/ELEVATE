import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultLocale, translate, translateList } from './translate';
import type { Locale, TranslateFn } from './translate';

interface I18nValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: TranslateFn;
  tList: (key: string) => string[];
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const dir: 'ltr' | 'rtl' = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const t = useCallback<TranslateFn>((key, params) => translate(locale, key, params), [locale]);
  const tList = useCallback((key: string) => translateList(locale, key), [locale]);
  const toggleLocale = useCallback(() => setLocale((l) => (l === 'en' ? 'ar' : 'en')), []);

  const value = useMemo(
    () => ({ locale, dir, setLocale, toggleLocale, t, tList }),
    [locale, dir, toggleLocale, t, tList],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider');
  return ctx;
}

export function useTranslation(): { t: TranslateFn; tList: (key: string) => string[] } {
  const { t, tList } = useI18n();
  return { t, tList };
}
