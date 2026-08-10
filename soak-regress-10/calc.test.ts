import assert from 'node:assert/strict';
import { test } from 'node:test';
import { add, divide } from './calc.ts';

test('add sums two numbers', () => {
  assert.equal(add(2, 3), 5);
});

test('divide returns the quotient', () => {
  assert.equal(divide(12, 3), 4);
});

test('divide returns zero for a zero divisor', () => {
  assert.equal(divide(12, 0), 0);
});
