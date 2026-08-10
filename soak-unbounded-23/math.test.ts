import assert from 'node:assert/strict';
import test from 'node:test';
import { add, clamp, lerp } from './math.ts';

function assertNearlyEqual(actual: number, expected: number, epsilon = Number.EPSILON * 16): void {
  assert.ok(Math.abs(actual - expected) <= epsilon, `${actual} is not within ${epsilon} of ${expected}`);
}

test('add returns the sum for positive, negative, and fractional values', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-8, 3), -5);
  assert.equal(add(-1.25, 0.5), -0.75);
});

test('add handles zero and preserves operand order for subtraction-like inputs', () => {
  assert.equal(add(0, 7), 7);
  assert.equal(add(7, 0), 7);
  assert.equal(add(10, -4), 6);
  assert.equal(add(-4, 10), 6);
});

test('add propagates non-finite operands according to JavaScript number arithmetic', () => {
  assert.equal(add(Infinity, 1), Infinity);
  assert.equal(add(-Infinity, 1), -Infinity);
  assert.ok(Number.isNaN(add(Infinity, -Infinity)));
  assert.ok(Number.isNaN(add(Number.NaN, 1)));
});

test('add is commutative and has zero as its identity', () => {
  for (const [a, b] of [[0, 0], [1.5, -2.75], [-100, 42], [Number.MAX_SAFE_INTEGER, 1]]) {
    assert.equal(add(a, b), add(b, a));
    assert.equal(add(a, 0), a);
  }
});

test('clamp leaves values inside the inclusive range unchanged', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
  assert.equal(clamp(-1.5, -2.5, 4.5), -1.5);
});

test('clamp returns the nearest bound for values outside the range', () => {
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(11, 0, 10), 10);
  assert.equal(clamp(-100, -20, -10), -20);
  assert.equal(clamp(100, -20, -10), -10);
});

test('clamp handles infinite bounds without altering finite values', () => {
  assert.equal(clamp(-10, -Infinity, Infinity), -10);
  assert.equal(clamp(Infinity, -10, 10), 10);
  assert.equal(clamp(-Infinity, -10, 10), -10);
  assert.ok(Number.isNaN(clamp(Number.NaN, 0, 1)));
});

test('clamp supports fractional and degenerate ranges', () => {
  assert.equal(clamp(0.25, 0.1, 0.2), 0.2);
  assert.equal(clamp(0.15, 0.1, 0.2), 0.15);
  assert.equal(clamp(4, 4, 4), 4);
  assert.equal(clamp(-99, 4, 4), 4);
  assert.equal(clamp(99, 4, 4), 4);
});

test('lerp returns both endpoints at t equal to zero and one', () => {
  assert.equal(lerp(10, 20, 0), 10);
  assert.equal(lerp(10, 20, 1), 20);
  assert.equal(lerp(-5, 5, 0), -5);
  assert.equal(lerp(-5, 5, 1), 5);
});

test('lerp interpolates fractional positions in either direction', () => {
  assert.equal(lerp(0, 100, 0.25), 25);
  assert.equal(lerp(10, 20, 0.5), 15);
  assert.equal(lerp(20, 10, 0.25), 17.5);
  assert.equal(lerp(-10, 10, 0.75), 5);
});

test('lerp extrapolates when t is outside the unit interval', () => {
  assert.equal(lerp(10, 20, -1), 0);
  assert.equal(lerp(10, 20, 2), 30);
  assert.equal(lerp(-4, 6, 1.5), 11);
});

test('lerp follows JavaScript arithmetic for non-finite inputs', () => {
  assert.ok(Number.isNaN(lerp(Infinity, 10, 0)));
  assert.ok(Number.isNaN(lerp(-Infinity, 10, 0.5)));
  assert.ok(Number.isNaN(lerp(0, 10, Number.NaN)));
});

test('lerp keeps a constant value when both endpoints are equal', () => {
  for (const t of [-2, 0, 0.5, 1, 3]) {
    assert.equal(lerp(7.25, 7.25, t), 7.25);
  }
});

test('lerp is consistent with its linear interpolation identity', () => {
  for (const [start, end, t] of [[-12, 30, 0.2], [3.5, -8, 0.65], [0, 1, 0.333]]) {
    assertNearlyEqual(lerp(start, end, t), start * (1 - t) + end * t);
  }
});
