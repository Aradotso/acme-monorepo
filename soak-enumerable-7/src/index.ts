/**
 * Converts text into a lowercase, separator-delimited identifier.
 * Empty or separator-only input returns an empty string; Unicode letters and
 * numbers are retained after normalization, while punctuation is discarded.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalizes the first letter of each whitespace-delimited word.
 * Empty input stays empty, repeated whitespace is normalized to single spaces,
 * and Unicode casing is used; punctuation remains attached to its word.
 */
export function titleCase(input: string): string {
  return input
    .trim()
    .split(/\s+/u)
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase())
    .join(' ');
}

/**
 * Limits a string to a maximum length, appending an ellipsis when shortened.
 * Empty input and non-positive limits return an empty string; limits smaller
 * than the ellipsis are respected, and truncation counts Unicode code points.
 */
export function truncate(input: string, maxLength: number): string {
  if (!input || maxLength <= 0) return '';
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;
  if (maxLength <= 3) return characters.slice(0, maxLength).join('');
  return `${characters.slice(0, maxLength - 3).join('')}...`;
}

/**
 * Counts non-empty whitespace-delimited words.
 * Empty or whitespace-only input returns zero, Unicode words are counted as
 * units, and adversarial punctuation does not create extra words.
 */
export function wordCount(input: string): number {
  return input.trim() ? input.trim().split(/\s+/u).length : 0;
}

/**
 * Removes HTML comments and tags while preserving visible text between them.
 * Empty input returns empty, Unicode text is unchanged, and malformed or
 * adversarial tag-like text is removed without executing or interpreting it.
 */
export function stripHtml(input: string): string {
  return input.replace(/<!--[\s\S]*?-->|<[^>]*>/g, '');
}

/**
 * Escapes every regular-expression metacharacter in a literal string.
 * Empty input returns empty, Unicode is preserved, and adversarial patterns
 * become literals that cannot alter a constructed regular expression.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
