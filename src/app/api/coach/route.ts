import { NextResponse } from 'next/server';
import { container } from '@/server/container';

export function GET() {
  const repo = container.coachRepository;
  return NextResponse.json({
    stats: repo.getStats(),
    dietDays: repo.getDietDays(),
    workoutDays: repo.getWorkoutDays(),
    inbox: repo.getInbox(),
  });
}
