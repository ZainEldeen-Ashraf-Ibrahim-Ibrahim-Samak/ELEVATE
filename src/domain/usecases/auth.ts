import type { UserRole } from '../entities';

/**
 * Demo credential routing (as designed): "admin" opens the admin dashboard,
 * "trainer" opens the coach dashboard, anything else is a regular member.
 */
export function resolveUserRole(identifier: string): UserRole {
  const normalized = identifier.trim().toLowerCase();
  if (normalized === 'admin') return 'admin';
  if (normalized === 'trainer') return 'trainer';
  return 'member';
}
