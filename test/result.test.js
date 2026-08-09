const test = require("node:test");
const assert = require("node:assert/strict");
const Result = require("../lib/result");

test("Result.ok stores a value and maps it", () => {
  const result = Result.ok(2).map((value) => value * 2);

  assert.equal(result.ok, true);
  assert.equal(result.value, 4);
});

test("Result.err stores an error and skips success mapping", () => {
  const error = new Error("failed");
  const result = Result.err(error).map(() => "not reached");

  assert.equal(result.ok, false);
  assert.equal(result.error, error);
});

test("mapError transforms failures without changing successes", () => {
  const error = Result.err("bad input").mapError((message) => message.toUpperCase());
  const success = Result.ok("value").mapError(() => "not reached");

  assert.equal(error.error, "BAD INPUT");
  assert.equal(success.value, "value");
});

test("match handles both result variants", () => {
  assert.equal(Result.ok("saved").match((value) => value, () => "failed"), "saved");
  assert.equal(Result.err("failed").match(() => "saved", (error) => error), "failed");
});

test("signup returns a Result for valid and invalid email addresses", () => {
  const { parseSignupEmail, submitSignup } = require("../lib/signup");
  assert.equal(parseSignupEmail("person@example.com").value, "person@example.com");
  assert.equal(parseSignupEmail("not-an-email").error.message, "Please enter a valid email address.");
  assert.equal(submitSignup("person@example.com").value, "Thanks! We'll write to person@example.com soon.");
});
