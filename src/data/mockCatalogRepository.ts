import type { Challenge, Feature, Offer, PricingPlan } from '../domain/entities';
import type { CatalogRepository } from '../domain/repositories';
import { images } from './images';

const features: Feature[] = [
  { id: 'personalized', icon: '🎯' },
  { id: 'realTrainers', icon: '🧑‍🏫' },
  { id: 'dailyPlans', icon: '📆' },
  { id: 'tracking', icon: '📈' },
  { id: 'chat', icon: '💬' },
  { id: 'secure', icon: '🔒' },
  { id: 'challenges', icon: '🔥' },
];

const plans: PricingPlan[] = [
  { id: 'selfGuided', highlighted: false, requiresAuth: false },
  { id: 'coached', highlighted: true, requiresAuth: true },
  { id: 'elite', highlighted: false, requiresAuth: true },
];

const offers: Offer[] = [
  { id: 'freeWeek', image: images.posterMetal, imagePos: 'center 30%' },
  { id: 'summerShred', image: images.posterMarkWhite, imagePos: 'center 25%' },
  { id: 'referral', image: images.posterWordWhite, imagePos: 'center 20%' },
];

const challenges: Challenge[] = [
  { id: 'pullUp', participants: 812, progressPct: 64 },
  { id: 'cleanEating', participants: 1140, progressPct: 41 },
  { id: 'muscleUp', participants: 356, progressPct: 22 },
];

export const mockCatalogRepository: CatalogRepository = {
  getFeatures: () => features,
  getPlans: () => plans,
  getOffers: () => offers,
  getChallenges: () => challenges,
};
