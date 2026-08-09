(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.Result = factory();
  }
})(typeof globalThis === "object" ? globalThis : this, function () {
  "use strict";

  function ok(value) {
    return new Result(true, value);
  }

  function err(error) {
    return new Result(false, error);
  }

  class Result {
    constructor(isOk, value) {
      this.isOk = isOk;
      this.isErr = !isOk;
      if (isOk) {
        this.value = value;
      } else {
        this.error = value;
      }
      Object.freeze(this);
    }

    map(transform) {
      return this.isOk ? ok(transform(this.value)) : this;
    }

    mapError(transform) {
      return this.isErr ? err(transform(this.error)) : this;
    }

    match(handlers) {
      return this.isOk ? handlers.ok(this.value) : handlers.err(this.error);
    }
  }

  return Object.freeze({ ok, err, Result });
});
