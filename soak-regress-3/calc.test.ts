import assert from 'node:assert/strict';
import { test } from 'node:test';
import { add, divide } from './calc.js';

test('add sums positive and negative numbers', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-4, 1), -3);
});

test('divide returns the quotient', () => {
  assert.equal(divide(12, 3), 4);
  assert.equal(divide(-9, 2), -4.5);
});

test('divide returns zero for a zero divisor', () => {
  assert.equal(divide(12, 0), 0);
});
