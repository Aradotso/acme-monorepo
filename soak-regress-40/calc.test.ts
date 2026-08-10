import { describe, expect, test } from 'bun:test';
import { add, divide } from './calc';

describe('calc', () => {
  test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('divides two numbers', () => {
    expect(divide(12, 3)).toBe(4);
  });

  test('rejects division by zero', () => {
    expect(() => divide(1, 0)).toThrow('Cannot divide by zero');
  });
});
