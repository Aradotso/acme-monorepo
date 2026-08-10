import { describe, expect, it } from 'vitest';
import { add, clamp, lerp } from './math';

describe('add', () => {
  it.each([
    [0, 0, 0],
    [2, 3, 5],
    [-2, 3, 1],
    [-2, -3, -5],
    [1.25, 2.75, 4],
  ])('adds %s and %s to make %s', (left, right, expected) => {
    expect(add(left, right)).toBe(expected);
  });

  it('is commutative', () => {
    expect(add(13.5, -4.25)).toBe(add(-4.25, 13.5));
  });

  it('does not mutate its numeric inputs', () => {
    const left = 7;
    const right = 11;

    add(left, right);

    expect(left).toBe(7);
    expect(right).toBe(11);
  });
});

describe('clamp', () => {
  it.each([
    [5, 0, 10, 5],
    [0, 0, 10, 0],
    [10, 0, 10, 10],
    [-1, 0, 10, 0],
    [11, 0, 10, 10],
    [-5, -10, -2, -5],
    [1.75, 0.5, 2.5, 1.75],
  ])('clamps %s to [%s, %s] as %s', (value, minimum, maximum, expected) => {
    expect(clamp(value, minimum, maximum)).toBe(expected);
  });

  it('returns the same value when it is already within the interval', () => {
    const value = 4.5;

    expect(clamp(value, 0, 10)).toBe(value);
  });

  it('supports a single-point interval', () => {
    expect(clamp(-100, 3, 3)).toBe(3);
    expect(clamp(3, 3, 3)).toBe(3);
    expect(clamp(100, 3, 3)).toBe(3);
  });

  it('keeps every result inside the inclusive interval', () => {
    for (const value of [-Infinity, -10, 0, 2.5, 10, Infinity]) {
      const result = clamp(value, 0, 10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(10);
    }
  });
});

describe('lerp', () => {
  it.each([
    [0, 10, 0, 0],
    [0, 10, 0.25, 2.5],
    [0, 10, 0.5, 5],
    [0, 10, 1, 10],
    [10, 0, 0.25, 7.5],
    [-10, 10, 0.75, 5],
    [1.2, 3.8, 0.5, 2.5],
  ])('interpolates from %s to %s at t=%s as %s', (start, end, t, expected) => {
    expect(lerp(start, end, t)).toBe(expected);
  });

  it('returns the endpoints at progress 0 and 1', () => {
    expect(lerp(-7.5, 12.25, 0)).toBe(-7.5);
    expect(lerp(-7.5, 12.25, 1)).toBe(12.25);
  });

  it('supports extrapolation outside the unit interval', () => {
    expect(lerp(10, 20, -0.5)).toBe(5);
    expect(lerp(10, 20, 1.5)).toBe(25);
  });

  it('is linear across equal progress steps', () => {
    const start = -4;
    const end = 16;
    const step = end - start;

    expect(lerp(start, end, 0.25) - lerp(start, end, 0)).toBeCloseTo(step * 0.25);
    expect(lerp(start, end, 0.5) - lerp(start, end, 0.25)).toBeCloseTo(step * 0.25);
    expect(lerp(start, end, 0.75) - lerp(start, end, 0.5)).toBeCloseTo(step * 0.25);
  });

  it('returns the same endpoint when start and end are equal', () => {
    expect(lerp(42, 42, -10)).toBe(42);
    expect(lerp(42, 42, 0.5)).toBe(42);
    expect(lerp(42, 42, 10)).toBe(42);
  });
});
