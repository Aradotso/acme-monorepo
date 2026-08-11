/**
 * Converts text to a lowercase, hyphen-separated identifier.
 * Empty or punctuation-only input returns an empty string; accents are folded,
 * while non-Latin letters are retained. HTML and repeated separators are safe.
 */
export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalizes each word while lowercasing the remaining letters.
 * Whitespace and punctuation are preserved, empty input stays empty, and
 * Unicode letters are handled without treating an embedded HTML payload as markup.
 */
export function titleCase(value: string): string {
  return value.replace(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu, (word) => {
    const first = word[0];
    return first.toLocaleUpperCase() + word.slice(first.length).toLocaleLowerCase();
  });
}

/**
 * Limits a string to a maximum number of Unicode code points.
 * An empty string is returned for non-positive limits; values already within
 * the limit are unchanged, and truncation uses an ellipsis without splitting a surrogate pair.
 */
export function truncate(value: string, maxLength: number): string {
  if (maxLength <= 0) return '';
  const characters = Array.from(value);
  if (characters.length <= maxLength) return value;
  if (maxLength === 1) return '…';
  return characters.slice(0, maxLength - 1).join('') + '…';
}

/**
 * Counts Unicode letter/number runs separated by anything else.
 * Empty and whitespace-only input count as zero; emoji do not count as words,
 * and hostile punctuation cannot manufacture extra word boundaries.
 */
export function wordCount(value: string): number {
  return value.match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
}

/**
 * Removes HTML comments, script/style blocks, and tags, then decodes common
 * entities. Empty input remains empty; malformed tags are removed conservatively,
 * and script contents never leak into the returned text.
 */
export function stripHtml(value: string): string {
  return value
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\s*(script|style)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
}

/**
 * Escapes every RegExp metacharacter in a literal string.
 * Empty input returns an empty pattern; Unicode and line breaks are preserved,
 * and adversarial backslashes/delimiters become literal matches rather than syntax.
 */
export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
