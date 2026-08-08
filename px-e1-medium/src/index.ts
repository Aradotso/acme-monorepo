/**
 * Converts text to a lowercase, hyphen-separated slug.
 * Empty or punctuation-only input returns an empty string; accents are folded
 * where possible, while non-Latin letters and numbers are retained.
 */
export function slugify(input: string): string {
  return input.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '');
}

/**
 * Capitalizes the first letter of each whitespace-delimited word.
 * Empty or whitespace-only input returns an empty string; existing punctuation
 * is preserved, and casing is normalized for the remainder of each word.
 */
export function titleCase(input: string): string {
  return input.trim().split(/\s+/u).filter(Boolean).map((word) => {
    const letters = Array.from(word);
    if (letters.length === 0) return '';
    return letters[0].toLocaleUpperCase() + letters.slice(1).join('').toLocaleLowerCase();
  }).join(' ');
}

/**
 * Limits a string to maxLength Unicode code points, adding an omission marker
 * when needed. Empty input is unchanged; a non-positive integer limit returns an
 * empty string, and a limit shorter than the marker returns the marker truncated
 * to fit. Non-finite and fractional limits throw a RangeError.
 */
export function truncate(input: string, maxLength: number, omission = '…'): string {
  if (!Number.isFinite(maxLength) || !Number.isInteger(maxLength)) {
    throw new RangeError('maxLength must be a finite integer');
  }
  if (maxLength <= 0) return '';
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;
  const marker = Array.from(omission).slice(0, maxLength).join('');
  if (marker.length === maxLength) return marker;
  return characters.slice(0, maxLength - Array.from(omission).length).join('') + omission;
}

/**
 * Counts whitespace-delimited words containing Unicode letters or numbers.
 * Empty input returns zero, punctuation alone is ignored, and apostrophes or
 * hyphens do not create extra words inside an otherwise valid word.
 */
export function wordCount(input: string): number {
  return input.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

/**
 * Removes HTML comments, script/style blocks, and tags while retaining text.
 * Empty input is unchanged; quoted `>` characters in attributes are treated as
 * part of the tag, and this is text extraction rather than HTML sanitization.
 * Callers must still escape the result before inserting it as HTML.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)\b(?:[^"'<>]|"[^"]*"|'[^']*')*>[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<\/?[A-Za-z](?:[^"'<>]|"[^"]*"|'[^']*')*>/g, '');
}

/**
 * Escapes characters with special meaning in a JavaScript regular expression.
 * Empty input returns an empty pattern fragment, and every regex metacharacter
 * is escaped so adversarial text is matched literally.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
