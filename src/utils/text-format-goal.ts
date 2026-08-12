export function capitalize(s: string): string {
  const characters = Array.from(s)
  if (characters.length === 0) return s

  return characters[0].toUpperCase() + characters.slice(1).join('')
}

export function truncate(s: string, max: number): string {
  if (s.length <= max) return s
  if (max <= 0) return ''
  if (max === 1) return '…'

  return `${s.slice(0, max - 1)}…`
}

export function slugify(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
