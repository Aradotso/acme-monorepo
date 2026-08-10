import test from 'node:test';
import assert from 'node:assert/strict';
import { add, clamp, lerp } from './math.ts';

test('add sums positive, negative, and fractional values', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-8, 3), -5);
  assert.equal(add(-2.5, -0.75), -3.25);
  assert.equal(add(0.1, 0.2), 0.1 + 0.2);
});

test('add preserves identity values and is commutative', () => {
  for (const value of [-100, -1.5, 0, 2.25, Number.MAX_SAFE_INTEGER]) {
    assert.equal(add(value, 0), value);
    assert.equal(add(0, value), value);
  }
  assert.equal(add(-0, 0), 0);
  assert.equal(add(0, -0), 0);

  for (const [left, right] of [[-4, 9], [1.25, 3.75], [0, -2]] as const) {
    assert.equal(add(left, right), add(right, left));
  }
});

test('add follows JavaScript number behavior at infinity and NaN', () => {
  assert.equal(add(Infinity, 4), Infinity);
  assert.equal(add(-Infinity, -4), -Infinity);
  assert.ok(Number.isNaN(add(Infinity, -Infinity)));
  assert.ok(Number.isNaN(add(NaN, 1)));
});

test('clamp returns values already inside the inclusive range', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-2.5, -10, 10), -2.5);
  assert.equal(clamp(0.125, 0.1, 0.2), 0.125);
});

test('clamp returns each boundary for values outside the range', () => {
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(11, 0, 10), 10);
  assert.equal(clamp(-Infinity, -5, 5), -5);
  assert.equal(clamp(Infinity, -5, 5), 5);
});

test('clamp handles boundary equality, a singleton range, and negative ranges', () => {
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
  assert.equal(clamp(-10, -10, -10), -10);
  assert.equal(clamp(0, -10, -1), -1);
  assert.equal(clamp(-5, -10, -1), -5);
});

test('clamp is idempotent and always produces a value in its range', () => {
  for (const value of [-100, -1, 0, 1, 100, 3.14]) {
    const bounded = clamp(value, -1, 1);
    assert.equal(clamp(bounded, -1, 1), bounded);
    assert.ok(bounded >= -1 && bounded <= 1);
  }
});

test('clamp propagates NaN, as the underlying numeric comparisons do', () => {
  assert.ok(Number.isNaN(clamp(NaN, 0, 1)));
});

test('lerp returns the endpoints at ratios zero and one', () => {
  for (const [start, end] of [[0, 10], [-4, 8], [2.5, -1.5]] as const) {
    assert.equal(lerp(start, end, 0), start);
    assert.equal(lerp(start, end, 1), end);
  }
});

test('lerp calculates interior points for ascending and descending ranges', () => {
  assert.equal(lerp(0, 10, 0.25), 2.5);
  assert.equal(lerp(-10, 10, 0.75), 5);
  assert.equal(lerp(10, 0, 0.2), 8);
  assert.equal(lerp(-2.5, 7.5, 0.5), 2.5);
});

test('lerp supports extrapolation outside the unit interval', () => {
  assert.equal(lerp(10, 20, -0.5), 5);
  assert.equal(lerp(10, 20, 1.5), 25);
  assert.equal(lerp(-4, 6, 2), 16);
});

test('lerp is identity for equal endpoints and respects midpoint symmetry', () => {
  for (const amount of [-2, -0.25, 0, 0.3, 1, 2]) {
    assert.equal(lerp(7.5, 7.5, amount), 7.5);
  }

  for (const [start, end, amount] of [[-3, 11, 0.2], [1.5, 8.5, 0.75]] as const) {
    assert.ok(Math.abs(lerp(start, end, amount) - lerp(end, start, 1 - amount)) < 1e-12);
  }
});

test('lerp preserves floating-point arithmetic without rounding', () => {
  const start = 0.1;
  const end = 0.3;
  const amount = 0.5;
  assert.equal(lerp(start, end, amount), start + (end - start) * amount);
  assert.equal(lerp(0, 1, 0.1), 0.1);
});

test('lerp follows JavaScript number behavior for non-finite inputs', () => {
  assert.equal(lerp(Infinity, Infinity, 0.5), NaN);
  assert.ok(Number.isNaN(lerp(NaN, 1, 0.5)));
  assert.equal(lerp(0, Infinity, 0), NaN);
});
