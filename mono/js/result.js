/**
 * A small shared Result type for explicit success and failure values.
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
}
