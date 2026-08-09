(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("./result"));
  } else {
    root.subscribe = factory(root.Result);
  }
})(typeof globalThis === "object" ? globalThis : this, function (Result) {
  "use strict";

  return function subscribe(email) {
    if (!email || !email.trim()) {
      return Result.err("Please enter your email address.");
    }

    return Result.ok("Thanks! We'll write to " + email.trim() + " soon.");
  };
});
