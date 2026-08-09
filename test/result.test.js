import test from "node:test";
import assert from "node:assert/strict";
import { err, isErr, isOk, map, mapError, ok, unwrap } from "../src/result.js";

test("ok stores a value and maps it", () => {
  const result = map(ok(2), (value) => value * 2);

  assert.deepEqual(result, { ok: true, value: 4 });
  assert.equal(isOk(result), true);
  assert.equal(isErr(result), false);
  assert.equal(unwrap(result), 4);
});

test("err stores an error and bypasses value mapping", () => {
  const original = err("nope");

  assert.deepEqual(map(original, () => "unexpected"), original);
  assert.deepEqual(mapError(original, (error) => error.toUpperCase()), {
    ok: false,
    error: "NOPE",
  });
  assert.equal(isOk(original), false);
  assert.equal(isErr(original), true);
  assert.throws(() => unwrap(original), (error) => error === "nope");
});

test("mapError bypasses successful results", () => {
  const result = ok("ready");

  assert.deepEqual(mapError(result, () => "unexpected"), result);
});
