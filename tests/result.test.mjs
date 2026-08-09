import test from "node:test";
import assert from "node:assert/strict";
import { err, isErr, isOk, mapResult, ok } from "../shared/result.mjs";
import { signupMessage } from "../mono/signup.mjs";

test("ok stores a value and maps it", () => {
  const result = ok(2);

  assert.equal(isOk(result), true);
  assert.equal(isErr(result), false);
  assert.equal(result.value, 2);
  assert.equal(mapResult(result, (value) => value * 2).value, 4);
});

test("err stores an error and skips mapping", () => {
  const result = err("failed");

  assert.equal(isOk(result), false);
  assert.equal(isErr(result), true);
  assert.equal(result.error, "failed");
  assert.equal(mapResult(result, () => "unexpected").error, "failed");
});

test("signupMessage returns an Ok result for a valid email", () => {
  assert.deepEqual(signupMessage("hello@example.com"), {
    ok: true,
    value: "Thanks! We'll write to hello@example.com soon.",
  });
});

test("signupMessage returns an Err result for an invalid email", () => {
  assert.deepEqual(signupMessage("not-an-email"), {
    ok: false,
    error: "Please enter a valid email address.",
  });
});
