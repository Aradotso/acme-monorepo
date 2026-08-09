/**
 * A small, shared representation of an operation that can succeed or fail.
 * Keeping failures as values makes callers handle both outcomes explicitly.
 */
export class Result {
  #value;
  #error;

  constructor(ok, value, error) {
    this.ok = ok;
    this.#value = value;
    this.#error = error;
    Object.freeze(this);
  }

  static ok(value) {
    return new Result(true, value, undefined);
  }

  static err(error) {
    return new Result(false, undefined, error);
  }

  get value() {
    if (!this.ok) throw new Error("Cannot read the value of an error result");
    return this.#value;
  }

  get error() {
    if (this.ok) throw new Error("Cannot read the error of a successful result");
    return this.#error;
  }

  map(transform) {
    return this.ok ? Result.ok(transform(this.#value)) : this;
  }

  mapError(transform) {
    return this.ok ? this : Result.err(transform(this.#error));
  }

  fold(onSuccess, onError) {
    return this.ok ? onSuccess(this.#value) : onError(this.#error);
  }
}

export const ok = (value) => Result.ok(value);
export const err = (error) => Result.err(error);
