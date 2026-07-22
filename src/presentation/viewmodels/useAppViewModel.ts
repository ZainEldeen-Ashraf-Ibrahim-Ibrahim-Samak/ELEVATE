'use client';

import { useCallback, useMemo } from 'react';
import type { ChatThread, SpecialtyFilter, Trainer } from '@/domain/entities';
import { getFeaturedTrainer, getTrainers } from '@/domain/usecases/trainers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { uiActions } from '@/store/uiSlice';
import type { ActiveView, AdminTab, CoachTab, LoginView, PlanTab } from '@/store/uiSlice';
import {
  useGetChatThreadQuery,
  useGetTrainersQuery,
  useLoginMutation,
} from '@/store/apiSlice';

export interface AppViewModel {
  isMobile: boolean;
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  planTab: PlanTab;
  setPlanTab: (tab: PlanTab) => void;
  filter: SpecialtyFilter;
  setFilter: (f: SpecialtyFilter) => void;
  visibleTrainers: Trainer[];
  featuredTrainer: Trainer | null;
  selectedTrainer: Trainer | null;
  openProfile: (id: string) => void;
  closeProfile: () => void;
  offerIndex: number;
  nextOffer: () => void;
  prevOffer: () => void;
  goToOffer: (i: number) => void;
  showLogin: boolean;
  loginView: LoginView;
  loginEmail: string;
  setLoginEmail: (v: string) => void;
  openLogin: () => void;
  closeLogin: () => void;
  goForgot: () => void;
  goLogin: () => void;
  submitLogin: () => void;
  activeView: ActiveView;
  adminTab: AdminTab;
  setAdminTab: (t: AdminTab) => void;
  coachTab: CoachTab;
  setCoachTab: (t: CoachTab) => void;
  exitDashboard: () => void;
  activeChat: string | null;
  chatThread: ChatThread | null;
  openChat: (name: string) => void;
  closeChat: () => void;
  scrollToPricing: () => void;
}

/**
 * MVVM view-model hook: exposes UI state (Redux) and remote data (RTK Query)
 * to the views. Views never touch the store or fetch layer directly.
 */
export function useAppViewModel(): AppViewModel {
  const dispatch = useAppDispatch();
  const ui = useAppSelector((s) => s.ui);
  const { data: trainers = [] } = useGetTrainersQuery();
  const { data: chatThreadData } = useGetChatThreadQuery(ui.activeChat ?? '', {
    skip: ui.activeChat == null,
  });
  const [login] = useLoginMutation();

  const trainerRepo = useMemo(() => ({ getAll: () => trainers }), [trainers]);
  const visibleTrainers = useMemo(
    () => getTrainers(trainerRepo, ui.filter),
    [trainerRepo, ui.filter],
  );
  const featuredTrainer = useMemo(
    () => (trainers.length > 0 ? getFeaturedTrainer(trainerRepo) : null),
    [trainerRepo, trainers.length],
  );
  const selectedTrainer = useMemo(
    () =>
      ui.selectedTrainerId != null
        ? (trainers.find((t) => t.id === ui.selectedTrainerId) ?? null)
        : null,
    [trainers, ui.selectedTrainerId],
  );

  const submitLogin = useCallback(async () => {
    try {
      const { role } = await login({ identifier: ui.loginEmail }).unwrap();
      dispatch(uiActions.loginSucceeded(role));
    } catch {
      dispatch(uiActions.closeLogin());
    }
  }, [dispatch, login, ui.loginEmail]);

  const scrollToPricing = useCallback(() => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return {
    isMobile: ui.isMobile,
    menuOpen: ui.menuOpen,
    toggleMenu: useCallback(() => dispatch(uiActions.toggleMenu()), [dispatch]),
    closeMenu: useCallback(() => dispatch(uiActions.closeMenu()), [dispatch]),
    planTab: ui.planTab,
    setPlanTab: useCallback((tab: PlanTab) => dispatch(uiActions.setPlanTab(tab)), [dispatch]),
    filter: ui.filter,
    setFilter: useCallback(
      (f: SpecialtyFilter) => dispatch(uiActions.setFilter(f)),
      [dispatch],
    ),
    visibleTrainers,
    featuredTrainer,
    selectedTrainer,
    openProfile: useCallback((id: string) => dispatch(uiActions.openProfile(id)), [dispatch]),
    closeProfile: useCallback(() => dispatch(uiActions.closeProfile()), [dispatch]),
    offerIndex: ui.offerIndex,
    nextOffer: useCallback(() => dispatch(uiActions.nextOffer()), [dispatch]),
    prevOffer: useCallback(() => dispatch(uiActions.prevOffer()), [dispatch]),
    goToOffer: useCallback((i: number) => dispatch(uiActions.goToOffer(i)), [dispatch]),
    showLogin: ui.showLogin,
    loginView: ui.loginView,
    loginEmail: ui.loginEmail,
    setLoginEmail: useCallback(
      (v: string) => dispatch(uiActions.setLoginEmail(v)),
      [dispatch],
    ),
    openLogin: useCallback(() => dispatch(uiActions.openLogin()), [dispatch]),
    closeLogin: useCallback(() => dispatch(uiActions.closeLogin()), [dispatch]),
    goForgot: useCallback(() => dispatch(uiActions.setLoginView('forgot')), [dispatch]),
    goLogin: useCallback(() => dispatch(uiActions.setLoginView('login')), [dispatch]),
    submitLogin,
    activeView: ui.activeView,
    adminTab: ui.adminTab,
    setAdminTab: useCallback((t: AdminTab) => dispatch(uiActions.setAdminTab(t)), [dispatch]),
    coachTab: ui.coachTab,
    setCoachTab: useCallback((t: CoachTab) => dispatch(uiActions.setCoachTab(t)), [dispatch]),
    exitDashboard: useCallback(() => dispatch(uiActions.exitDashboard()), [dispatch]),
    activeChat: ui.activeChat,
    chatThread: ui.activeChat != null ? (chatThreadData ?? null) : null,
    openChat: useCallback((name: string) => dispatch(uiActions.openChat(name)), [dispatch]),
    closeChat: useCallback(() => dispatch(uiActions.closeChat()), [dispatch]),
    scrollToPricing,
  };
}
