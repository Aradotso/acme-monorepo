import { err, ok } from "./result.js";

const EMAIL_REQUIRED = "Please enter your email address.";
const EMAIL_INVALID = "Please enter a valid email address.";

/**
 * Validates signup input and returns a Result instead of throwing or silently
 * accepting invalid input.
 */
export const prepareSignup = (email) => {
  const normalizedEmail = email.trim();

  if (!normalizedEmail) return err(EMAIL_REQUIRED);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return err(EMAIL_INVALID);
  }

  return ok(normalizedEmail);
};

export const signupMessages = { EMAIL_REQUIRED, EMAIL_INVALID };
