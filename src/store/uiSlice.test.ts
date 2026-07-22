import { describe, expect, it } from 'vitest';
import { uiActions, uiReducer } from './uiSlice';
import type { UiState } from './uiSlice';

const base = (): UiState => uiReducer(undefined, { type: '@@init' });

describe('uiSlice', () => {
  it('wraps the offer carousel using the domain rotate use case', () => {
    let state = { ...base(), offerCount: 3 };
    state = uiReducer(state, uiActions.prevOffer());
    expect(state.offerIndex).toBe(2);
    state = uiReducer(state, uiActions.nextOffer());
    expect(state.offerIndex).toBe(0);
  });

  it('routes admin logins to the admin dashboard', () => {
    const state = uiReducer(base(), uiActions.loginSucceeded('admin'));
    expect(state.activeView).toBe('admin');
    expect(state.showLogin).toBe(false);
  });

  it('routes trainer logins to the coach diet tab', () => {
    const state = uiReducer(base(), uiActions.loginSucceeded('trainer'));
    expect(state.activeView).toBe('coach');
    expect(state.coachTab).toBe('dietPlan');
  });

  it('keeps members on the site', () => {
    const state = uiReducer(base(), uiActions.loginSucceeded('member'));
    expect(state.activeView).toBe('site');
  });

  it('exitDashboard resets view state and clears the login email', () => {
    let state = uiReducer(base(), uiActions.setLoginEmail('admin'));
    state = uiReducer(state, uiActions.loginSucceeded('admin'));
    state = uiReducer(state, uiActions.exitDashboard());
    expect(state.activeView).toBe('site');
    expect(state.loginEmail).toBe('');
    expect(state.adminTab).toBe('overview');
  });

  it('closes the mobile menu when the breakpoint changes', () => {
    let state = uiReducer(base(), uiActions.setIsMobile(true));
    state = uiReducer(state, uiActions.toggleMenu());
    expect(state.menuOpen).toBe(true);
    state = uiReducer(state, uiActions.setIsMobile(false));
    expect(state.menuOpen).toBe(false);
  });

  it('clamps the offer index when the count shrinks', () => {
    let state = { ...base(), offerCount: 3, offerIndex: 2 };
    state = uiReducer(state, uiActions.setOfferCount(2));
    expect(state.offerIndex).toBe(0);
  });
});
