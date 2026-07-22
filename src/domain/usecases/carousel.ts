/** Wraps an index across a carousel of `length` items; length <= 0 yields 0. */
export function rotateIndex(current: number, delta: number, length: number): number {
  if (length <= 0) return 0;
  return ((current + delta) % length + length) % length;
}
