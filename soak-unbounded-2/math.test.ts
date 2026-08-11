import { describe, expect, it } from "vitest";
import { add, clamp, lerp } from "./math.js";

describe("add", () => {
  it.each([
    [0, 0, 0],
    [2, 3, 5],
    [-2, 3, 1],
    [-2, -3, -5],
    [1.5, 2.25, 3.75],
  ])("adds %s and %s", (left, right, expected) => {
    expect(add(left, right)).toBe(expected);
  });

  it("preserves negative zero when both operands are negative zero", () => {
    expect(Object.is(add(-0, -0), -0)).toBe(true);
  });

  it("supports values beyond the safe integer range according to JavaScript arithmetic", () => {
    expect(add(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Infinity);
  });
});

describe("clamp", () => {
  it.each([
    [5, 0, 10, 5],
    [0, 0, 10, 0],
    [10, 0, 10, 10],
    [-1, 0, 10, 0],
    [11, 0, 10, 10],
    [2.5, 0, 10, 2.5],
    [-5, -10, -2, -5],
  ])("clamps %s to [%s, %s]", (value, minimum, maximum, expected) => {
    expect(clamp(value, minimum, maximum)).toBe(expected);
  });

  it("supports an interval consisting of one point", () => {
    expect(clamp(-100, 7, 7)).toBe(7);
    expect(clamp(7, 7, 7)).toBe(7);
    expect(clamp(100, 7, 7)).toBe(7);
  });

  it("does not mutate or reorder its arguments", () => {
    const minimum = -3;
    const maximum = 4;
    expect(clamp(2, minimum, maximum)).toBe(2);
    expect(minimum).toBe(-3);
    expect(maximum).toBe(4);
  });

  it("rejects an inverted interval", () => {
    expect(() => clamp(5, 10, 0)).toThrowError(
      new RangeError("minimum must not exceed maximum"),
    );
  });

  it("follows Math.min and Math.max behavior for NaN", () => {
    expect(Number.isNaN(clamp(Number.NaN, 0, 1))).toBe(true);
    expect(Number.isNaN(clamp(0, Number.NaN, 1))).toBe(true);
    expect(Number.isNaN(clamp(0, 0, Number.NaN))).toBe(true);
  });
});

describe("lerp", () => {
  it.each([
    [0, 10, 0, 0],
    [0, 10, 1, 10],
    [0, 10, 0.5, 5],
    [10, 0, 0.25, 7.5],
    [-10, 10, 0.75, 5],
    [1.25, 2.75, 0.2, 1.55],
  ])("interpolates from %s to %s at ratio %s", (start, end, ratio, expected) => {
    expect(lerp(start, end, ratio)).toBeCloseTo(expected);
  });

  it("extrapolates when the ratio is outside the unit interval", () => {
    expect(lerp(10, 20, -0.5)).toBe(5);
    expect(lerp(10, 20, 1.5)).toBe(25);
  });

  it("returns the start for zero and the end for one", () => {
    const start = -42;
    const end = 17;
    expect(lerp(start, end, 0)).toBe(start);
    expect(lerp(start, end, 1)).toBe(end);
  });

  it("handles equal endpoints and non-finite ratios using JavaScript arithmetic", () => {
    expect(lerp(3, 3, 0.5)).toBe(3);
    expect(lerp(3, 3, Infinity)).toBeNaN();
    expect(lerp(0, 10, Infinity)).toBe(Infinity);
    expect(lerp(0, 10, Number.NaN)).toBeNaN();
  });
});
