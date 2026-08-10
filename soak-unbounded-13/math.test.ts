import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { add, clamp, lerp } from './math.ts';

describe('add', () => {
  it('adds positive, negative, and zero values', () => {
    assert.equal(add(2, 3), 5);
    assert.equal(add(-2, -3), -5);
    assert.equal(add(-2, 3), 1);
    assert.equal(add(0, 7), 7);
    assert.equal(add(7, 0), 7);
  });

  it('preserves fractional precision and is commutative', () => {
    assert.equal(add(0.25, 1.5), 1.75);
    assert.equal(add(1.5, 0.25), 1.75);
    assert.equal(add(123456789, 987654321), 1_111_111_110);
    assert.equal(add(4.2, -4.2), 0);
  });

  it('follows JavaScript number behavior for infinities', () => {
    assert.equal(add(Infinity, 1), Infinity);
    assert.equal(add(-Infinity, 1), -Infinity);
  });
});

describe('clamp', () => {
  it('returns values already inside the inclusive range unchanged', () => {
    assert.equal(clamp(5, 0, 10), 5);
    assert.equal(clamp(0, 0, 10), 0);
    assert.equal(clamp(10, 0, 10), 10);
    assert.equal(clamp(-2.5, -10, 10), -2.5);
  });

  it('returns the lower bound for values below the range', () => {
    assert.equal(clamp(-1, 0, 10), 0);
    assert.equal(clamp(-100, -5, 10), -5);
    assert.equal(clamp(-Infinity, -5, 10), -5);
  });

  it('returns the upper bound for values above the range', () => {
    assert.equal(clamp(11, 0, 10), 10);
    assert.equal(clamp(100, -5, 10), 10);
    assert.equal(clamp(Infinity, -5, 10), 10);
  });

  it('supports negative and fractional bounds', () => {
    assert.equal(clamp(-1.25, -2.5, -0.5), -1.25);
    assert.equal(clamp(-3, -2.5, -0.5), -2.5);
    assert.equal(clamp(0.25, -2.5, -0.5), -0.5);
  });

  it('handles a zero-width range', () => {
    assert.equal(clamp(-100, 4, 4), 4);
    assert.equal(clamp(4, 4, 4), 4);
    assert.equal(clamp(100, 4, 4), 4);
  });
});

describe('lerp', () => {
  it('returns each endpoint at t=0 and t=1', () => {
    assert.equal(lerp(10, 20, 0), 10);
    assert.equal(lerp(10, 20, 1), 20);
    assert.equal(lerp(-10, -20, 0), -10);
    assert.equal(lerp(-10, -20, 1), -20);
  });

  it('interpolates midpoint and fractional positions', () => {
    assert.equal(lerp(0, 100, 0.5), 50);
    assert.equal(lerp(10, 20, 0.25), 12.5);
    assert.equal(lerp(20, 10, 0.75), 12.5);
    assert.equal(lerp(-10, 10, 0.25), -5);
  });

  it('supports extrapolation outside the unit interval', () => {
    assert.equal(lerp(10, 20, -1), 0);
    assert.equal(lerp(10, 20, 2), 30);
    assert.equal(lerp(20, 10, 1.5), 5);
  });

  it('returns a constant for equal endpoints and preserves large values', () => {
    assert.equal(lerp(7.5, 7.5, -100), 7.5);
    assert.equal(lerp(7.5, 7.5, 100), 7.5);
    assert.equal(lerp(1_000_000, 1_000_100, 0.5), 1_000_050);
  });

  it('is translation-consistent across several fractions', () => {
    for (const t of [0, 0.1, 0.25, 0.5, 0.75, 1]) {
      assert.equal(lerp(3, 13, t) + 100, lerp(103, 113, t));
    }
  });
});
