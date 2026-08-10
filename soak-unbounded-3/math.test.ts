import assert from 'node:assert/strict';
import test from 'node:test';
import { add, clamp, lerp } from './math.ts';

test('add handles positive, negative, zero, and decimal values', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-8, 3), -5);
  assert.equal(add(-8, 8), 0);
  assert.equal(add(0, 0), 0);
  assert.equal(add(0.1, 0.2), 0.30000000000000004);
});

test('add is commutative and supports large finite values', () => {
  assert.equal(add(12.5, -4.25), add(-4.25, 12.5));
  assert.equal(add(Number.MAX_VALUE, Number.MAX_VALUE), Infinity);
});

test('clamp preserves values inside inclusive bounds', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-2.5, -10, 10), -2.5);
  assert.equal(clamp(0.25, 0, 1), 0.25);
});

test('clamp pins values below and above the bounds', () => {
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(11, 0, 10), 10);
  assert.equal(clamp(Number.NEGATIVE_INFINITY, -3, 7), -3);
  assert.equal(clamp(Number.POSITIVE_INFINITY, -3, 7), 7);
});

test('clamp includes both endpoints and handles equal bounds', () => {
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
  assert.equal(clamp(-100, 4, 4), 4);
  assert.equal(clamp(4, 4, 4), 4);
  assert.equal(clamp(100, 4, 4), 4);
});

test('clamp normalizes reversed bounds', () => {
  assert.equal(clamp(5, 10, 0), 5);
  assert.equal(clamp(-2, 10, 0), 0);
  assert.equal(clamp(12, 10, 0), 10);
  assert.equal(clamp(0.5, 1, 0), 0.5);
});

test('clamp follows number semantics for NaN', () => {
  assert.ok(Number.isNaN(clamp(Number.NaN, 0, 1)));
  assert.ok(Number.isNaN(clamp(0, Number.NaN, 1)));
  assert.ok(Number.isNaN(clamp(0, 0, Number.NaN)));
});

test('lerp returns endpoints at zero and one', () => {
  assert.equal(lerp(10, 20, 0), 10);
  assert.equal(lerp(10, 20, 1), 20);
  assert.equal(lerp(-10, 10, 0.5), 0);
});

test('lerp interpolates decimals and negative ranges', () => {
  assert.equal(lerp(0, 10, 0.25), 2.5);
  assert.equal(lerp(-10, -20, 0.3), -13);
  assert.equal(lerp(1.5, 2.5, 0.2), 1.7);
});

test('lerp extrapolates when t is outside the unit interval', () => {
  assert.equal(lerp(10, 20, -1), 0);
  assert.equal(lerp(10, 20, 2), 30);
  assert.equal(lerp(5, 5, 100), 5);
});

test('lerp supports reversed direction and infinite weights', () => {
  assert.equal(lerp(20, 10, 0.25), 17.5);
  assert.equal(lerp(0, 1, Infinity), Infinity);
  assert.equal(lerp(0, 1, -Infinity), -Infinity);
  assert.ok(Number.isNaN(lerp(0, 1, Number.NaN)));
});
