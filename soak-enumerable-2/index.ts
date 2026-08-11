/**
 * Converts text to a URL-friendly kebab-case identifier.
 * Empty or punctuation-only input becomes an empty string; accents are folded,
 * while letters and numbers from other scripts are retained.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalizes the first letter or number of each whitespace-delimited word.
 * Empty input stays empty, existing punctuation is preserved, and Unicode
 * letters are handled without splitting surrogate pairs.
 */
export function titleCase(input: string): string {
  return input.toLocaleLowerCase().replace(/(^|\s)([^\s])/gu, (_match, boundary: string, first: string) => {
    return boundary + first.toLocaleUpperCase();
  });
}

/**
 * Limits a string to maxLength code points, appending suffix when shortened.
 * Non-positive limits return an empty string; if the suffix cannot fit, it is
 * itself clipped, and astral Unicode characters count as one code point.
 */
export function truncate(input: string, maxLength: number, suffix = '…'): string {
  if (maxLength <= 0) return '';
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;

  const ending = Array.from(suffix).slice(0, maxLength).join('');
  const available = maxLength - Array.from(ending).length;
  return characters.slice(0, Math.max(0, available)).join('') + ending;
}

/**
 * Counts runs of Unicode letters and numbers as words.
 * Empty or punctuation-only input returns zero; combining marks stay attached
 * to their preceding word, and hostile punctuation cannot create extra words.
 */
export function wordCount(input: string): number {
  const words = input.match(/[\p{L}\p{N}]+(?:\p{M}+[\p{L}\p{N}]*)*/gu);
  return words?.length ?? 0;
}

/**
 * Removes HTML tags and content inside script/style elements.
 * Empty input returns empty, malformed tags are removed as far as possible,
 * and text is not interpreted as HTML after stripping.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<\s*(script|style)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[ \t\r\n]+/g, ' ')
    .trim();
}

/**
 * Escapes every regular-expression metacharacter for literal matching.
 * Empty input returns empty, Unicode is preserved, and consecutive or mixed
 * adversarial metacharacters are escaped independently.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}
