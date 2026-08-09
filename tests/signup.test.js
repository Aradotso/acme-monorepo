import test from "node:test";
import assert from "node:assert/strict";
import { Result } from "../mono/js/result.js";
import { subscribeEmail } from "../mono/js/signup.js";

test("Result represents successful values", () => {
  const result = Result.ok("value");

  assert.equal(result.isOk, true);
  assert.equal(result.isError, false);
  assert.equal(result.value, "value");
  assert.equal(Object.isFrozen(result), true);
});

test("Result represents errors", () => {
  const result = Result.error("invalid");

  assert.equal(result.isOk, false);
  assert.equal(result.isError, true);
  assert.equal(result.error, "invalid");
});

test("subscribeEmail normalizes a valid address", () => {
  const result = subscribeEmail("  hello@example.com ");

  assert.equal(result.isOk, true);
  assert.equal(result.value, "hello@example.com");
});

test("subscribeEmail returns a Result error for an invalid address", () => {
  const result = subscribeEmail("not-an-email");

  assert.equal(result.isError, true);
  assert.equal(result.error, "Please enter a valid email address.");
});

test("bindSignupForm reports Result errors and clears them on success", async () => {
  const { bindSignupForm } = await import("../mono/js/signup.js");
  const listeners = {};
  const form = {
    addEventListener(type, listener) {
      listeners[type] = listener;
    },
  };
  const emailInput = {
    value: "bad",
    attributes: {},
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    removeAttribute(name) {
      delete this.attributes[name];
    },
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
