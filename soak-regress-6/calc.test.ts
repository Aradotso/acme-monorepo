import { describe, expect, it } from 'vitest';
import { add, divide } from './calc';

describe('add', () => {
  it('adds positive and negative numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-2, 3)).toBe(1);
  });
});

describe('divide', () => {
  it('divides two numbers', () => {
    expect(divide(12, 3)).toBe(4);
  });

  it('throws when dividing a positive number by zero', () => {
    expect(() => divide(1, 0)).toThrow(new RangeError('Cannot divide by zero'));
  });

  it('throws when dividing a negative number by negative zero', () => {
    expect(() => divide(-1, -0)).toThrow('Cannot divide by zero');
  });

  it('still returns zero for a zero numerator with a non-zero divisor', () => {
    expect(divide(0, 5)).toBe(0);
  });
});
