import { NextResponse } from 'next/server';
import { container } from '@/server/container';

export function GET() {
  const repo = container.adminRepository;
  return NextResponse.json({
    stats: repo.getStats(),
    members: repo.getMembers(),
    inbox: repo.getInbox(),
  });
}
