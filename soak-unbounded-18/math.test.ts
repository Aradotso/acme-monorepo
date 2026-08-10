import assert from 'node:assert/strict';
import test from 'node:test';

import { add, clamp, lerp } from './math.ts';

test('add handles positive, negative, and fractional operands', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-8, 3), -5);
  assert.equal(add(-2.5, -1.75), -4.25);
});

test('add preserves the identity and supports large finite values', () => {
  assert.equal(add(42, 0), 42);
  assert.equal(add(0, -13.5), -13.5);
  assert.equal(add(Number.MAX_SAFE_INTEGER, 1), 9007199254740992);
});

test('clamp returns values already inside the inclusive range unchanged', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-2.5, -10, 10), -2.5);
});

test('clamp snaps values below and above the range to its endpoints', () => {
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(11, 0, 10), 10);
  assert.equal(clamp(Number.NEGATIVE_INFINITY, -4, 4), -4);
  assert.equal(clamp(Number.POSITIVE_INFINITY, -4, 4), 4);
});

test('clamp includes both boundaries and handles a zero-width range', () => {
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
  assert.equal(clamp(-100, 7, 7), 7);
  assert.equal(clamp(7, 7, 7), 7);
  assert.equal(clamp(100, 7, 7), 7);
});

test('lerp returns the endpoints at t=0 and t=1', () => {
  assert.equal(lerp(10, 30, 0), 10);
  assert.equal(lerp(10, 30, 1), 30);
  assert.equal(lerp(-12, -4, 0), -12);
  assert.equal(lerp(-12, -4, 1), -4);
});

test('lerp interpolates forward and backward with fractional t values', () => {
  assert.equal(lerp(0, 100, 0.25), 25);
  assert.equal(lerp(10, 0, 0.3), 7);
  assert.equal(lerp(-10, 10, 0.5), 0);
  assert.equal(lerp(1.5, 2.5, 0.75), 2.25);
});

test('lerp permits extrapolation outside the unit interval', () => {
  assert.equal(lerp(10, 20, -1), 0);
  assert.equal(lerp(10, 20, 2), 30);
});

test('lerp with identical endpoints is constant for any t', () => {
  assert.equal(lerp(6.25, 6.25, -10), 6.25);
  assert.equal(lerp(6.25, 6.25, 0.5), 6.25);
  assert.equal(lerp(6.25, 6.25, 10), 6.25);
});

test('add follows ordinary arithmetic for infinities and NaN', () => {
  assert.equal(add(Number.POSITIVE_INFINITY, 1), Number.POSITIVE_INFINITY);
  assert.equal(add(Number.NEGATIVE_INFINITY, 1), Number.NEGATIVE_INFINITY);
  assert.ok(Number.isNaN(add(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)));
  assert.ok(Number.isNaN(add(Number.NaN, 1)));
});

test('clamp leaves NaN as NaN and supports unbounded limits', () => {
  assert.ok(Number.isNaN(clamp(Number.NaN, 0, 10)));
  assert.equal(clamp(-100, Number.NEGATIVE_INFINITY, 10), -100);
  assert.equal(clamp(100, 0, Number.POSITIVE_INFINITY), 100);
});

test('lerp handles infinite and non-finite inputs according to arithmetic rules', () => {
  assert.ok(Number.isNaN(lerp(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 0.5)));
  assert.ok(Number.isNaN(lerp(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 0.5)));
  assert.ok(Number.isNaN(lerp(0, 1, Number.NaN)));
});
