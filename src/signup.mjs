import { Result } from './result.mjs';

export function validateEmail(email) {
  const normalizedEmail = email.trim();
  return normalizedEmail.includes('@')
    ? Result.ok(normalizedEmail)
    : Result.err('Please enter a valid email address.');
}

export function subscribe(email) {
  return validateEmail(email).map(
    (normalizedEmail) => `Thanks! We'll write to ${normalizedEmail} soon.`,
  );
}
