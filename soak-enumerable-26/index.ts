/**
 * Converts text to a lowercase, hyphen-separated identifier.
 * Empty or punctuation-only input becomes ""; accents are folded where possible,
 * while non-Latin letters and numbers are retained. Repeated separators collapse.
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
 * Capitalizes the first letter of each whitespace-delimited word and lowercases
 * the remaining letters. Empty input stays empty; Unicode letters are supported,
 * and markup or punctuation is treated as ordinary text rather than executed.
 */
export function titleCase(input: string): string {
  return input.replace(/\S+/gu, (word) => {
    const firstLetter = word.match(/\p{L}/u);
    if (!firstLetter || firstLetter.index === undefined) return word;
    const before = word.slice(0, firstLetter.index);
    const letter = firstLetter[0].toLocaleUpperCase();
    const after = word.slice(firstLetter.index + firstLetter[0].length).toLocaleLowerCase();
    return before + letter + after;
  });
}

/**
 * Limits a string to at most maxLength Unicode code points, appending an ellipsis
 * when needed. Empty input returns empty; non-positive limits return empty, and
 * a limit shorter than the ellipsis is honored by returning only its prefix.
 */
export function truncate(input: string, maxLength: number): string {
  const characters = Array.from(input);
  if (maxLength <= 0 || characters.length === 0) return '';
  if (characters.length <= maxLength) return input;
  if (maxLength === 1) return '…';
  return characters.slice(0, maxLength - 1).join('') + '…';
}

/**
 * Counts Unicode word-like runs (letters with combining marks, numbers, and
 * internal apostrophes or hyphens). Empty input is zero; punctuation-only input
 * is zero, and HTML/script-looking text is counted as text rather than parsed.
 */
export function wordCount(input: string): number {
  const words = input.match(/[\p{L}\p{N}]+(?:[\p{M}]|['’\-][\p{L}\p{N}]+)*/gu);
  return words?.length ?? 0;
}

/**
 * Removes HTML comments, script/style blocks, and tags, then decodes the common
 * named entities. Empty input returns empty; malformed tags are removed through
 * their closing angle bracket, and text inside ordinary tags is preserved.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\s*(?:script|style)\b[^>]*>[\s\S]*?<\s*\/\s*(?:script|style)\s*>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&(?:amp|lt|gt|quot|apos|nbsp);/gi, (entity) => ({
      '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&nbsp;': ' ',
    }[entity.toLowerCase()] ?? entity));
}

/**
 * Escapes every regular-expression metacharacter so the result matches the
 * literal input. Empty input returns empty; Unicode is preserved, and injected
 * groups, anchors, or backreferences cannot change the resulting pattern.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}
