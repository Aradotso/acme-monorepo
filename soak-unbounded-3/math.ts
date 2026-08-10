/** Adds two numbers. */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Restricts value to the inclusive interval between the two bounds.
 * Reversed bounds are accepted and treated as if they were ordered.
 */
export function clamp(value: number, min: number, max: number): number {
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);
  return Math.min(Math.max(value, lower), upper);
}

/**
 * Linearly interpolates from start to end by amount t.
 * Values of t outside [0, 1] intentionally extrapolate.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
