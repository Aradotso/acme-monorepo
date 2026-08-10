/**
 * Converts text to a lowercase, hyphen-separated slug.
 * Empty or punctuation-only input returns an empty string; accents are folded,
 * while letters and numbers from other scripts are retained.
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
 * Capitalizes the first Unicode code point of each whitespace-delimited word
 * and lowercases the remainder. Empty input stays empty; repeated whitespace
 * is normalized to single spaces, and punctuation remains attached to words.
 */
export function titleCase(input: string): string {
  return input
    .trim()
    .split(/\s+/u)
    .filter(Boolean)
    .map((word) => {
      const codePoints = Array.from(word.toLocaleLowerCase());
      return codePoints.length === 0
        ? ''
        : codePoints[0].toLocaleUpperCase() + codePoints.slice(1).join('');
    })
    .join(' ');
}

/**
 * Limits a string to at most `maxLength` Unicode code points, adding `suffix`
 * when truncation is needed. Empty input or a non-positive limit returns an
 * empty string; if the suffix is longer than the limit, it is clipped.
 */
export function truncate(input: string, maxLength: number, suffix = '…'): string {
  if (maxLength <= 0 || input.length === 0) return '';
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;
  const suffixCharacters = Array.from(suffix).slice(0, maxLength);
  const bodyLength = Math.max(0, maxLength - suffixCharacters.length);
  return characters.slice(0, bodyLength).join('') + suffixCharacters.join('');
}

/**
 * Counts non-empty, whitespace-delimited words. Empty or whitespace-only input
 * returns zero; Unicode whitespace and words are handled, while punctuation is
 * considered part of the surrounding token rather than a separator.
 */
export function wordCount(input: string): number {
  const trimmed = input.trim();
  return trimmed === '' ? 0 : trimmed.split(/\s+/u).length;
}

/**
 * Removes HTML comments and markup tags while leaving their text content and
 * entities untouched. Empty input returns empty; malformed/unclosed tags are
 * removed only when they match a tag-shaped sequence, so this is not an HTML
 * sanitizer and must not be used as a security boundary.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/?[a-z][^>]*>/gi, '');
}

/**
 * Escapes all regular-expression metacharacters in a string for literal use.
 * Empty input returns empty, Unicode is preserved, and newline/control text is
 * not altered because only syntax-significant regex characters are escaped.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
