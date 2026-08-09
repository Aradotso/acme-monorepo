(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Result = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  class Result {
    constructor(ok, value) {
      this.ok = ok;
      this.value = value;
      Object.freeze(this);
    }

    static ok(value) {
      return new Result(true, value);
    }

    static err(error) {
      return new Result(false, error);
    }

    isOk() {
      return this.ok;
    }

    isErr() {
      return !this.ok;
    }

    map(transform) {
      return this.isOk() ? Result.ok(transform(this.value)) : this;
    }

    mapError(transform) {
      return this.isErr() ? Result.err(transform(this.value)) : this;
    }
  }

  return Result;
}));
