/**
 * Composition root: wires data-layer implementations to the domain-layer
 * repository interfaces consumed by the presentation layer.
 */
import { mockTrainerRepository } from '../data/mockTrainerRepository';
import { mockCatalogRepository } from '../data/mockCatalogRepository';
import { mockDailyPlanRepository } from '../data/mockDailyPlanRepository';
import { mockChatRepository } from '../data/mockChatRepository';
import { mockAdminRepository } from '../data/mockAdminRepository';
import { mockCoachRepository } from '../data/mockCoachRepository';

export const container = {
  trainerRepository: mockTrainerRepository,
  catalogRepository: mockCatalogRepository,
  dailyPlanRepository: mockDailyPlanRepository,
  chatRepository: mockChatRepository,
  adminRepository: mockAdminRepository,
  coachRepository: mockCoachRepository,
} as const;
