import { describe, expect, it } from 'vitest';
import { add, clamp, lerp } from './math';

describe('add', () => {
  it.each([
    [0, 0, 0],
    [2, 3, 5],
    [-2, 3, 1],
    [-2, -3, -5],
    [1.25, 2.75, 4],
  ])('adds %s and %s to get %s', (a, b, expected) => {
    expect(add(a, b)).toBe(expected);
  });

  it('is commutative', () => {
    expect(add(123.45, -67.89)).toBe(add(-67.89, 123.45));
  });

  it('preserves the additive identity', () => {
    expect(add(42, 0)).toBe(42);
    expect(add(0, -42)).toBe(-42);
  });

  it('supports very large finite values', () => {
    expect(add(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Infinity);
  });
});

describe('clamp', () => {
  const min = -10;
  const max = 10;

  it.each([
    [-20, min],
    [-10, min],
    [-2.5, -2.5],
    [0, 0],
    [7.25, 7.25],
    [10, max],
    [20, max],
  ])('clamps %s to %s in [%s, %s]', (value, expected) => {
    expect(clamp(value, min, max)).toBe(expected);
  });

  it('returns the original value when it is already in range', () => {
    const value = 3.5;
    expect(clamp(value, min, max)).toBe(value);
  });

  it('works with a single-point interval', () => {
    expect(clamp(-100, 4, 4)).toBe(4);
    expect(clamp(4, 4, 4)).toBe(4);
    expect(clamp(100, 4, 4)).toBe(4);
  });

  it('handles unbounded numeric values', () => {
    expect(clamp(-Infinity, min, max)).toBe(min);
    expect(clamp(Infinity, min, max)).toBe(max);
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
    [1.5, 2.5, 0.5, 2],
  ])('interpolates from %s to %s at t=%s as %s', (start, end, t, expected) => {
    expect(lerp(start, end, t)).toBe(expected);
  });

  it('returns the endpoints at t=0 and t=1', () => {
    expect(lerp(-12.5, 99.25, 0)).toBe(-12.5);
    expect(lerp(-12.5, 99.25, 1)).toBe(99.25);
  });

  it('supports extrapolation outside the unit interval', () => {
    expect(lerp(10, 20, -0.5)).toBe(5);
    expect(lerp(10, 20, 1.5)).toBe(25);
  });

  it('is unchanged when both endpoints are equal', () => {
    expect(lerp(7.25, 7.25, -100)).toBe(7.25);
    expect(lerp(7.25, 7.25, 100)).toBe(7.25);
  });

  it('is symmetric around the midpoint', () => {
    expect(lerp(-30, 50, 0.5)).toBe(lerp(50, -30, 0.5));
  });
});
