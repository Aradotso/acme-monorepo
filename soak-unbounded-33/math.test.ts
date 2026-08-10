import assert from "node:assert/strict";
import test from "node:test";
import { add, clamp, lerp } from "./math.ts";

test("add returns the sum for positive, negative, and fractional numbers", () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-8, -5), -13);
  assert.equal(add(-1.25, 3.5), 2.25);
});

test("add is commutative and preserves the additive identity", () => {
  for (const [a, b] of [[0, 0], [42, 0], [-19.5, 0], [1e12, -3.25]]) {
    assert.equal(add(a, b), add(b, a));
    assert.equal(add(a, 0), a);
  }
});

test("add handles the numeric extremes JavaScript can represent", () => {
  assert.equal(add(Number.MAX_VALUE, Number.MAX_VALUE), Infinity);
  assert.equal(add(Infinity, -Infinity), NaN);
});

test("clamp leaves values inside its inclusive range unchanged", () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
  assert.equal(clamp(-2.75, -10.5, 4.25), -2.75);
});

test("clamp moves values below the lower bound to min", () => {
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(Number.NEGATIVE_INFINITY, -5, 5), -5);
});

test("clamp moves values above the upper bound to max", () => {
  assert.equal(clamp(11, 0, 10), 10);
  assert.equal(clamp(Number.POSITIVE_INFINITY, -5, 5), 5);
});

test("clamp supports negative, fractional, and degenerate ranges", () => {
  assert.equal(clamp(-1.25, -2.5, -0.5), -1.25);
  assert.equal(clamp(0.125, 0.25, 0.75), 0.25);
  assert.equal(clamp(9, 4, 4), 4);
});

test("clamp always returns a value within the requested interval", () => {
  const cases = [
    [-100, -3, 7],
    [-3, -3, 7],
    [0, -3, 7],
    [7, -3, 7],
    [100, -3, 7],
    [Math.PI, 1, 2],
  ] as const;

  for (const [value, min, max] of cases) {
    const result = clamp(value, min, max);
    assert.ok(result >= min && result <= max);
  }
});

test("lerp returns both endpoints at t=0 and t=1", () => {
  assert.equal(lerp(10, 30, 0), 10);
  assert.equal(lerp(10, 30, 1), 30);
  assert.equal(lerp(-4.5, 8.5, 0), -4.5);
  assert.equal(lerp(-4.5, 8.5, 1), 8.5);
});

test("lerp calculates fractional positions and handles equal endpoints", () => {
  assert.equal(lerp(0, 100, 0.25), 25);
  assert.equal(lerp(10, 20, 0.5), 15);
  assert.equal(lerp(20, 10, 0.75), 12.5);
  assert.equal(lerp(7.25, 7.25, 0.37), 7.25);
});

test("lerp supports extrapolation outside the unit interval", () => {
  assert.equal(lerp(10, 20, -1), 0);
  assert.equal(lerp(10, 20, 2), 30);
  assert.equal(lerp(-10, 10, 1.5), 20);
});

test("lerp has the expected symmetry and composition properties", () => {
  const start = -12;
  const end = 34;
  const t = 0.37;

  assert.equal(lerp(start, end, t), lerp(end, start, 1 - t));
  assert.equal(lerp(start, end, 0.25), lerp(lerp(start, end, 0), lerp(start, end, 1), 0.25));
});
