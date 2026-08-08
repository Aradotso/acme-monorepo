/** Convert text to a URL-friendly slug; empty or punctuation-only input returns an empty string. */
export function slugify(input: string): string {
  return input.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '');
}

/** Capitalize each whitespace-delimited word; repeated whitespace is normalized and empty input stays empty. */
export function titleCase(input: string): string {
  return input.trim().split(/\s+/u).filter(Boolean).map(word => word[0]!.toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()).join(' ');
}

/** Limit a string to length units, reserving space for the marker; non-positive limits return an empty string. */
export function truncate(input: string, maxLength: number, omission = '…'): string {
  if (maxLength <= 0) return '';
  if ([...input].length <= maxLength) return input;
  const marker = [...omission].slice(0, maxLength).join('');
  const available = maxLength - [...marker].length;
  return available <= 0 ? marker : [...input].slice(0, available).join('') + marker;
}

/** Count Unicode-aware non-whitespace runs; empty and whitespace-only input return zero. */
export function wordCount(input: string): number {
  return input.trim() ? input.trim().split(/\s+/u).length : 0;
}

/** Remove HTML-like tags without interpreting entities; an unclosed tag marker is removed while following text is preserved. */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/gs, '').replace(/<[^>]*$/s, '');
}

/** Escape all regular-expression metacharacters; empty input remains empty. */
export function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Convert separators and word boundaries to lower camelCase; empty or separator-only input returns empty. */
export function camelCase(input: string): string {
  const words = splitWords(input);
  return words.map((word, i) => i === 0 ? word.toLocaleLowerCase() : word[0]!.toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()).join('');
}

/** Convert separators and word boundaries to snake_case; empty or separator-only input returns empty. */
export function snakeCase(input: string): string {
  return splitWords(input).map(word => word.toLocaleLowerCase()).join('_');
}

/** Convert separators and word boundaries to kebab-case; empty or separator-only input returns empty. */
export function kebabCase(input: string): string {
  return splitWords(input).map(word => word.toLocaleLowerCase()).join('-');
}

/** Center text in a field using the requested fill character; non-finite/non-integer widths and empty fills return the original text. */
export function padCenter(input: string, width: number, fill = ' '): string {
  const length = [...input].length;
  if (!Number.isFinite(width) || !Number.isInteger(width) || width <= length || !fill) return input;
  const total = width - length;
  const left = Math.floor(total / 2);
  const fillChars = [...fill];
  const makeFill = (count: number): string => Array.from({ length: count }, (_, index) => fillChars[index % fillChars.length]).join('').slice(0, count);
  return makeFill(left) + input + makeFill(total - left);
}

/** Wrap text at a maximum Unicode width, breaking long words when necessary; non-positive width throws RangeError. */
export function wrapText(input: string, width: number): string[] {
  if (!Number.isInteger(width) || width <= 0) throw new RangeError('width must be a positive integer');
  if (!input) return [];
  const result: string[] = [];
  for (const paragraph of input.split(/\r?\n/u)) {
    let line = '';
    for (const word of paragraph.split(/\s+/u).filter(Boolean)) {
      if ([...word].length > width) {
        if (line) { result.push(line); line = ''; }
        let remaining = [...word];
        while (remaining.length > width) { result.push(remaining.splice(0, width).join('')); }
        line = remaining.join('');
      } else if (!line) line = word;
      else if ([...line, ' ', ...word].length <= width) line += ` ${word}`;
      else { result.push(line); line = word; }
    }
    if (line) result.push(line);
  }
  return result;
}

/** Compute edit distance by Unicode code point; empty strings work naturally and negative inputs are impossible. */
export function levenshtein(a: string, b: string): number {
  const left = [...a], right = [...b];
  let previous = Array.from({ length: right.length + 1 }, (_, i) => i);
  for (let i = 0; i < left.length; i++) {
    const current = [i + 1];
    for (let j = 0; j < right.length; j++) current.push(Math.min(current[j]! + 1, previous[j + 1]! + 1, previous[j]! + (left[i] === right[j] ? 0 : 1)));
    previous = current;
  }
  return previous[right.length] ?? left.length;
}

/** Return the longest shared Unicode prefix; an empty string results when either input differs initially. */
export function longestCommonPrefix(...inputs: string[]): string {
  if (!inputs.length) return '';
  const first = [...inputs[0]!];
  let length = first.length;
  for (const input of inputs.slice(1)) { const chars = [...input]; while (length > chars.length || first[length - 1] !== chars[length - 1]) length--; }
  return first.slice(0, length).join('');
}

/** Test palindrome status by Unicode code points after lowercasing; punctuation and whitespace remain significant. */
export function isPalindrome(input: string): boolean {
  const chars = [...input.toLocaleLowerCase()];
  return chars.join('') === chars.reverse().join('');
}

/** Replace {{key}} placeholders from a record; missing keys and malformed placeholders are left untouched. */
export function templateFill(template: string, values: Record<string, string | number | boolean>): string {
  return template.replace(/\{\{\s*([\w.-]+)\s*\}\}/gu, (whole, key: string) => Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : whole);
}

/** Split text into words on separators and camel-case boundaries; empty or separator-only input returns an empty array. */
function splitWords(input: string): string[] {
  return input.replace(/([a-z\d])([A-Z])/gu, '$1 $2').trim().split(/[\s_\-]+/u).filter(Boolean);
}
