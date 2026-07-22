import { NextResponse } from 'next/server';
import { container } from '@/server/container';

export function GET() {
  const repo = container.catalogRepository;
  return NextResponse.json({
    features: repo.getFeatures(),
    plans: repo.getPlans(),
    offers: repo.getOffers(),
    challenges: repo.getChallenges(),
  });
}
