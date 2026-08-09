const test = require('node:test');
const assert = require('node:assert/strict');
const { ok, err } = require('../js/result');
const subscribe = require('../js/signup');

test('ok stores a value and maps successful results', () => {
  const result = ok(2).map(value => value * 3);
  assert.equal(result.isOk, true);
  assert.equal(result.isErr, false);
  assert.equal(result.value, 6);
});

test('err stores an error and skips success transformations', () => {
  const result = err('network').map(() => assert.fail('map should not run'));
  assert.equal(result.isOk, false);
  assert.equal(result.isErr, true);
  assert.equal(result.error, 'network');
});

test('mapError transforms failures without changing successes', () => {
  assert.equal(err('network').mapError(error => error.toUpperCase()).error, 'NETWORK');
  assert.equal(ok('value').mapError(() => assert.fail('mapError should not run')).value, 'value');
});

test('match handles both Result branches', () => {
  assert.equal(ok('done').match({ ok: value => value, err: () => 'failed' }), 'done');
  assert.equal(err('failed').match({ ok: () => 'done', err: error => error }), 'failed');
});

test('signup returns a successful Result for a trimmed email', () => {
  const result = subscribe('  hello@example.com ');
  assert.deepEqual(result, ok("Thanks! We'll write to hello@example.com soon."));
});

test('signup returns an error Result for an empty email', () => {
  assert.deepEqual(subscribe('   '), err('Please enter your email address.'));
});
