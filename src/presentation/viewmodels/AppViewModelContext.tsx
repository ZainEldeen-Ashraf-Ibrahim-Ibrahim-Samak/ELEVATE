import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useAppViewModel } from './useAppViewModel';
import type { AppViewModel } from './useAppViewModel';

const AppViewModelContext = createContext<AppViewModel | null>(null);

export function AppViewModelProvider({ children }: { children: ReactNode }) {
  const vm = useAppViewModel();
  return <AppViewModelContext.Provider value={vm}>{children}</AppViewModelContext.Provider>;
}

export function useAppVM(): AppViewModel {
  const vm = useContext(AppViewModelContext);
  if (!vm) throw new Error('useAppVM must be used within AppViewModelProvider');
  return vm;
}
