export function add(left: number, right: number): number {
  return left + right;
}

/**
 * Divides one number by another.
 *
 * A zero divisor is represented as NaN instead of JavaScript's Infinity or
 * -Infinity results, giving callers one consistent invalid-division sentinel.
 */
export function divide(dividend: number, divisor: number): number {
  if (divisor === 0) {
    return Number.NaN;
  }

  return dividend / divisor;
}
