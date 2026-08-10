/** Add two numbers. */
export function add(a: number, b: number): number {
  return a + b;
}

/** Keep a number within the inclusive interval [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linearly interpolate between start and end by the fraction t. */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
