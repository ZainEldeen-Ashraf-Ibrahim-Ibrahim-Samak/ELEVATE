import { describe, expect, it } from 'vitest';
import { mockTrainerRepository } from './mockTrainerRepository';
import { mockCatalogRepository } from './mockCatalogRepository';
import { mockDailyPlanRepository } from './mockDailyPlanRepository';
import { mockChatRepository } from './mockChatRepository';
import { translate } from '../core/i18n/translate';

describe('mock repositories', () => {
  it('provides four trainers with exactly one featured', () => {
    const all = mockTrainerRepository.getAll();
    expect(all).toHaveLength(4);
    expect(all.filter((t) => t.featured)).toHaveLength(1);
  });

  it('every trainer id has a translated tag in both locales', () => {
    for (const t of mockTrainerRepository.getAll()) {
      for (const locale of ['en', 'ar'] as const) {
        const tag = translate(locale, `trainers.profiles.${t.id}.tag`);
        expect(tag, `${locale}:${t.id}`).not.toContain('trainers.profiles');
      }
    }
  });

  it('catalog exposes 7 features, 3 plans, 3 offers, 3 challenges', () => {
    expect(mockCatalogRepository.getFeatures()).toHaveLength(7);
    expect(mockCatalogRepository.getPlans()).toHaveLength(3);
    expect(mockCatalogRepository.getOffers()).toHaveLength(3);
    expect(mockCatalogRepository.getChallenges()).toHaveLength(3);
  });

  it('feature, plan, and offer ids all resolve to i18n copy', () => {
    for (const f of mockCatalogRepository.getFeatures()) {
      expect(translate('en', `features.items.${f.id}.title`)).not.toContain('features.items');
    }
    for (const p of mockCatalogRepository.getPlans()) {
      expect(translate('en', `pricing.plans.${p.id}.name`)).not.toContain('pricing.plans');
    }
    for (const o of mockCatalogRepository.getOffers()) {
      expect(translate('en', `offers.items.${o.id}.title`)).not.toContain('offers.items');
    }
  });

  it('daily plan has workouts, meals and a sane completion percentage', () => {
    const plan = mockDailyPlanRepository.getToday();
    expect(plan.workouts).toHaveLength(4);
    expect(plan.meals).toHaveLength(4);
    expect(plan.completionPct).toBeGreaterThanOrEqual(0);
    expect(plan.completionPct).toBeLessThanOrEqual(100);
  });

  it('chat threads carry the coach attachment message', () => {
    const thread = mockChatRepository.getThread('Omar K.');
    expect(thread.name).toBe('Omar K.');
    expect(thread.messages.some((m) => m.attachments.length > 0)).toBe(true);
  });
});
