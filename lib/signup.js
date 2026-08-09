(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./result'));
  } else {
    root.Signup = factory(root.Result);
  }
}(typeof self !== 'undefined' ? self : this, function (Result) {
  'use strict';

  const SignupError = Object.freeze({
    INVALID_EMAIL: 'Please enter a valid email address.',
  });

  function subscribe(email) {
    const normalizedEmail = String(email).trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isEmail) {
      return Result.err(SignupError.INVALID_EMAIL);
    }

    return Result.ok(normalizedEmail);
  }

  return { SignupError, subscribe };
}));
