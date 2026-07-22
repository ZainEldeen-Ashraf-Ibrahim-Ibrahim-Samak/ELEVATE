import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useAppViewModel } from './useAppViewModel';

describe('useAppViewModel', () => {
  it('filters trainers through the domain use case', () => {
    const { result } = renderHook(() => useAppViewModel());
    expect(result.current.visibleTrainers).toHaveLength(4);
    act(() => result.current.setFilter('strength'));
    expect(result.current.visibleTrainers.map((t) => t.id)).toEqual(['youssef']);
  });

  it('wraps the offers carousel in both directions', () => {
    const { result } = renderHook(() => useAppViewModel());
    expect(result.current.offerIndex).toBe(0);
    act(() => result.current.prevOffer());
    expect(result.current.offerIndex).toBe(result.current.offerCount - 1);
    act(() => result.current.nextOffer());
    expect(result.current.offerIndex).toBe(0);
  });

  it('routes admin login to the admin dashboard', () => {
    const { result } = renderHook(() => useAppViewModel());
    act(() => result.current.openLogin());
    act(() => result.current.setLoginEmail('admin'));
    act(() => result.current.submitLogin());
    expect(result.current.activeView).toBe('admin');
    expect(result.current.showLogin).toBe(false);
  });

  it('routes trainer login to the coach dashboard on the diet tab', () => {
    const { result } = renderHook(() => useAppViewModel());
    act(() => result.current.setLoginEmail('  Trainer '));
    act(() => result.current.submitLogin());
    expect(result.current.activeView).toBe('coach');
    expect(result.current.coachTab).toBe('dietPlan');
  });

  it('keeps members on the site and resets on exit', () => {
    const { result } = renderHook(() => useAppViewModel());
    act(() => result.current.setLoginEmail('someone@example.com'));
    act(() => result.current.submitLogin());
    expect(result.current.activeView).toBe('site');

    act(() => result.current.setLoginEmail('admin'));
    act(() => result.current.submitLogin());
    act(() => result.current.exitDashboard());
    expect(result.current.activeView).toBe('site');
    expect(result.current.loginEmail).toBe('');
  });

  it('builds a chat thread when a chat is opened', () => {
    const { result } = renderHook(() => useAppViewModel());
    expect(result.current.chatThread).toBeNull();
    act(() => result.current.openChat('Omar K.'));
    expect(result.current.chatThread?.name).toBe('Omar K.');
    act(() => result.current.closeChat());
    expect(result.current.chatThread).toBeNull();
  });

  it('opens and closes the trainer profile modal', () => {
    const { result } = renderHook(() => useAppViewModel());
    act(() => result.current.openProfile('nadia'));
    expect(result.current.selectedTrainer?.name).toBe('Nadia R.');
    act(() => result.current.closeProfile());
    expect(result.current.selectedTrainer).toBeNull();
  });
});
