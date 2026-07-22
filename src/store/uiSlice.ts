import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SpecialtyFilter, UserRole } from '@/domain/entities';
import { rotateIndex } from '@/domain/usecases/carousel';

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

export interface UiState {
  isMobile: boolean;
  menuOpen: boolean;
  planTab: PlanTab;
  filter: SpecialtyFilter;
  selectedTrainerId: string | null;
  offerIndex: number;
  offerCount: number;
  showLogin: boolean;
  loginView: LoginView;
  loginEmail: string;
  activeView: ActiveView;
  adminTab: AdminTab;
  coachTab: CoachTab;
  activeChat: string | null;
}

const initialState: UiState = {
  isMobile: false,
  menuOpen: false,
  planTab: 'training',
  filter: 'all',
  selectedTrainerId: null,
  offerIndex: 0,
  offerCount: 0,
  showLogin: false,
  loginView: 'login',
  loginEmail: '',
  activeView: 'site',
  adminTab: 'overview',
  coachTab: 'overview',
  activeChat: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsMobile(state, action: PayloadAction<boolean>) {
      if (state.isMobile !== action.payload) state.menuOpen = false;
      state.isMobile = action.payload;
    },
    toggleMenu(state) {
      state.menuOpen = !state.menuOpen;
    },
    closeMenu(state) {
      state.menuOpen = false;
    },
    setPlanTab(state, action: PayloadAction<PlanTab>) {
      state.planTab = action.payload;
    },
    setFilter(state, action: PayloadAction<SpecialtyFilter>) {
      state.filter = action.payload;
    },
    openProfile(state, action: PayloadAction<string>) {
      state.selectedTrainerId = action.payload;
    },
    closeProfile(state) {
      state.selectedTrainerId = null;
    },
    setOfferCount(state, action: PayloadAction<number>) {
      state.offerCount = action.payload;
      if (state.offerIndex >= action.payload) state.offerIndex = 0;
    },
    nextOffer(state) {
      state.offerIndex = rotateIndex(state.offerIndex, 1, state.offerCount);
    },
    prevOffer(state) {
      state.offerIndex = rotateIndex(state.offerIndex, -1, state.offerCount);
    },
    goToOffer(state, action: PayloadAction<number>) {
      state.offerIndex = action.payload;
    },
    openLogin(state) {
      state.showLogin = true;
      state.loginView = 'login';
    },
    closeLogin(state) {
      state.showLogin = false;
    },
    setLoginView(state, action: PayloadAction<LoginView>) {
      state.loginView = action.payload;
    },
    setLoginEmail(state, action: PayloadAction<string>) {
      state.loginEmail = action.payload;
    },
    loginSucceeded(state, action: PayloadAction<UserRole>) {
      state.showLogin = false;
      if (action.payload === 'admin') {
        state.activeView = 'admin';
        state.adminTab = 'overview';
      } else if (action.payload === 'trainer') {
        state.activeView = 'coach';
        state.coachTab = 'dietPlan';
      }
    },
    exitDashboard(state) {
      state.activeView = 'site';
      state.loginEmail = '';
      state.adminTab = 'overview';
      state.coachTab = 'overview';
    },
    setAdminTab(state, action: PayloadAction<AdminTab>) {
      state.adminTab = action.payload;
    },
    setCoachTab(state, action: PayloadAction<CoachTab>) {
      state.coachTab = action.payload;
    },
    openChat(state, action: PayloadAction<string>) {
      state.activeChat = action.payload;
    },
    closeChat(state) {
      state.activeChat = null;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
