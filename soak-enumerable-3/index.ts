/**
 * Converts text to a lowercase, hyphen-separated slug.
 * Empty or punctuation-only input becomes ""; accents are folded when possible,
 * while Unicode letters and numbers are retained. Repeated separators collapse.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Capitalizes the first Unicode letter of each whitespace-delimited word.
 * Empty input stays empty, existing whitespace is normalized to single spaces,
 * and punctuation is preserved; unusual symbols do not cause an exception.
 */
export function titleCase(input: string): string {
  return input.trim().split(/\s+/u).filter(Boolean).map((word) => {
    const characters = Array.from(word);
    return characters.length === 0
      ? word
      : characters[0].toLocaleUpperCase() + characters.slice(1).join("").toLocaleLowerCase();
  }).join(" ");
}

/**
 * Limits a string to maxLength Unicode code points, appending an ellipsis when
 * shortened. Empty input and non-positive limits return ""; a limit of one
 * returns only the ellipsis, avoiding negative slicing or broken surrogate pairs.
 */
export function truncate(input: string, maxLength: number): string {
  if (maxLength <= 0 || input.length === 0) return "";
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;
  if (maxLength === 1) return "…";
  return characters.slice(0, maxLength - 1).join("") + "…";
}

/**
 * Counts non-empty, whitespace-delimited words using Unicode-aware whitespace.
 * Empty or whitespace-only input returns zero; punctuation counts as part of a
 * word, and malformed surrogate input is handled without throwing.
 */
export function wordCount(input: string): number {
  return input.trim().split(/\s+/u).filter(Boolean).length;
}

/**
 * Removes tags and comments from markup while retaining text and entities.
 * Empty input returns empty; script/style blocks are removed with their content,
 * and malformed or adversarial tag text is treated conservatively as markup.
 */
export function stripHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\s*(script|style)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<[^>]*>/g, "");
}

/**
 * Escapes every RegExp syntax character so the result can be matched literally.
 * Empty input returns empty, Unicode text is preserved, and embedded newlines,
 * backslashes, or replacement-looking sequences are never interpreted.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[\\^$.*+?()[\]{}|/-]/g, "\\$&");
}
