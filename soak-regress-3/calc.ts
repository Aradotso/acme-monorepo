/** Adds two numbers. */
export function add(left: number, right: number): number {
  return left + right;
}

/** Divides one number by another, returning zero for a zero divisor. */
export function divide(dividend: number, divisor: number): number {
  if (divisor === 0) {
    return 0;
  }

  return dividend / divisor;
}
