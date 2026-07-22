'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store';
import type { AppStore } from '@/store';
import { I18nProvider } from '@/core/i18n';

export function Providers({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  storeRef.current ??= makeStore();
  return (
    <Provider store={storeRef.current}>
      <I18nProvider>{children}</I18nProvider>
    </Provider>
  );
}
