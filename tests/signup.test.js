import test from "node:test";
import assert from "node:assert/strict";
import { Result } from "../js/result.js";
import { bindSignupForm, subscribeEmail } from "../js/signup.js";

test("Result represents successful and failed values", () => {
  const success = Result.ok("value");
  const failure = Result.error("invalid");

  assert.equal(success.isOk, true);
  assert.equal(success.isError, false);
  assert.equal(success.value, "value");
  assert.equal(failure.isOk, false);
  assert.equal(failure.isError, true);
  assert.equal(failure.error, "invalid");
  assert.equal(Object.isFrozen(success), true);
});

test("Result transformations only run for their matching branch", () => {
  assert.equal(Result.ok(2).map((value) => value * 3).value, 6);
  assert.equal(Result.error("network").map(() => assert.fail()).error, "network");
  assert.equal(Result.error("network").mapError((error) => error.toUpperCase()).error, "NETWORK");
  assert.equal(Result.ok("value").mapError(() => assert.fail()).value, "value");
});

test("Result match selects the matching handler", () => {
  assert.equal(Result.ok("done").match({ ok: (value) => value, error: () => "failed" }), "done");
  assert.equal(Result.error("failed").match({ ok: () => "done", error: (value) => value }), "failed");
});

test("subscribeEmail trims valid addresses and returns errors for invalid input", () => {
  assert.deepEqual(subscribeEmail("  hello@example.com "), Result.ok("hello@example.com"));
  assert.deepEqual(subscribeEmail("not-an-email"), Result.error("Please enter a valid email address."));
  assert.equal(subscribeEmail(null).isError, true);
});

test("bindSignupForm reports errors and clears them on success", () => {
  const listeners = {};
  const form = { addEventListener(type, listener) { listeners[type] = listener; } };
  const emailInput = {
    value: "bad",
    attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    removeAttribute(name) { delete this.attributes[name]; },
  };
  const status = { textContent: "" };

  bindSignupForm({ form, emailInput, status });
  listeners.submit({ preventDefault() {} });
  assert.equal(emailInput.attributes["aria-invalid"], "true");
  assert.equal(status.textContent, "Please enter a valid email address.");

  emailInput.value = "hello@example.com";
  listeners.submit({ preventDefault() {} });
  assert.equal(emailInput.attributes["aria-invalid"], undefined);
  assert.equal(status.textContent, "Thanks! We'll write to hello@example.com soon.");
});
