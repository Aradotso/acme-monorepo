/**
 * A small discriminated-union Result for operations that can succeed or fail.
 * Keeping failures as values makes callers handle them explicitly without
 * throwing from normal application paths.
 */
export const ok = (value) => ({ ok: true, value });

export const err = (error) => ({ ok: false, error });

export const isOk = (result) => result.ok === true;

export const isErr = (result) => result.ok === false;

export const map = (result, transform) =>
  isOk(result) ? ok(transform(result.value)) : result;

export const mapError = (result, transform) =>
  isErr(result) ? err(transform(result.error)) : result;

export const unwrap = (result) => {
  if (isOk(result)) return result.value;
  throw result.error;
};
