import { err, ok } from "./result.js";

export const createSignupMessage = (email) => {
  if (typeof email !== "string" || email.trim() === "") {
    return err("Please enter your email address.");
  }

  return ok(`Thanks! We'll write to ${email} soon.`);
};
