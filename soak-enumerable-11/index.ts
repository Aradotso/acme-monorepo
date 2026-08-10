/**
 * Converts text to a lowercase, dash-separated slug.
 *
 * Edge cases: empty or whitespace-only input returns an empty string; Unicode
 * letters and numbers are retained, combining marks are removed, and repeated
 * separators collapse to one dash. Punctuation and HTML-like markup are not
 * preserved.
 */
export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalizes the first letter of each whitespace-delimited word.
 *
 * Edge cases: empty input stays empty, Unicode casing is delegated to the
 * runtime, and runs of whitespace collapse to single spaces. It treats HTML
 * and punctuation as ordinary text rather than parsing or removing them.
 */
export function titleCase(value: string): string {
  return value
    .trim()
    .split(/\s+/u)
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase())
    .join(' ');
}

/**
 * Limits text to a maximum length, appending an omission marker when needed.
 *
 * Edge cases: empty input returns empty, non-positive limits return empty, and
 * Unicode is measured by code points so surrogate pairs are not split. If the
 * limit is shorter than the marker, the marker itself is clipped to fit.
 */
export function truncate(value: string, limit: number, omission = '…'): string {
  const characters = Array.from(value);
  if (limit <= 0) return '';
  if (characters.length <= limit) return characters.join('');
  const marker = Array.from(omission).slice(0, limit);
  if (marker.length === limit) return marker.join('');
  return characters.slice(0, limit - marker.length).join('') + marker.join('');
}

/**
 * Counts non-whitespace runs in text.
 *
 * Edge cases: empty and whitespace-only input return zero; Unicode whitespace
 * is recognized by the runtime's Unicode-aware regular expression, while
 * punctuation and HTML tags count as part of words.
 */
export function wordCount(value: string): number {
  return value.trim() === '' ? 0 : value.trim().split(/\s+/u).length;
}

/**
 * Removes HTML/XML tags and decodes no entities.
 *
 * Edge cases: empty input returns empty, tags spanning newlines are removed,
 * and script/style contents are retained as text (only their tags disappear).
 * This function is not an HTML sanitizer and must not be used as one.
 */
export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/gs, '');
}

/**
 * Escapes regular-expression metacharacters for use as a literal fragment.
 *
 * Edge cases: empty input returns empty, Unicode is preserved, and every
 * syntax-significant character (including a hyphen) is escaped so the result
 * is safe when inserted into a regex character class or larger expression.
 */
export function escapeRegExp(value: string): string {
  return value.replace(/[\\^$.*+?()[\]{}|\-/]/g, '\\$&');
}
