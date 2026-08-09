import { err, ok } from "../shared/result.mjs";

export const signupMessage = (email) => {
  if (!email || !email.includes("@")) {
    return err("Please enter a valid email address.");
  }

  return ok(`Thanks! We'll write to ${email} soon.`);
};

export const attachSignupForm = (document) => {
  const form = document.getElementById("signup-form");
  const emailInput = document.getElementById("signup-email");
  const status = document.getElementById("signup-status");

  if (!form || !emailInput || !status) {
    return err("Signup form elements are missing.");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = signupMessage(emailInput.value.trim());
    status.textContent = result.ok ? result.value : result.error;
  });

  return ok(undefined);
};

if (typeof document !== "undefined") {
  attachSignupForm(document);
}
