/** Add two numbers. */
export function add(left: number, right: number): number {
  return left + right;
}

/** Limit a value to the inclusive interval between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Interpolate between start and end. t=0 returns start and t=1 returns end. */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
