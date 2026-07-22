import { NextRequest, NextResponse } from 'next/server';
import { resolveUserRole } from '@/domain/usecases/auth';

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { identifier?: string } | null;
  const role = resolveUserRole(body?.identifier ?? '');
  return NextResponse.json({ role });
}
