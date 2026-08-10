import { describe, expect, it } from "vitest";
import { add, clamp, lerp } from "./math.js";

describe("add", () => {
  it.each([
    [2, 3, 5],
    [-2, 3, 1],
    [-2, -3, -5],
    [0, 9, 9],
    [1.25, 2.75, 4],
  ])("adds %p and %p to get %p", (left, right, expected) => {
    expect(add(left, right)).toBe(expected);
  });

  it("is commutative and has zero as its identity", () => {
    expect(add(17, -4)).toBe(add(-4, 17));
    expect(add(17, 0)).toBe(17);
    expect(add(0, -4)).toBe(-4);
  });

  it("follows JavaScript number arithmetic for non-finite and extreme values", () => {
    expect(add(Number.NaN, 1)).toBeNaN();
    expect(add(Number.POSITIVE_INFINITY, 1)).toBe(Number.POSITIVE_INFINITY);
    expect(add(Number.NEGATIVE_INFINITY, 1)).toBe(Number.NEGATIVE_INFINITY);
    expect(add(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)).toBeNaN();
    expect(add(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Number.POSITIVE_INFINITY);
    expect(add(-Number.MAX_VALUE, -Number.MAX_VALUE)).toBe(Number.NEGATIVE_INFINITY);
    expect(Object.is(add(Number.MAX_VALUE, -Number.MAX_VALUE), 0)).toBe(true);
    expect(Object.is(add(-0, -0), -0)).toBe(true);
    expect(Object.is(add(-0, 0), 0)).toBe(true);
  });
});

describe("clamp", () => {
  it.each([
    [5, 0, 10, 5],
    [-1, 0, 10, 0],
    [11, 0, 10, 10],
    [0, 0, 10, 0],
    [10, 0, 10, 10],
    [2.5, 2.5, 8.5, 2.5],
    [9.75, 2.5, 9.75, 9.75],
  ])("clamps %p to [%p, %p] as %p", (value, minimum, maximum, expected) => {
    expect(clamp(value, minimum, maximum)).toBe(expected);
  });

  it("supports negative intervals and preserves their bounds", () => {
    expect(clamp(-5, -10, -2)).toBe(-5);
    expect(clamp(-20, -10, -2)).toBe(-10);
    expect(clamp(0, -10, -2)).toBe(-2);
  });

  it("allows a single-point interval", () => {
    expect(clamp(-100, 7, 7)).toBe(7);
    expect(clamp(7, 7, 7)).toBe(7);
    expect(clamp(100, 7, 7)).toBe(7);
  });

  it("rejects an interval whose minimum exceeds its maximum", () => {
    expect(() => clamp(5, 10, 0)).toThrow(RangeError);
    expect(() => clamp(5, 10, 0)).toThrow("minimum must not be greater than maximum");
  });

  it("propagates NaN and clamps infinities using finite bounds", () => {
    expect(clamp(Number.NaN, 0, 10)).toBeNaN();
    expect(clamp(Number.NEGATIVE_INFINITY, 0, 10)).toBe(0);
    expect(clamp(Number.POSITIVE_INFINITY, 0, 10)).toBe(10);
  });

  it("supports infinite bounds and preserves signed zero when it is in range", () => {
    expect(clamp(-42, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)).toBe(-42);
    expect(clamp(Number.MAX_VALUE, 0, Number.POSITIVE_INFINITY)).toBe(Number.MAX_VALUE);
    expect(Object.is(clamp(-0, -1, 1), -0)).toBe(true);
    expect(Object.is(clamp(0, -1, 1), 0)).toBe(true);
    expect(Object.is(clamp(-0, 0, 1), 0)).toBe(true);
  });

  it("rejects only ordered invalid bounds, while NaN bounds propagate NaN", () => {
    expect(() => clamp(0, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)).toThrow(RangeError);
    expect(clamp(5, Number.NaN, 10)).toBeNaN();
    expect(clamp(5, 0, Number.NaN)).toBeNaN();
  });
});

describe("lerp", () => {
  it.each([
    [0, 10, 0, 0],
    [0, 10, 0.25, 2.5],
    [0, 10, 0.5, 5],
    [0, 10, 1, 10],
    [10, 0, 0.25, 7.5],
    [-10, 10, 0.75, 5],
  ])("gets %p at progress %p from %p to %p", (start, end, progress, expected) => {
    expect(lerp(start, end, progress)).toBe(expected);
  });

  it("supports extrapolation beyond both endpoints", () => {
    expect(lerp(10, 20, -0.5)).toBe(5);
    expect(lerp(10, 20, 1.5)).toBe(25);
  });

  it("has endpoint and equal-value identities", () => {
    expect(lerp(123, 456, 0)).toBe(123);
    expect(lerp(123, 456, 1)).toBe(456);
    expect(lerp(42, 42, -10)).toBe(42);
    expect(lerp(42, 42, 10)).toBe(42);
  });

  it("is symmetric when progress is complemented", () => {
    expect(lerp(-8, 24, 0.2)).toBeCloseTo(lerp(24, -8, 0.8));
  });

  it("supports non-finite endpoints and propagates indeterminate values", () => {
    expect(lerp(Number.POSITIVE_INFINITY, 0, 0.5)).toBe(Number.POSITIVE_INFINITY);
    expect(lerp(0, Number.NEGATIVE_INFINITY, 0.5)).toBe(Number.NEGATIVE_INFINITY);
    expect(lerp(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 0.5)).toBe(Number.POSITIVE_INFINITY);
    expect(lerp(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 0.5)).toBeNaN();
    expect(lerp(0, 10, Number.NaN)).toBeNaN();
  });

  it("preserves endpoint signed zeros and avoids finite overflow at the midpoint", () => {
    expect(Object.is(lerp(-0, 10, 0), -0)).toBe(true);
    expect(Object.is(lerp(10, -0, 1), -0)).toBe(true);
    expect(Object.is(lerp(-0, 0, 0.5), -0)).toBe(true);
    expect(lerp(Number.MAX_VALUE, -Number.MAX_VALUE, 0.5)).toBe(0);
    expect(lerp(Number.MAX_VALUE, Number.MAX_VALUE, 0.5)).toBe(Number.MAX_VALUE);
  });
});
