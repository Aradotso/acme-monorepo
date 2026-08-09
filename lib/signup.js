(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("./result"));
  } else {
    root.Signup = factory(root.Result);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Result) {
  function parseSignupEmail(email) {
    if (!email || !email.includes("@")) {
      return Result.err(new Error("Please enter a valid email address."));
    }
    return Result.ok(email);
  }
  function submitSignup(email) {
    return parseSignupEmail(email).map((address) => `Thanks! We'll write to ${address} soon.`);
  }
  return { parseSignupEmail, submitSignup };
});
