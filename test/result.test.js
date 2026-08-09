import test from "node:test";
import assert from "node:assert/strict";
import { err, ok, Result } from "../src/result.js";

test("creates successful and failed results", () => {
  const success = ok("value");
  const failure = err("bad input");

  assert.equal(success.ok, true);
  assert.equal(success.value, "value");
  assert.equal(failure.ok, false);
  assert.equal(failure.error, "bad input");
});

test("maps only successful values", () => {
  assert.equal(ok(2).map((value) => value * 2).value, 4);
  assert.equal(err("bad").map(() => "unreachable").error, "bad");
});

test("maps only errors", () => {
  assert.equal(ok(2).mapError(() => "unreachable").value, 2);
  assert.equal(err("bad").mapError((error) => error.toUpperCase()).error, "BAD");
});

test("folds both outcomes", () => {
  assert.equal(ok(3).fold((value) => value + 1, () => 0), 4);
  assert.equal(err("bad").fold(() => 0, (error) => error), "bad");
});

test("protects access to the wrong branch", () => {
  assert.throws(() => ok(1).error, /successful result/);
  assert.throws(() => err("bad").value, /error result/);
  assert.ok(Object.isFrozen(Result.ok(1)));
});

test("validates signup input as a Result", async () => {
  const { validateEmail } = await import("../src/signup.js");

  assert.equal(validateEmail("person@example.com").value, "person@example.com");
  assert.equal(validateEmail("not-an-email").error, "Please enter a valid email address.");
});
