/**
 * Converts text to a lowercase, hyphen-separated identifier.
 * Edge cases: empty or whitespace-only input returns `""`; Unicode letters and
 * numbers are retained after normalization, while punctuation and emoji become separators.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalizes the first letter of each whitespace-delimited word.
 * Edge cases: empty input stays empty, repeated whitespace is preserved, and
 * Unicode casing is used; punctuation adjacent to a word is not discarded.
 */
export function titleCase(input: string): string {
  return input.replace(/(^|\s)(\p{Letter})/gu, (_match, prefix: string, letter: string) =>
    prefix + letter.toLocaleUpperCase(),
  );
}

/**
 * Limits a string to `maxLength`, appending an ellipsis when it is shortened.
 * Edge cases: non-positive limits return `""`, limits up to the ellipsis length
 * return a shortened ellipsis, and Unicode is counted by code point rather than UTF-16 unit.
 */
export function truncate(input: string, maxLength: number, ellipsis = '…'): string {
  if (maxLength <= 0) return '';
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;
  const marker = Array.from(ellipsis);
  if (marker.length >= maxLength) return marker.slice(0, maxLength).join('');
  return characters.slice(0, maxLength - marker.length).join('') + ellipsis;
}

/**
 * Counts Unicode words separated by non-letter/non-number characters.
 * Edge cases: empty and punctuation-only strings count as zero, combining marks
 * stay attached to their preceding word, and emoji are separators.
 */
export function wordCount(input: string): number {
  return input.match(/[\p{Letter}\p{Number}](?:[\p{Letter}\p{Number}\p{Mark}]*)/gu)?.length ?? 0;
}

/**
 * Removes HTML comments, script/style blocks, and tags without evaluating markup.
 * Edge cases: empty input returns empty, malformed/unclosed tags are removed to
 * the end of the string, and text containing `<` that is not tag-like is retained.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\s*(?:script|style)\b[^>]*>[\s\S]*?<\s*\/\s*(?:script|style)\s*>/gi, '')
    .replace(/<\/?[A-Za-z][^>]*>/g, '')
    .replace(/<\/?[A-Za-z][^>]*$/g, '');
}

/**
 * Escapes text for literal use inside a regular expression.
 * Edge cases: empty input returns empty, every regex metacharacter is escaped,
 * and line breaks, hyphens, and slashes remain literal rather than forming syntax.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[\\^$.*+?()[\]{}|\/-]/g, '\\$&');
}
