# soak-enumerable-2

Small Unicode-aware string utilities with no runtime dependencies.

## API

- [`slugify`](./index.ts) — turns text into a lowercase hyphen-separated slug.
- [`titleCase`](./index.ts) — capitalizes words while preserving punctuation and spacing.
- [`truncate`](./index.ts) — limits Unicode-safe string length with an ellipsis.
- [`wordCount`](./index.ts) — counts Unicode words and contractions.
- [`stripHtml`](./index.ts) — removes HTML-like markup, comments, and executable blocks.
- [`escapeRegExp`](./index.ts) — escapes text for literal regular-expression matching.

Run the unit tests from this directory with `npm test`.
