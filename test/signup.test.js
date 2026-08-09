import test from "node:test";
import assert from "node:assert/strict";
import { prepareSignup, signupMessages } from "../src/signup.js";

test("prepareSignup normalizes a valid email", () => {
  assert.deepEqual(prepareSignup("  person@example.com "), {
    ok: true,
    value: "person@example.com",
  });
});

test("prepareSignup returns a Result error for missing email", () => {
  assert.deepEqual(prepareSignup("   "), {
    ok: false,
    error: signupMessages.EMAIL_REQUIRED,
  });
});

test("prepareSignup returns a Result error for malformed email", () => {
  assert.deepEqual(prepareSignup("not-an-email"), {
    ok: false,
    error: signupMessages.EMAIL_INVALID,
  });
});
