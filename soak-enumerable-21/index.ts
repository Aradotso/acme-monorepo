/**
 * Converts text into a lowercase, hyphen-separated slug.
 * Empty or punctuation-only input returns an empty string; accents are folded
 * where possible, non-Latin Unicode letters/numbers are retained, and runs of
 * separators collapse to one hyphen.
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
 * Capitalizes the first Unicode letter of each whitespace-delimited word and
 * lowercases the remaining letters. Empty input stays empty; punctuation is
 * preserved, and repeated whitespace is normalized to single spaces.
 */
export function titleCase(input: string): string {
  return input.trim().replace(/\s+/gu, ' ').toLocaleLowerCase().replace(
    /(^|\s)(\p{L})/gu,
    (_match, separator: string, letter: string) => `${separator}${letter.toLocaleUpperCase()}`,
  );
}

/**
 * Limits a string to a Unicode-safe length, appending an ellipsis when it is
 * shortened. Empty input and non-positive limits return empty; limits below
 * the ellipsis width return a fitting prefix of the ellipsis, never a broken
 * surrogate pair.
 */
export function truncate(input: string, maxLength: number): string {
  const length = Math.max(0, Math.floor(maxLength));
  const characters = Array.from(input);
  if (characters.length <= length) return input;
  if (length <= 1) return '…'.slice(0, length);
  return `${characters.slice(0, length - 1).join('')}…`;
}

/**
 * Counts non-empty runs of Unicode whitespace-separated text. Empty input,
 * whitespace-only input, and hostile spacing such as tabs/newlines count as
 * zero or as ordinary separators rather than as words themselves.
 */
export function wordCount(input: string): number {
  const trimmed = input.trim();
  return trimmed === '' ? 0 : trimmed.split(/\s+/u).length;
}

/**
 * Removes HTML comments, script/style blocks, and tags, then decodes common
 * text entities. Empty input returns empty; malformed/unclosed tags are
 * removed conservatively, and script/style payloads are never returned.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/gu, '')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/giu, '')
    .replace(/<[^>]*>/gu, '')
    .replace(/&(?:amp|lt|gt|quot|apos|nbsp);/giu, (entity) => ({
      '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&nbsp;': ' ',
    }[entity.toLowerCase()] ?? entity));
}

/**
 * Escapes every RegExp metacharacter in a string for literal matching.
 * Empty input returns empty; Unicode and line terminators are preserved, and
 * adversarial patterns such as `.*` become harmless literal text.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[\\^$.*+?()[\]{}|/-]/gu, '\\$&');
}
