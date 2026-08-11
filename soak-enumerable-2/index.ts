/**
 * Converts text to a lowercase, hyphen-separated slug.
 * Empty or punctuation-only input returns an empty string; accents are folded
 * when possible, while non-Latin letters and numbers are retained.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalizes the first letter of each word and lowercases the remaining
 * letters. Empty and whitespace-only input is preserved as-is; punctuation,
 * apostrophes, and hyphens remain in place and do not cause data loss.
 */
export function titleCase(input: string): string {
  return input.replace(/[\p{L}\p{N}][\p{L}\p{M}\p{N}]*/gu, (word) => {
    const first = word.slice(0, 1).toLocaleUpperCase();
    return first + word.slice(1).toLocaleLowerCase();
  });
}

/**
 * Limits a string to maxLength Unicode code points, appending an ellipsis when
 * truncated. Empty input is returned unchanged; non-positive limits return an
 * empty string, and limits shorter than the ellipsis produce a shortened one.
 */
export function truncate(input: string, maxLength: number, ellipsis = '…'): string {
  if (maxLength <= 0) return '';
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;
  const suffixCharacters = Array.from(ellipsis).slice(0, maxLength);
  const prefixLength = maxLength - suffixCharacters.length;
  return characters.slice(0, prefixLength).join('') + suffixCharacters.join('');
}

/**
 * Counts whitespace-delimited words, including Unicode words and numbers.
 * Empty or whitespace-only input returns zero; punctuation-only input also
 * returns zero, while emoji and symbols are not counted as words.
 */
export function wordCount(input: string): number {
  return (input.match(/[\p{L}\p{N}]+(?:[’'][\p{L}\p{N}]+)*/gu) ?? []).length;
}

/**
 * Removes comments, script/style blocks, and markup tags from HTML-like text.
 * Empty input returns an empty string; malformed tags are removed conservatively,
 * and text containing angle brackets that are not tag-shaped is retained.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<\/?[a-z][^>]*>/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Escapes text for literal use inside a regular expression.
 * Empty input returns an empty pattern fragment; every regex metacharacter,
 * including a hyphen and slash, is escaped without changing Unicode text.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[\\^$.*+?()[\]{}|\/-]/g, '\\$&');
}
