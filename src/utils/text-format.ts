/** Uppercase the first character of a string. */
export function capitalize(s: string): string {
  const characters = Array.from(s)
  return characters.length === 0 ? s : characters[0].toUpperCase() + characters.slice(1).join('')
}

/** Shorten a string to at most max characters, using an ellipsis when needed. */
export function truncate(s: string, max: number): string {
  if (max <= 0) return ''

  const characters = Array.from(s)
  if (characters.length <= max) return s

  return characters.slice(0, max - 1).join('') + '…'
}

/** Convert a string into a lowercase, hyphen-separated URL slug. */
export function slugify(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
