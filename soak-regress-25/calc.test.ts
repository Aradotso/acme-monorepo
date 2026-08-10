import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { add, divide } from './calc.ts';

describe('calc', () => {
  it('adds two numbers', () => {
    assert.equal(add(2, 3), 5);
  });

  it('divides two numbers', () => {
    assert.equal(divide(12, 3), 4);
  });

  it('rejects division by zero', () => {
    assert.throws(() => divide(1, 0), RangeError);
  });
});
