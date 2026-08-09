'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const Result = require('../lib/result');
const { SignupError, subscribe } = require('../lib/signup');

test('Result represents successful and failed values', () => {
  const success = Result.ok(3);
  const failure = Result.err('broken');

  assert.equal(success.isOk(), true);
  assert.equal(success.isErr(), false);
  assert.equal(success.value, 3);
  assert.equal(failure.isOk(), false);
  assert.equal(failure.isErr(), true);
  assert.equal(failure.value, 'broken');
});

test('Result transforms only the matching branch', () => {
  assert.equal(Result.ok(2).map((value) => value * 2).value, 4);
  assert.equal(Result.err('broken').map((value) => value * 2).value, 'broken');
  assert.equal(Result.err('broken').mapError((error) => error.toUpperCase()).value, 'BROKEN');
  assert.equal(Result.ok(2).mapError(() => 'unexpected').value, 2);
});

test('subscribe returns a normalized success Result for valid email', () => {
  const result = subscribe('  hello@example.com ');

  assert.equal(result.isOk(), true);
  assert.equal(result.value, 'hello@example.com');
});

test('subscribe returns an error Result for invalid email', () => {
  const result = subscribe('not-an-email');

  assert.equal(result.isErr(), true);
  assert.equal(result.value, SignupError.INVALID_EMAIL);
});
