/** Adds two numbers. */
export function add(left: number, right: number): number {
  return left + right;
}

/** Restricts a value to the inclusive interval [minimum, maximum]. */
export function clamp(value: number, minimum: number, maximum: number): number {
  if (minimum > maximum) {
    throw new RangeError("minimum must not be greater than maximum");
  }

  return Math.min(Math.max(value, minimum), maximum);
}

/** Finds the point at `progress` between `start` and `end`.
 *
 * Progress is intentionally not restricted to [0, 1], so extrapolation is
 * supported as well as interpolation.
 */
export function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}
