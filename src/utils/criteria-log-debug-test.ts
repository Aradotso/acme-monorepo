/** Return true when c is one of the five standard vowels. */
export function isVowel(c: string): boolean {
  return c.length === 1 && 'aeiou'.includes(c.toLowerCase());
}
