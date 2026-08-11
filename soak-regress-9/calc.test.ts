import { describe, expect, it } from 'vitest';
import { add, divide } from './calc';

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});

describe('divide', () => {
  it('divides two numbers', () => {
    expect(divide(12, 3)).toBe(4);
  });

  it('returns NaN when dividing by zero', () => {
    expect(divide(12, 0)).toBeNaN();
    expect(divide(-12, 0)).toBeNaN();
  });
});
