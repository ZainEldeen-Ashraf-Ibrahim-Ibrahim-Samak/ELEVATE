'use client';

import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAppViewModel } from './useAppViewModel';
import type { AppViewModel } from './useAppViewModel';
import { useAppDispatch } from '@/store/hooks';
import { uiActions } from '@/store/uiSlice';
import { useGetCatalogQuery } from '@/store/apiSlice';

const AppViewModelContext = createContext<AppViewModel | null>(null);

const MOBILE_BREAKPOINT = 1080;
const OFFER_INTERVAL_MS = 5000;

export function AppViewModelProvider({ children }: { children: ReactNode }) {
  const vm = useAppViewModel();
  const dispatch = useAppDispatch();
  const { data: catalog } = useGetCatalogQuery();

  useEffect(() => {
    const onResize = () =>
      dispatch(uiActions.setIsMobile(window.innerWidth < MOBILE_BREAKPOINT));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [dispatch]);

  useEffect(() => {
    dispatch(uiActions.setOfferCount(catalog?.offers.length ?? 0));
  }, [dispatch, catalog?.offers.length]);

  useEffect(() => {
    const timer = setInterval(() => dispatch(uiActions.nextOffer()), OFFER_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [dispatch]);

  return <AppViewModelContext.Provider value={vm}>{children}</AppViewModelContext.Provider>;
}

export function useAppVM(): AppViewModel {
  const vm = useContext(AppViewModelContext);
  if (!vm) throw new Error('useAppVM must be used within AppViewModelProvider');
  return vm;
}
