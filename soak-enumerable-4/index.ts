/** Convert text into a lowercase, separator-delimited slug.
 * Accents are folded where Unicode decomposition supports it; punctuation and
 * whitespace become one hyphen, and empty or separator-only input returns ''.
 */
export function slugify(input: string): string {
  return input.normalize('NFKD').replace(/\p{Mark}/gu, '').toLocaleLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, '-').replace(/^-+|-+$/g, '');
}

/** Capitalize each whitespace-delimited word and lowercase its remaining text.
 * Repeated whitespace is normalized to single spaces; punctuation stays attached
 * to its word, and empty or whitespace-only input returns ''.
 */
export function titleCase(input: string): string {
  return input.trim().split(/\s+/u).filter(Boolean).map((word) => {
    const characters = Array.from(word);
    return characters.length === 0 ? '' : characters[0].toLocaleUpperCase() + characters.slice(1).join('').toLocaleLowerCase();
  }).join(' ');
}

/** Limit a string to maxLength code points, appending an ellipsis when needed.
 * Negative limits throw RangeError; limits of 0 return ''; and a limit below
 * the ellipsis width returns a shortened string containing only ellipsis marks.
 */
export function truncate(input: string, maxLength: number): string {
  if (!Number.isInteger(maxLength) || maxLength < 0) throw new RangeError('maxLength must be a non-negative integer');
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;
  if (maxLength <= 3) return '.'.repeat(maxLength);
  return characters.slice(0, maxLength - 3).join('') + '...';
}

/** Count whitespace-delimited Unicode words, ignoring punctuation-only tokens.
 * Empty input, whitespace-only input, and punctuation-only input return 0;
 * combining marks remain part of the surrounding word when present.
 */
export function wordCount(input: string): number {
  const words = input.match(/[\p{Letter}\p{Number}](?:[\p{Letter}\p{Number}\p{Mark}'’_-]*[\p{Letter}\p{Number}])?/gu);
  return words?.length ?? 0;
}

/** Remove comments, script/style blocks, and markup tags from an HTML string.
 * Text content and entities are retained as written, malformed tags are removed
 * conservatively, and empty input returns ''. This is not an HTML sanitizer.
 */
export function stripHtml(input: string): string {
  return input.replace(/<!--[\s\S]*?-->/g, '').replace(/<\s*(script|style)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

/** Escape regex metacharacters so input can be safely used as a literal pattern.
 * Empty input returns '', and every regex syntax character—including a
 * backslash, slash, or line terminator—is treated literally.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
