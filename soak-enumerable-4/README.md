# soak-enumerable-4

Small TypeScript string utilities. The implementation is in [`src/index.ts`](src/index.ts), and each exported function has unit tests in [`test/index.test.ts`](test/index.test.ts).

## API

- [`slugify`](src/index.ts): make a lowercase, hyphen-separated identifier.
- [`titleCase`](src/index.ts): capitalize words while normalizing whitespace.
- [`truncate`](src/index.ts): limit Unicode text with an ellipsis.
- [`wordCount`](src/index.ts): count Unicode words, including internal apostrophes and hyphens.
- [`stripHtml`](src/index.ts): remove comments and tags while preserving text.
- [`escapeRegExp`](src/index.ts): quote regex metacharacters for literal matching.

## Development

From this directory, run `npm test` for the Vitest suite and `npm run typecheck` for TypeScript validation.
