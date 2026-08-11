/** Adds two numbers. */
export function add(a: number, b: number): number {
  return a + b;
}

/** Restricts a value to the inclusive interval [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Returns the value t proportion of the way from start to end. */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
