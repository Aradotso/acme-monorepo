/** Adds two finite or non-finite numbers without changing JavaScript number semantics. */
export function add(left: number, right: number): number {
  return left + right;
}

/** Restricts a value to the inclusive interval [minimum, maximum]. */
export function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

/** Returns the point at ratio `amount` between `start` and `end`. */
export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}
