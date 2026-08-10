/** Adds two numbers. */
export function add(left: number, right: number): number {
  return left + right;
}

/** Restricts a value to the inclusive interval between the two bounds. */
export function clamp(value: number, minimum: number, maximum: number): number {
  const lowerBound = Math.min(minimum, maximum);
  const upperBound = Math.max(minimum, maximum);

  return Math.min(Math.max(value, lowerBound), upperBound);
}

/** Returns the value at progress t between start and end. */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
