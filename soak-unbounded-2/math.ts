/** Add two finite numbers. */
export function add(left: number, right: number): number {
  return left + right;
}

/** Constrain a value to the inclusive interval [minimum, maximum]. */
export function clamp(value: number, minimum: number, maximum: number): number {
  if (minimum > maximum) {
    throw new RangeError("minimum must not exceed maximum");
  }

  return Math.min(Math.max(value, minimum), maximum);
}

/** Interpolate between start and end using a potentially unbounded ratio. */
export function lerp(start: number, end: number, ratio: number): number {
  return start + (end - start) * ratio;
}
