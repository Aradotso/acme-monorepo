# acme-monorepo

## Text formatting utilities

- `capitalize(s: string): string` uppercases the first character. Example: `capitalize('hello')` returns `'Hello'`.
- `truncate(s: string, max: number): string` shortens a string to `max` characters and adds an ellipsis when shortened. Example: `truncate('Hello world', 8)` returns `'Hello w…'`.
- `slugify(s: string): string` lowercases and hyphenates text for use in a URL. Example: `slugify('Hello, World!')` returns `'hello-world'`.
