/**
 * Converts text to a lowercase, hyphen-separated identifier.
 * Accents are folded to their ASCII base letters; punctuation, symbols,
 * repeated separators, and emoji become separators, and empty text returns ''.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalizes the first letter of each whitespace-delimited word.
 * Existing punctuation is retained, Unicode letters are supported through
 * code points, and empty or whitespace-only input returns ''.
 */
export function titleCase(input: string): string {
  return input.replace(/\S+/gu, (word) => {
    const characters = Array.from(word);
    const first = characters.shift();
    return first ? first.toLocaleUpperCase() + characters.join('').toLocaleLowerCase() : word;
  });
}

/**
 * Limits a string to a maximum number of Unicode code points, appending an
 * omission marker when needed. Empty input is unchanged; non-positive limits
 * return ''; if the limit cannot fit the marker, the marker is clipped.
 */
export function truncate(input: string, maxLength: number, omission = '…'): string {
  if (maxLength <= 0) return '';
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;
  const marker = Array.from(omission);
  if (marker.length >= maxLength) return marker.slice(0, maxLength).join('');
  return characters.slice(0, maxLength - marker.length).join('') + omission;
}

/**
 * Counts Unicode word-like runs, including letters, combining marks, digits,
 * apostrophes, and hyphens within a word. Empty input counts as zero and
 * punctuation-only or hostile markup contributes no words.
 */
export function wordCount(input: string): number {
  return input.match(/[\p{L}\p{N}](?:[\p{L}\p{M}\p{N}'’-]*[\p{L}\p{M}\p{N}])?/gu)?.length ?? 0;
}

/**
 * Removes HTML comments, tags, and script/style blocks from text. Empty input
 * returns ''; malformed tags are removed as far as possible, while encoded
 * entities remain encoded rather than being interpreted as executable HTML.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\s*(script|style)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/<[^>]*>/g, '');
}

/**
 * Escapes every regular-expression metacharacter in a string for literal use.
 * Empty input returns ''; Unicode and line breaks are preserved, and the
 * result is safe even when it contains backslashes or replacement tokens.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[\\^$.*+?()[\]{}|/\-]/g, '\\$&');
}
