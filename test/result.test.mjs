import test from 'node:test';
import assert from 'node:assert/strict';
import { Result } from '../src/result.mjs';
import { subscribe, validateEmail } from '../src/signup.mjs';

test('Result maps successful values and preserves errors', () => {
  assert.equal(Result.ok(2).map((value) => value * 2).value, 4);
  assert.equal(Result.err('nope').map((value) => value * 2).value, 'nope');
});

test('Result maps errors without changing successful values', () => {
  assert.equal(Result.err('nope').mapError((error) => error.toUpperCase()).value, 'NOPE');
  assert.equal(Result.ok(2).mapError(() => 'nope').value, 2);
});

test('valid signup input returns a success Result', () => {
  const result = subscribe('  hello@example.com  ');

  assert.equal(result.ok, true);
  assert.equal(result.value, "Thanks! We'll write to hello@example.com soon.");
});

test('invalid signup input returns an error Result', () => {
  const result = validateEmail('not-an-email');

  assert.equal(result.ok, false);
  assert.equal(result.value, 'Please enter a valid email address.');
});
