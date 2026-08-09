import { Result } from "./result.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function subscribeEmail(email) {
  const normalizedEmail = typeof email === "string" ? email.trim() : "";

  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return Result.error("Please enter a valid email address.");
  }

  return Result.ok(normalizedEmail);
}

export function bindSignupForm({ form, emailInput, status }) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = subscribeEmail(emailInput.value);

    if (result.isError) {
      emailInput.setAttribute("aria-invalid", "true");
      status.textContent = result.error;
      return result;
    }

    emailInput.removeAttribute("aria-invalid");
    status.textContent = `Thanks! We'll write to ${result.value} soon.`;
    return result;
  });
}
