/**
 * Converts text into a lowercase, hyphen-separated identifier.
 * Empty or punctuation-only input returns an empty string; accents are folded
 * away, while letters and numbers from other scripts are retained.
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
 * Capitalizes the first Unicode letter of each word and lowercases the rest.
 * Whitespace and punctuation are preserved, and empty input remains empty;
 * combining marks and apostrophes stay attached to their surrounding word.
 */
export function titleCase(input: string): string {
  return input.replace(/[\p{L}\p{M}\p{N}]+/gu, (word) => {
    const [first, ...rest] = [...word];
    return first.toLocaleUpperCase() + rest.join('').toLocaleLowerCase();
  });
}

/**
 * Limits a string to at most `length` Unicode code points.
 * Negative lengths throw; a zero length returns an empty string, and when an
 * ellipsis is needed it counts toward the limit (so lengths below 1 return '').
 */
export function truncate(input: string, length: number, omission = '…'): string {
  if (!Number.isFinite(length) || length < 0) throw new RangeError('length must be a finite non-negative number');
  const limit = Math.floor(length);
  const characters = [...input];
  if (characters.length <= limit) return input;
  const suffix = [...omission];
  if (limit === 0) return '';
  if (suffix.length >= limit) return suffix.slice(0, limit).join('');
  return characters.slice(0, limit - suffix.length).join('') + omission;
}

/**
 * Counts Unicode words, where a word begins with a letter or number and may
 * contain combining marks, apostrophes, or internal hyphens; empty input and
 * punctuation-only input count as zero.
 */
export function wordCount(input: string): number {
  const words = input.match(/[\p{L}\p{N}](?:[\p{L}\p{M}\p{N}]|['’\-](?=[\p{L}\p{N}]))*/gu);
  return words?.length ?? 0;
}

/**
 * Removes comments and HTML tags from text, including the contents of script
 * and style elements. Empty input returns empty; this is text extraction, not
 * entity decoding, so entities such as `&amp;` are intentionally preserved.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\s*(script|style)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/<[^>]*>/g, '');
}

/**
 * Escapes every regular-expression syntax character so the result matches
 * literally when inserted into a RegExp. Empty input stays empty, and the
 * escaping is safe for adversarial strings containing backslashes and newlines.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[\\^$.*+?()[\]{}|/\-]/g, '\\$&');
}
