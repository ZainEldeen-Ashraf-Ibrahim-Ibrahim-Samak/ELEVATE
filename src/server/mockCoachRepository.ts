import type { CoachRepository } from '../domain/repositories';
import { images } from '../data/images';

export const mockCoachRepository: CoachRepository = {
  getStats: () => ({ activeClients: 18, avgRating: 4.9, weeklyCheckIns: 6 }),
  getDietDays: () => [
    { day: 'monday', meal: 'Chicken, rice, greens', image: images.posterMetal },
    { day: 'tuesday', meal: 'Salmon, sweet potato, salad', image: images.posterMarkWhite },
    { day: 'wednesday', meal: 'Oats, eggs, banana', image: images.posterMarkBlack },
  ],
  getWorkoutDays: () => [
    { day: 'monday', move: 'Weighted pull-ups 5x6', image: images.posterMarkWhite, hasVideo: true },
    { day: 'wednesday', move: 'Front lever progressions 5x15s', image: images.posterWordBlack, hasVideo: true },
    { day: 'friday', move: 'Ring dips 4x10', image: images.posterWordWhite, hasVideo: false },
  ],
  getInbox: () => [
    { id: 'c1', from: 'Youssef A.', preview: 'Can we move Thursday session?', time: '2h ago' },
    { id: 'c2', from: 'Malak S.', preview: "Loved this week's meal plan!", time: '5h ago' },
    { id: 'c3', from: 'Karim H.', preview: 'Knee felt sore during squats today', time: '1d ago' },
    { id: 'c4', from: 'Rana F.', preview: 'Form check video attached 👇', time: '2d ago' },
  ],
};
