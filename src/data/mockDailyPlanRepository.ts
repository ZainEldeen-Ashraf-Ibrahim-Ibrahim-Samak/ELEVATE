import type { DailyPlan } from '../domain/entities';
import type { DailyPlanRepository } from '../domain/repositories';
import { images } from './images';

const today: DailyPlan = {
  date: new Date(),
  completionPct: 72,
  workouts: [
    { id: 'weightedPullups', image: images.posterMarkWhite, done: true },
    { id: 'ringDips', image: images.posterWordWhite, done: true },
    { id: 'frontLever', image: images.posterWordBlack, done: false },
    { id: 'dragonFlag', image: images.posterMetal, done: false },
  ],
  meals: [
    { id: 'breakfast', image: images.posterMarkBlack },
    { id: 'lunch', image: images.posterMetal },
    { id: 'preWorkout', image: images.posterMarkWhite },
    { id: 'dinner', image: images.posterWordWhite },
  ],
};

export const mockDailyPlanRepository: DailyPlanRepository = {
  getToday: () => today,
};
