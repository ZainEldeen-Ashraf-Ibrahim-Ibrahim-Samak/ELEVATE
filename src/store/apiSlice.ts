import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clientEnv } from '@/core/env/client';
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
  UserRole,
} from '@/domain/entities';

export interface CatalogResponse {
  features: Feature[];
  plans: PricingPlan[];
  offers: Offer[];
  challenges: Challenge[];
}

export interface AdminResponse {
  stats: AdminStats;
  members: MemberRecord[];
  inbox: InboxMessage[];
}

export interface CoachResponse {
  stats: TrainerStats;
  dietDays: CoachDietDay[];
  workoutDays: CoachWorkoutDay[];
  inbox: InboxMessage[];
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: clientEnv.apiBaseUrl }),
  endpoints: (builder) => ({
    getTrainers: builder.query<Trainer[], void>({ query: () => '/trainers' }),
    getCatalog: builder.query<CatalogResponse, void>({ query: () => '/catalog' }),
    getDailyPlan: builder.query<DailyPlan, void>({ query: () => '/daily-plan' }),
    getChatThread: builder.query<ChatThread, string>({
      query: (name) => `/chat?name=${encodeURIComponent(name)}`,
    }),
    getAdmin: builder.query<AdminResponse, void>({ query: () => '/admin' }),
    getCoach: builder.query<CoachResponse, void>({ query: () => '/coach' }),
    login: builder.mutation<{ role: UserRole }, { identifier: string }>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
  }),
});

export const {
  useGetTrainersQuery,
  useGetCatalogQuery,
  useGetDailyPlanQuery,
  useGetChatThreadQuery,
  useGetAdminQuery,
  useGetCoachQuery,
  useLoginMutation,
} = apiSlice;
