/**
 * Converts text into a lowercase, hyphen-delimited slug.
 * Empty or punctuation-only input becomes ""; accents are folded, while
 * Unicode letters and numbers are retained. Repeated separators collapse.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/(\p{Script=Latin})\p{M}+/gu, '$1')
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalizes the first letter of each whitespace-delimited word.
 * Empty input stays empty, existing casing is preserved after the first
 * character, and punctuation attached to a word is not treated as a word.
 */
export function titleCase(input: string): string {
  return input.replace(/(^|\s)(\p{L})/gu, (_match, prefix: string, letter: string) =>
    prefix + letter.toLocaleUpperCase(),
  );
}

/**
 * Limits a string to maxLength code points, appending an ellipsis when needed.
 * Empty input returns empty; non-positive limits return empty; and limits
 * shorter than the ellipsis return a shortened ellipsis without splitting a surrogate pair.
 */
export function truncate(input: string, maxLength: number, ellipsis = '…'): string {
  if (maxLength <= 0) return '';
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;
  const suffixCharacters = Array.from(ellipsis);
  if (suffixCharacters.length >= maxLength) return suffixCharacters.slice(0, maxLength).join('');
  return characters.slice(0, maxLength - suffixCharacters.length).join('') + ellipsis;
}

/**
 * Counts Unicode words separated by non-letter/non-number characters.
 * Empty and whitespace-only input count as zero; apostrophes and hyphens
 * inside a word stay attached, while hostile regex-like text is plain text.
 */
export function wordCount(input: string): number {
  const words = input.match(/[\p{L}\p{M}\p{N}]+(?:['’\-][\p{L}\p{M}\p{N}]+)*/gu);
  return words?.length ?? 0;
}

/**
 * Removes HTML comments and tags from text without executing or interpreting them.
 * Empty input returns empty, malformed tags are removed through the next closing
 * angle bracket, and script contents are retained as text rather than evaluated.
 */
export function stripHtml(input: string): string {
  return input.replace(/<!--[\s\S]*?-->|<[^>]*>/g, '');
}

/**
 * Escapes every RegExp metacharacter so the result matches input literally.
 * Empty input returns empty, Unicode is preserved, and line breaks or other
 * adversarial punctuation cannot alter the resulting pattern.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[\\^$.*+?()[\]{}|/]/g, '\\$&');
}
