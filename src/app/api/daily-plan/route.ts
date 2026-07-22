import { NextResponse } from 'next/server';
import { container } from '@/server/container';

export function GET() {
  return NextResponse.json(container.dailyPlanRepository.getToday());
}
