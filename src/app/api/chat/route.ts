import { NextRequest, NextResponse } from 'next/server';
import { container } from '@/server/container';

export function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name');
  if (!name) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 });
  }
  return NextResponse.json(container.chatRepository.getThread(name));
}
