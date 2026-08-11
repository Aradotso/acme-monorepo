import { describe, expect, it } from 'vitest';
import { add, clamp, lerp } from './math';

describe('add', () => {
  it.each([
    [0, 0, 0],
    [2, 3, 5],
    [-2, 3, 1],
    [-2, -3, -5],
    [0.1, 0.2, 0.30000000000000004],
    [Number.MAX_SAFE_INTEGER, 1, Number.MAX_SAFE_INTEGER + 1],
  ])('adds %s and %s to get %s', (a, b, expected) => {
    expect(add(a, b)).toBe(expected);
  });

  it('is commutative', () => {
    expect(add(-12.5, 4.25)).toBe(add(4.25, -12.5));
  });

  it('supports infinities according to JavaScript arithmetic', () => {
    expect(add(Infinity, 1)).toBe(Infinity);
    expect(add(-Infinity, 1)).toBe(-Infinity);
  });

  it('propagates NaN', () => {
    expect(add(Number.NaN, 1)).toBeNaN();
  });
});

describe('clamp', () => {
  it.each([
    [5, 0, 10, 5],
    [0, 0, 10, 0],
    [10, 0, 10, 10],
    [-1, 0, 10, 0],
    [11, 0, 10, 10],
    [-2.5, -5, -1, -2.5],
    [-10, -5, -1, -5],
    [0, -5, -1, -1],
  ])('clamps %s to [%s, %s] as %s', (value, min, max, expected) => {
    expect(clamp(value, min, max)).toBe(expected);
  });

  it('preserves a value already in the range exactly', () => {
    const value = 1.23456789;
    expect(clamp(value, -10, 10)).toBe(value);
  });

  it('returns the lower bound when bounds are equal', () => {
    expect(clamp(-3, 7, 7)).toBe(7);
    expect(clamp(7, 7, 7)).toBe(7);
    expect(clamp(20, 7, 7)).toBe(7);
  });

  it('follows the inclusive-bound convention for infinities', () => {
    expect(clamp(-Infinity, -Infinity, Infinity)).toBe(-Infinity);
    expect(clamp(Infinity, -Infinity, Infinity)).toBe(Infinity);
  });

  it('propagates NaN', () => {
    expect(clamp(Number.NaN, 0, 1)).toBeNaN();
  });
});

describe('lerp', () => {
  it.each([
    [0, 10, 0, 0],
    [0, 10, 0.5, 5],
    [0, 10, 1, 10],
    [10, 0, 0.25, 7.5],
    [-10, 10, 0.75, 5],
    [1.5, 2.5, 0.2, 1.7],
    [0, 10, -1, -10],
    [0, 10, 2, 20],
  ])('lerps from %s to %s at t=%s to get %s', (start, end, t, expected) => {
    expect(lerp(start, end, t)).toBe(expected);
  });

  it('returns each endpoint at the endpoint parameters', () => {
    expect(lerp(42, 99, 0)).toBe(42);
    expect(lerp(42, 99, 1)).toBe(99);
  });

  it('is constant when both endpoints are equal', () => {
    expect(lerp(3.5, 3.5, -10)).toBe(3.5);
    expect(lerp(3.5, 3.5, 0.5)).toBe(3.5);
    expect(lerp(3.5, 3.5, 10)).toBe(3.5);
  });

  it('satisfies the midpoint symmetry property', () => {
    expect(lerp(12, 28, 0.25)).toBe(lerp(28, 12, 0.75));
  });

  it('supports extrapolation and propagates NaN', () => {
    expect(lerp(10, 20, -0.5)).toBe(5);
    expect(lerp(10, 20, 1.5)).toBe(25);
    expect(lerp(Number.NaN, 20, 0.5)).toBeNaN();
  });
});
