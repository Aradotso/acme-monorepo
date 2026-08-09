/**
 * A small shared Result type for explicit success and failure values.
 * @template T, E
 */
export class Result {
  constructor(ok, value) {
    this.ok = ok;
    this.value = value;
  }

  static ok(value) {
    return new Result(true, value);
  }

  static err(error) {
    return new Result(false, error);
  }

  map(transform) {
    return this.ok ? Result.ok(transform(this.value)) : this;
  }

  mapError(transform) {
    return this.ok ? this : Result.err(transform(this.value));
  }

  match({ ok, err }) {
    return this.ok ? ok(this.value) : err(this.value);
  }
}
