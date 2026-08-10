import { describe, expect, it } from 'vitest';
import { add, divide } from './calc';

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});

describe('divide', () => {
  it('divides two numbers', () => {
    expect(divide(12, 3)).toBe(4);
  });

  it('rejects division by zero', () => {
    expect(() => divide(12, 0)).toThrow(new RangeError('Cannot divide by zero'));
  });
});
