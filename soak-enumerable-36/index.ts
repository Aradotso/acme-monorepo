/**
 * Converts text to a lowercase, hyphen-separated identifier.
 * Empty or punctuation-only input becomes an empty string; accents are folded,
 * while letters and numbers from other scripts are retained.
 */
export function slugify(input: string): string {
  const normalized = input.normalize("NFKD").replace(/\p{Mark}/gu, "");
  let slug = "";
  let needsSeparator = false;

  for (const character of normalized) {
    if (/^[\p{Letter}\p{Number}]$/u.test(character)) {
      if (needsSeparator && slug) slug += "-";
      slug += character.toLowerCase();
      needsSeparator = false;
    } else if (slug) {
      needsSeparator = true;
    }
  }

  return slug;
}

/**
 * Capitalizes the first letter of each whitespace-delimited word.
 * Empty and whitespace-only input is returned unchanged; punctuation stays in
 * place, and Unicode letters are uppercased without splitting surrogate pairs.
 */
export function titleCase(input: string): string {
  return input.replace(/(^|\s)([^\s])/gu, (_match, prefix: string, first: string) => {
    return prefix + first.toLocaleUpperCase();
  });
}

/**
 * Limits a string to a maximum number of Unicode code points and adds an
 * omission marker when needed. Non-positive limits return an empty string;
 * limits shorter than the marker return the marker's fitting prefix.
 */
export function truncate(input: string, maxLength: number, omission = "…"): string {
  if (maxLength <= 0) return "";
  const characters = Array.from(input);
  if (characters.length <= maxLength) return input;

  const marker = Array.from(omission);
  if (marker.length >= maxLength) return marker.slice(0, maxLength).join("");
  return characters.slice(0, maxLength - marker.length).join("") + omission;
}

/**
 * Counts non-whitespace runs rather than splitting only on ASCII spaces.
 * Empty or whitespace-only input counts as zero, and punctuation-only runs are
 * still words; Unicode whitespace and letters are handled by the runtime.
 */
export function wordCount(input: string): number {
  const matches = input.match(/\S+/gu);
  return matches ? matches.length : 0;
}

/**
 * Removes markup-looking tags while leaving their text content.
 * Empty input remains empty; quoted `>` characters inside attributes are
 * handled, while malformed tags and script/style contents are not interpreted.
 */
export function stripHtml(input: string): string {
  return input.replace(/<(?:"[^"]*"|'[^']*'|[^'"<>])*?>/g, "");
}

/**
 * Escapes characters with special meaning in a JavaScript regular expression.
 * Empty input stays empty, Unicode is preserved, and every regex metacharacter
 * (including a backslash or a closing bracket) is treated literally.
 */
export function escapeRegExp(input: string): string {
  return input.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}
