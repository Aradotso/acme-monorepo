/**
 * A small shared Result type for representing successful and failed operations
 * without throwing for expected errors.
 */
export class Result {
  constructor(ok, value) {
    this.ok = ok;
    if (ok) {
      this.value = value;
    } else {
      this.error = value;
    }
    Object.freeze(this);
  }

  static ok(value) {
    return new Result(true, value);
  }

  static error(error) {
    return new Result(false, error);
  }

  get isOk() {
    return this.ok;
  }

  get isError() {
    return !this.ok;
  }

  map(transform) {
    return this.isOk ? Result.ok(transform(this.value)) : this;
  }

  mapError(transform) {
    return this.isError ? Result.error(transform(this.error)) : this;
  }

  match({ ok, error }) {
    return this.isOk ? ok(this.value) : error(this.error);
  }
}
