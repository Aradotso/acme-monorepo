/** Adds two numbers. */
export function add(left: number, right: number): number {
  return left + right;
}

/** Divides one number by another, rejecting a zero divisor. */
export function divide(dividend: number, divisor: number): number {
  if (divisor === 0) {
    throw new RangeError('cannot divide by zero');
  }

  return dividend / divisor;
}
