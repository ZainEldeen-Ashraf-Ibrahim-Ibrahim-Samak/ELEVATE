/**
 * Domain entities. Translatable marketing copy is referenced by i18n key
 * (derived from stable ids); records that model user/DB content (names,
 * certificates, chat text) carry their own strings.
 */

export type Specialty = 'calisthenics' | 'fatLoss' | 'strength';
export type SpecialtyFilter = 'all' | Specialty;

export interface TrainerTransformation {
  image: string;
  label: string;
}

export interface Trainer {
  id: string;
  name: string;
  rating: number;
  photo: string;
  photoPos: string;
  specialty: Specialty;
  featured: boolean;
  certs: string[];
  transformations: TrainerTransformation[];
  videos: string[];
}

export type FeatureId =
  | 'personalized'
  | 'realTrainers'
  | 'dailyPlans'
  | 'tracking'
  | 'chat'
  | 'secure'
  | 'challenges';

export interface Feature {
  id: FeatureId;
  icon: string;
}

export type WorkoutItemId = 'weightedPullups' | 'ringDips' | 'frontLever' | 'dragonFlag';

export interface WorkoutItem {
  id: WorkoutItemId;
  image: string;
  done: boolean;
}

export type MealItemId = 'breakfast' | 'lunch' | 'preWorkout' | 'dinner';

export interface MealItem {
  id: MealItemId;
  image: string;
}

export interface DailyPlan {
  /** ISO date string so the entity survives JSON transport untouched. */
  date: string;
  completionPct: number;
  workouts: WorkoutItem[];
  meals: MealItem[];
}

export type PlanId = 'selfGuided' | 'coached' | 'elite';

export interface PricingPlan {
  id: PlanId;
  highlighted: boolean;
  requiresAuth: boolean;
}

export type OfferId = 'freeWeek' | 'summerShred' | 'referral';

export interface Offer {
  id: OfferId;
  image: string;
  imagePos: string;
}

export type ChallengeId = 'pullUp' | 'cleanEating' | 'muscleUp';

export interface Challenge {
  id: ChallengeId;
  participants: number;
  progressPct: number;
}

export interface ChatAttachment {
  icon: string;
  label: string;
}

export interface ChatMessage {
  fromMe: boolean;
  text: string;
  attachments: ChatAttachment[];
}

export interface ChatThread {
  name: string;
  messages: ChatMessage[];
}

export type UserRole = 'member' | 'trainer' | 'admin';

export interface AdminStats {
  activeMembers: number;
  activeTrainers: number;
  retentionPct: number;
}

export interface MemberRecord {
  name: string;
  planId: PlanId;
  joined: string;
}

export interface InboxMessage {
  id: string;
  from: string;
  preview: string;
  time: string;
}

export interface TrainerStats {
  activeClients: number;
  avgRating: number;
  weeklyCheckIns: number;
}

export type DayId = 'monday' | 'tuesday' | 'wednesday' | 'friday';

export interface CoachDietDay {
  day: DayId;
  meal: string;
  image: string;
}

export interface CoachWorkoutDay {
  day: DayId;
  move: string;
  image: string;
  hasVideo: boolean;
}
