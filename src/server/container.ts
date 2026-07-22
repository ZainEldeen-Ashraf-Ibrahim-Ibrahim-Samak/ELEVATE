/**
 * Composition root: wires data-layer implementations to the domain-layer
 * repository interfaces consumed by the presentation layer.
 */
import { mockTrainerRepository } from './mockTrainerRepository';
import { mockCatalogRepository } from './mockCatalogRepository';
import { mockDailyPlanRepository } from './mockDailyPlanRepository';
import { mockChatRepository } from './mockChatRepository';
import { mockAdminRepository } from './mockAdminRepository';
import { mockCoachRepository } from './mockCoachRepository';

export const container = {
  trainerRepository: mockTrainerRepository,
  catalogRepository: mockCatalogRepository,
  dailyPlanRepository: mockDailyPlanRepository,
  chatRepository: mockChatRepository,
  adminRepository: mockAdminRepository,
  coachRepository: mockCoachRepository,
} as const;
