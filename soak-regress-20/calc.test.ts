import assert from "node:assert/strict";
import test from "node:test";
import { add, divide } from "./calc.ts";

test("adds two numbers", () => {
  assert.equal(add(2, 3), 5);
});

test("divides two numbers", () => {
  assert.equal(divide(12, 3), 4);
});

test("returns zero when dividing by zero", () => {
  assert.equal(divide(12, 0), 0);
});
