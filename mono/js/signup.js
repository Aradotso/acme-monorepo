import { Result } from "./result.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value) {
  const email = String(value ?? "").trim();
  if (!email) return Result.err("Please enter your email address.");
  if (!EMAIL_PATTERN.test(email)) return Result.err("Please enter a valid email address.");
  return Result.ok(email);
}

export function submitSignup(value) {
  return validateEmail(value).map((email) => `Thanks! We'll write to ${email} soon.`);
}

export function bindSignupForm(form, emailInput, status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = submitSignup(emailInput.value);
    status.textContent = result.ok ? result.value : result.error;
    status.className = result.ok ? "signup-status success" : "signup-status error";
    emailInput.setAttribute("aria-invalid", String(!result.ok));
  });
}
