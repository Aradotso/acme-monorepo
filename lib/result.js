(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.Result = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  class Result {
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

    static err(error) {
      return new Result(false, error);
    }

    map(transform) {
      return this.ok ? Result.ok(transform(this.value)) : this;
    }

    mapError(transform) {
      return this.ok ? this : Result.err(transform(this.error));
    }

    match(onOk, onError) {
      return this.ok ? onOk(this.value) : onError(this.error);
    }
  }

  return Result;
});
