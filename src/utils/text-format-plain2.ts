export function capitalize(s: string): string {
  const characters = Array.from(s);
  return characters.length === 0 ? s : characters[0].toUpperCase() + characters.slice(1).join("");
}

export function truncate(s: string, max: number): string {
  const ellipsis = "…";
  const characters = Array.from(s);
  if (characters.length <= max) return s;
  if (max <= 0) return "";
  return characters.slice(0, max - ellipsis.length).join("") + ellipsis;
}

export function slugify(s: string): string {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
