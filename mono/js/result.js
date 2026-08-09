/**
 * A small, immutable container for operations that can succeed or fail.
 */
export class Result {
  constructor(ok, value) {
    this.ok = ok;
    if (ok) this.value = value;
    else this.error = value;
    Object.freeze(this);
  }

  static ok(value) {
    return new Result(true, value);
  }

  static err(error) {
    return new Result(false, error);
  }

  map(transform) {
    if (!this.ok) return this;
    return Result.ok(transform(this.value));
  }

  mapError(transform) {
    if (this.ok) return this;
    return Result.err(transform(this.error));
  }
}
