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
  // Handle endpoints before multiplying so exact endpoint identities also hold
  // for infinities. The weighted form avoids overflowing when finite endpoints
  // have opposite signs and a large magnitude.
  if (progress === 0) return start;
  if (progress === 1) return end;
  if (start === end) return start;

  return start * (1 - progress) + end * progress;
}
