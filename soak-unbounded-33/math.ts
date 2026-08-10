/** Add two numbers. */
export function add(a: number, b: number): number {
  return a + b;
}

/** Restrict value to the inclusive interval [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Interpolate between start and end; t may be outside [0, 1] for extrapolation. */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
