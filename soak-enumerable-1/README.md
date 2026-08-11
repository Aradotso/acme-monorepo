# Soak Enumerable 1

Small TypeScript string utilities with Unicode-aware behavior and adversarial-input tests.

## API index

- [`slugify`](./index.ts#L8): creates a lowercase, hyphen-separated identifier.
- [`titleCase`](./index.ts#L20): capitalizes words while preserving punctuation and whitespace.
- [`truncate`](./index.ts#L32): limits text by Unicode code points and appends an ellipsis.
- [`wordCount`](./index.ts#L45): counts Unicode letter/number runs.
- [`stripHtml`](./index.ts#L55): removes markup, comments, scripts, and common entities.
- [`escapeRegExp`](./index.ts#L72): escapes a string for literal use in a regular expression.

Run the unit tests from this directory with `npm install` followed by `npm test`.
