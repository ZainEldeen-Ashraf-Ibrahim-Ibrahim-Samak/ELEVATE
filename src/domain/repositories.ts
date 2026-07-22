import type {
  AdminStats,
  Challenge,
  ChatThread,
  CoachDietDay,
  CoachWorkoutDay,
  DailyPlan,
  Feature,
  InboxMessage,
  MemberRecord,
  Offer,
  PricingPlan,
  Trainer,
  TrainerStats,
} from './entities';

export interface TrainerRepository {
  getAll(): Trainer[];
}

export interface CatalogRepository {
  getFeatures(): Feature[];
  getPlans(): PricingPlan[];
  getOffers(): Offer[];
  getChallenges(): Challenge[];
}

export interface DailyPlanRepository {
  getToday(): DailyPlan;
}

export interface ChatRepository {
  getThread(name: string): ChatThread;
}

export interface AdminRepository {
  getStats(): AdminStats;
  getMembers(): MemberRecord[];
  getInbox(): InboxMessage[];
}

export interface CoachRepository {
  getStats(): TrainerStats;
  getDietDays(): CoachDietDay[];
  getWorkoutDays(): CoachWorkoutDay[];
  getInbox(): InboxMessage[];
}
