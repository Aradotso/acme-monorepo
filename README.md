# acme-monorepo

## Text formatting utilities

The text formatting helpers in `src/utils/text-format-goal2.ts` are pure functions:

- `capitalize(s: string): string` — `capitalize("hello")` returns `"Hello"`.
- `truncate(s: string, max: number): string` — `truncate("Hello world", 8)` returns `"Hello w…"`.
- `slugify(s: string): string` — `slugify("Hello, World!")` returns `"hello-world"`.
