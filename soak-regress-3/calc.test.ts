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

// Before the refactor, divide returned 0 for a zero divisor. Keep that
// prior contract here so this test proves the final behavior is different.
function divideBeforeRefactor(dividend: number, divisor: number): number {
  return divisor === 0 ? 0 : dividend / divisor;
}

test('divide changes its zero-divisor behavior from the prior contract', () => {
  assert.equal(divideBeforeRefactor(12, 0), 0);
  assert.throws(() => divide(12, 0), RangeError);
});
