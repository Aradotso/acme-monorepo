/**
 * Converts text to a lowercase, hyphen-separated identifier.
 * Empty or punctuation-only input returns an empty string; Unicode letters and
 * numbers are preserved after compatibility normalization, while combining
 * marks and runs of separators are removed or collapsed.
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
 * Capitalizes the first character of each whitespace-delimited word.
 * Empty input remains empty, repeated whitespace is preserved, and Unicode
 * casing is delegated to JavaScript; punctuation stays attached to its word.
 */
export function titleCase(input: string): string {
  return input.replace(/\S+/gu, word => {
    const first = word.codePointAt(0);
    if (first === undefined) return word;
    const character = String.fromCodePoint(first);
    return character.toLocaleUpperCase() + word.slice(character.length).toLocaleLowerCase();
  });
}

/**
 * Limits a string to a maximum number of Unicode code points, appending an
 * ellipsis when needed. Empty input returns empty, non-positive limits return
 * empty, and a limit of one returns only the ellipsis for truncated input.
 */
export function truncate(input: string, maxLength: number): string {
  if (!input || maxLength <= 0) return '';
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;
  if (maxLength === 1) return '…';
  return characters.slice(0, maxLength - 1).join('') + '…';
}

/**
 * Counts non-whitespace runs as words. Empty or whitespace-only input returns
 * zero, Unicode whitespace is recognized, and punctuation-only runs still
 * count as words rather than being silently discarded.
 */
export function wordCount(input: string): number {
  return input.trim() === '' ? 0 : input.trim().split(/\s+/u).length;
}

/**
 * Removes markup tags and decodes the five common HTML entities.
 * Empty input returns empty; tag-like text is treated as markup, and script or
 * style contents are removed to avoid exposing adversarial hidden content.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<[^>]*>/gu, '')
    .replace(/&(?:amp|lt|gt|quot|apos);/gi, entity => ({
      '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'",
    }[entity.toLowerCase()] ?? entity));
}

/**
 * Escapes every RegExp metacharacter so input can be used literally in a
 * regular expression. Empty input returns empty, Unicode is left intact, and
 * line breaks or backslashes cannot escape the generated pattern.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[\\^$.*+?()[\]{}|/]/g, '\\$&');
}
