/**
 * Converts text to a lowercase, hyphen-separated slug.
 * Empty or punctuation-only input returns an empty string; accents are folded,
 * while unsupported symbols and repeated separators are removed.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalizes the first letter of each whitespace-delimited word.
 * Empty input remains empty and existing internal punctuation is preserved;
 * combining marks and non-Latin letters are handled without ASCII assumptions.
 */
export function titleCase(input: string): string {
  return input.replace(/(^|\s)(\p{Letter})/gu, (_, prefix: string, letter: string) =>
    `${prefix}${letter.toLocaleUpperCase()}`,
  );
}

/**
 * Limits a string to a maximum number of Unicode code points, appending a
 * suffix when needed. Non-positive limits return an empty string, and a suffix
 * longer than the limit is clipped rather than producing an oversized result.
 */
export function truncate(input: string, maxLength: number, suffix = '…'): string {
  if (maxLength <= 0 || input.length === 0) return '';
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;
  const ending = Array.from(suffix).slice(0, maxLength).join('');
  return Array.from(input).slice(0, maxLength - Array.from(ending).length).join('') + ending;
}

/**
 * Counts words using Unicode-aware word segmentation when available.
 * Whitespace-only and empty strings count as zero; punctuation and emoji do
 * not count as words, and adjacent scripts are kept as separate words.
 */
export function wordCount(input: string): number {
  if (!input.trim()) return 0;
  if (typeof Intl.Segmenter === 'function') {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' });
    let count = 0;
    for (const part of segmenter.segment(input)) if (part.isWordLike) count++;
    return count;
  }
  return input.match(/[\p{Letter}\p{Number}]+/gu)?.length ?? 0;
}

/**
 * Removes HTML comments, script/style blocks, and tags while retaining text.
 * Empty input returns empty and malformed or adversarial tag-like text is
 * treated conservatively as markup only when it has a closing angle bracket.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\s*(script|style)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/<[^>]*>/g, '');
}

/**
 * Escapes every regular-expression metacharacter in a string.
 * Empty input returns empty; Unicode text is unchanged, and the result is safe
 * to interpolate into a regex even when it contains slashes or line breaks.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
