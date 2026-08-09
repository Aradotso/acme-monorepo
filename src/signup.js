import { err, ok } from "./result.js";

export const validateEmail = (email) =>
  email.includes("@") ? ok(email) : err("Please enter a valid email address.");

export const setupSignupForm = (form, emailInput, status) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = validateEmail(emailInput.value.trim());

    result.fold(
      (address) => {
        status.textContent = `Thanks! We'll write to ${address} soon.`;
      },
      (message) => {
        status.textContent = message;
      },
    );
  });
};
