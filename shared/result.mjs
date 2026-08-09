/**
 * A small Result type for representing successful and failed operations without
 * throwing. Results are immutable and safe to pass between browser code and tests.
 */
export const ok = (value) => Object.freeze({ ok: true, value });

export const err = (error) => Object.freeze({ ok: false, error });

export const isOk = (result) => result.ok === true;
export const isErr = (result) => !isOk(result);

export const mapResult = (result, transform) =>
  isOk(result) ? ok(transform(result.value)) : result;
