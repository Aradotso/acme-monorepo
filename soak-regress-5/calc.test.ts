import assert from 'node:assert/strict';
import test from 'node:test';
import { add, divide } from './calc.ts';

test('adds two numbers', () => {
  assert.equal(add(2, 3), 5);
});

test('divides two numbers', () => {
  assert.equal(divide(12, 3), 4);
});

test('throws when dividing by zero', () => {
  assert.throws(() => divide(1, 0), {
    name: 'RangeError',
    message: 'Cannot divide by zero',
  });
});
