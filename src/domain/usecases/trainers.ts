import type { SpecialtyFilter, Trainer } from '../entities';
import type { TrainerRepository } from '../repositories';

export function getTrainers(repo: TrainerRepository, filter: SpecialtyFilter): Trainer[] {
  const all = repo.getAll();
  if (filter === 'all') return all;
  return all.filter((t) => t.specialty === filter);
}

export function getFeaturedTrainer(repo: TrainerRepository): Trainer {
  const all = repo.getAll();
  return all.find((t) => t.featured) ?? all[0];
}
