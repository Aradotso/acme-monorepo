/** Convert text into a lowercase, hyphen-separated URL slug. */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/** Capitalize the first letter of each whitespace-separated word. */
export function titleCase(input: string): string {
  return input
    .trim()
    .split(/\s+/u)
    .filter(Boolean)
    .map((word) => word[0].toLocaleUpperCase() + word.slice(1).toLocaleLowerCase())
    .join(' ');
}
