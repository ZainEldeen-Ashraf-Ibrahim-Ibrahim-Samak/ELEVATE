import type { Trainer } from '../domain/entities';
import type { TrainerRepository } from '../domain/repositories';
import { images } from './images';

const trainers: Trainer[] = [
  {
    id: 'omar',
    name: 'Omar K.',
    rating: 4.9,
    photo: images.posterMarkWhite,
    photoPos: 'center 20%',
    specialty: 'calisthenics',
    featured: true,
    certs: ['ISSA Calisthenics Coach', 'Street Workout Egypt Cert.', 'CPR/First Aid'],
    transformations: [
      { image: images.posterMetal, label: '16 weeks · first muscle-up' },
      { image: images.posterWordWhite, label: '10 weeks · handstand hold' },
    ],
    videos: ['Pull-up tempo breakdown', 'Front lever progression'],
  },
  {
    id: 'nadia',
    name: 'Nadia R.',
    rating: 4.8,
    photo: images.posterMetal,
    photoPos: 'center 30%',
    specialty: 'fatLoss',
    featured: false,
    certs: ['Precision Nutrition L1', 'ACE Fat Loss Specialist'],
    transformations: [{ image: images.posterMetal, label: '12 weeks · -9kg' }],
    videos: ['Meal prep walkthrough'],
  },
  {
    id: 'youssef',
    name: 'Youssef T.',
    rating: 5.0,
    photo: images.posterWordBlack,
    photoPos: 'center 25%',
    specialty: 'strength',
    featured: false,
    certs: ['NASM-CPT', 'USA Powerlifting Coach'],
    transformations: [{ image: images.posterWordBlack, label: '20 weeks · +40kg squat' }],
    videos: ['Squat depth check', 'Deadlift setup cues'],
  },
  {
    id: 'sara',
    name: 'Sara M.',
    rating: 4.9,
    photo: images.posterWordWhite,
    photoPos: 'center 20%',
    specialty: 'calisthenics',
    featured: false,
    certs: ['FRC Mobility Specialist', 'ISSA Calisthenics Coach'],
    transformations: [{ image: images.posterWordWhite, label: '8 weeks · full split' }],
    videos: ['Shoulder mobility flow'],
  },
];

export const mockTrainerRepository: TrainerRepository = {
  getAll: () => trainers,
};
