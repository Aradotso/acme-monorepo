/**
 * Converts text to a lowercase, hyphen-separated identifier.
 * Diacritics are folded, punctuation becomes separators, and empty or
 * punctuation-only input returns an empty string; non-Latin letters remain.
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
 * Capitalizes each whitespace-delimited word and lowercases its remainder.
 * Empty input stays empty, repeated whitespace is collapsed, and Unicode
 * letters are supported; punctuation attached to a word is preserved.
 */
export function titleCase(input: string): string {
  return input
    .trim()
    .split(/\s+/u)
    .filter(Boolean)
    .map((word) => {
      const characters = Array.from(word);
      return characters.length === 0
        ? ''
        : characters[0].toLocaleUpperCase() + characters.slice(1).join('').toLocaleLowerCase();
    })
    .join(' ');
}

/**
 * Limits a string to the requested length, adding an ellipsis when needed.
 * Non-positive lengths return an empty string, lengths shorter than the
 * ellipsis return a sliced ellipsis, and Unicode code points are not split.
 */
export function truncate(input: string, maxLength: number, ellipsis = '…'): string {
  if (maxLength <= 0) return '';
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;
  const suffix = Array.from(ellipsis).slice(0, maxLength);
  if (suffix.length === maxLength) return suffix.join('');
  return characters.slice(0, maxLength - suffix.length).join('') + suffix.join('');
}

/**
 * Counts Unicode words, rather than whitespace-separated fragments.
 * Empty or punctuation-only input has count zero; apostrophes and hyphens
 * inside a word are retained, while emoji and punctuation are not words.
 */
export function wordCount(input: string): number {
  const words = input.match(/\p{L}[\p{L}\p{M}\p{N}]*(?:['’\-][\p{L}\p{M}\p{N}]+)*/gu);
  return words?.length ?? 0;
}

/**
 * Removes HTML comments and tags while leaving text content in place.
 * Empty input returns empty, malformed tags are removed conservatively, and
 * script/style contents are retained as text because this is not an HTML parser.
 */
export function stripHtml(input: string): string {
  return input.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, '');
}

/**
 * Escapes regex metacharacters so the result matches input literally.
 * Empty input returns empty, Unicode is preserved, and lone backslashes or
 * repeated metacharacters are escaped without changing their order.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}
