import test from "node:test";
import assert from "node:assert/strict";
import { Result } from "../mono/js/result.js";
import { submitSignup, validateEmail } from "../mono/js/signup.js";

test("Result represents immutable success and failure values", () => {
  const success = Result.ok(2).map((value) => value * 2);
  const failure = Result.err("bad").map(() => "not reached");
  assert.equal(success.ok, true);
  assert.equal(success.value, 4);
  assert.equal(failure.ok, false);
  assert.equal(failure.error, "bad");
  assert.equal(Object.isFrozen(success), true);
});

test("validateEmail rejects empty input", () => {
  const result = validateEmail("  ");
  assert.equal(result.ok, false);
  assert.equal(result.error, "Please enter your email address.");
});

test("validateEmail rejects malformed addresses", () => {
  assert.equal(validateEmail("not-an-email").ok, false);
});

test("validateEmail returns the trimmed address", () => {
  const result = validateEmail(" hello@example.com ");
  assert.equal(result.ok, true);
  assert.equal(result.value, "hello@example.com");
});

test("submitSignup returns a success message", () => {
  const result = submitSignup("hello@example.com");
  assert.equal(result.ok, true);
  assert.equal(result.value, "Thanks! We'll write to hello@example.com soon.");
});
