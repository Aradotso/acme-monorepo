import test from "node:test";
import assert from "node:assert/strict";
import { err, match, ok } from "../mono/result.js";
import { createSignupMessage } from "../mono/signup.js";

test("ok creates a successful Result", () => {
  assert.deepEqual(ok(42), { ok: true, value: 42 });
});

test("err creates a failed Result", () => {
  assert.deepEqual(err("bad input"), { ok: false, error: "bad input" });
});

test("match handles both Result variants", () => {
  assert.equal(match(ok("done"), { ok: (value) => value, err: () => "failed" }), "done");
  assert.equal(match(err("failed"), { ok: () => "done", err: (error) => error }), "failed");
});

test("signup message returns an Ok Result for an email", () => {
  assert.deepEqual(createSignupMessage("hello@example.com"), {
    ok: true,
    value: "Thanks! We'll write to hello@example.com soon."
  });
});

test("signup message returns an Err Result for missing email", () => {
  assert.deepEqual(createSignupMessage(""), {
    ok: false,
    error: "Please enter your email address."
  });
  assert.deepEqual(createSignupMessage(null), {
    ok: false,
    error: "Please enter your email address."
  });
});
