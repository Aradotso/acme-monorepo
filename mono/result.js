/**
 * A small discriminated Result type for operations that can succeed or fail
 * without throwing at their call sites.
 */
export const ok = (value) => ({ ok: true, value });

export const err = (error) => ({ ok: false, error });

export const match = (result, { ok: onOk, err: onErr }) =>
  result.ok ? onOk(result.value) : onErr(result.error);
