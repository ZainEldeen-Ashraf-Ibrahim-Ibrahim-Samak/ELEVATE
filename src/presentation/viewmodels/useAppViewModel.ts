import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ChatThread, SpecialtyFilter, Trainer } from '../../domain/entities';
import { getFeaturedTrainer, getTrainers } from '../../domain/usecases/trainers';
import { resolveUserRole } from '../../domain/usecases/auth';
import { rotateIndex } from '../../domain/usecases/carousel';
import { container } from '../../app/container';

export type PlanTab = 'training' | 'diet';
export type LoginView = 'login' | 'forgot';
export type ActiveView = 'site' | 'admin' | 'coach';
export type AdminTab =
  | 'overview'
  | 'teams'
  | 'users'
  | 'plans'
  | 'dietPlan'
  | 'workoutPlan'
  | 'offers'
  | 'messages';
export type CoachTab = 'overview' | 'dietPlan' | 'workoutPlan' | 'messages';

const MOBILE_BREAKPOINT = 1080;
const OFFER_INTERVAL_MS = 5000;

export interface AppViewModel {
  // responsive nav
  isMobile: boolean;
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  // daily plan tabs
  planTab: PlanTab;
  setPlanTab: (tab: PlanTab) => void;
  // trainers
  filter: SpecialtyFilter;
  setFilter: (f: SpecialtyFilter) => void;
  visibleTrainers: Trainer[];
  featuredTrainer: Trainer;
  selectedTrainer: Trainer | null;
  openProfile: (id: string) => void;
  closeProfile: () => void;
  // offers carousel
  offerIndex: number;
  offerCount: number;
  nextOffer: () => void;
  prevOffer: () => void;
  goToOffer: (i: number) => void;
  // auth + dashboards
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
  // chat
  activeChat: string | null;
  chatThread: ChatThread | null;
  openChat: (name: string) => void;
  closeChat: () => void;
  // navigation
  scrollToPricing: () => void;
}

export function useAppViewModel(): AppViewModel {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [planTab, setPlanTab] = useState<PlanTab>('training');
  const [filter, setFilter] = useState<SpecialtyFilter>('all');
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(null);
  const [offerIndex, setOfferIndex] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [loginView, setLoginView] = useState<LoginView>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [activeView, setActiveView] = useState<ActiveView>('site');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [coachTab, setCoachTab] = useState<CoachTab>('overview');
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const offerCount = container.catalogRepository.getOffers().length;

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile((prev) => {
        if (mobile !== prev) setMenuOpen(false);
        return mobile;
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const nextOffer = useCallback(
    () => setOfferIndex((i) => rotateIndex(i, 1, offerCount)),
    [offerCount],
  );
  const prevOffer = useCallback(
    () => setOfferIndex((i) => rotateIndex(i, -1, offerCount)),
    [offerCount],
  );

  useEffect(() => {
    const timer = setInterval(nextOffer, OFFER_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [nextOffer]);

  const visibleTrainers = useMemo(
    () => getTrainers(container.trainerRepository, filter),
    [filter],
  );
  const featuredTrainer = useMemo(() => getFeaturedTrainer(container.trainerRepository), []);
  const selectedTrainer = useMemo(
    () =>
      selectedTrainerId
        ? (container.trainerRepository.getAll().find((t) => t.id === selectedTrainerId) ?? null)
        : null,
    [selectedTrainerId],
  );

  const chatThread = useMemo(
    () => (activeChat ? container.chatRepository.getThread(activeChat) : null),
    [activeChat],
  );

  const submitLogin = useCallback(() => {
    const role = resolveUserRole(loginEmail);
    setShowLogin(false);
    if (role === 'admin') {
      setActiveView('admin');
      setAdminTab('overview');
    } else if (role === 'trainer') {
      setActiveView('coach');
      setCoachTab('dietPlan');
    }
  }, [loginEmail]);

  const exitDashboard = useCallback(() => {
    setActiveView('site');
    setLoginEmail('');
    setAdminTab('overview');
    setCoachTab('overview');
  }, []);

  const scrollToPricing = useCallback(() => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return {
    isMobile,
    menuOpen,
    toggleMenu: useCallback(() => setMenuOpen((v) => !v), []),
    closeMenu: useCallback(() => setMenuOpen(false), []),
    planTab,
    setPlanTab,
    filter,
    setFilter,
    visibleTrainers,
    featuredTrainer,
    selectedTrainer,
    openProfile: useCallback((id: string) => setSelectedTrainerId(id), []),
    closeProfile: useCallback(() => setSelectedTrainerId(null), []),
    offerIndex,
    offerCount,
    nextOffer,
    prevOffer,
    goToOffer: useCallback((i: number) => setOfferIndex(i), []),
    showLogin,
    loginView,
    loginEmail,
    setLoginEmail,
    openLogin: useCallback(() => {
      setShowLogin(true);
      setLoginView('login');
    }, []),
    closeLogin: useCallback(() => setShowLogin(false), []),
    goForgot: useCallback(() => setLoginView('forgot'), []),
    goLogin: useCallback(() => setLoginView('login'), []),
    submitLogin,
    activeView,
    adminTab,
    setAdminTab,
    coachTab,
    setCoachTab,
    exitDashboard,
    activeChat,
    chatThread,
    openChat: useCallback((name: string) => setActiveChat(name), []),
    closeChat: useCallback(() => setActiveChat(null), []),
    scrollToPricing,
  };
}
