import { describe, expect, it } from 'vitest';
import { getFeaturedTrainer, getTrainers } from './trainers';
import { resolveUserRole } from './auth';
import { rotateIndex } from './carousel';
import type { Trainer } from '../entities';

const trainer = (id: string, specialty: Trainer['specialty'], featured = false): Trainer => ({
  id,
  name: id,
  rating: 4.9,
  photo: `${id}.jpeg`,
  photoPos: 'center',
  specialty,
  featured,
  certs: [],
  transformations: [],
  videos: [],
});

const repo = {
  getAll: () => [
    trainer('omar', 'calisthenics', true),
    trainer('nadia', 'fatLoss'),
    trainer('youssef', 'strength'),
    trainer('sara', 'calisthenics'),
  ],
};

describe('getTrainers', () => {
  it('returns everyone for the "all" filter', () => {
    expect(getTrainers(repo, 'all')).toHaveLength(4);
  });

  it('filters by specialty', () => {
    expect(getTrainers(repo, 'calisthenics').map((t) => t.id)).toEqual(['omar', 'sara']);
    expect(getTrainers(repo, 'strength').map((t) => t.id)).toEqual(['youssef']);
  });
});

describe('getFeaturedTrainer', () => {
  it('returns the flagged trainer', () => {
    expect(getFeaturedTrainer(repo).id).toBe('omar');
  });

  it('falls back to the first trainer when none is flagged', () => {
    const noFeatured = { getAll: () => [trainer('a', 'strength'), trainer('b', 'fatLoss')] };
    expect(getFeaturedTrainer(noFeatured).id).toBe('a');
  });
});

describe('resolveUserRole', () => {
  it('routes admin and trainer logins regardless of case/spacing', () => {
    expect(resolveUserRole('admin')).toBe('admin');
    expect(resolveUserRole('  Admin ')).toBe('admin');
    expect(resolveUserRole('TRAINER')).toBe('trainer');
  });

  it('treats anything else as a member', () => {
    expect(resolveUserRole('zain@example.com')).toBe('member');
    expect(resolveUserRole('')).toBe('member');
  });
});

describe('rotateIndex', () => {
  it('advances and wraps forward', () => {
    expect(rotateIndex(0, 1, 3)).toBe(1);
    expect(rotateIndex(2, 1, 3)).toBe(0);
  });

  it('wraps backwards below zero', () => {
    expect(rotateIndex(0, -1, 3)).toBe(2);
  });

  it('is safe for empty carousels', () => {
    expect(rotateIndex(5, 1, 0)).toBe(0);
  });
});
