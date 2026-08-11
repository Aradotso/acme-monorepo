# soak-enumerable-3

Small, dependency-free TypeScript string utilities. The public module is
[`index.ts`](./index.ts), which exports exactly these six functions:

- `slugify(input)`: creates a normalized, Unicode-friendly URL slug.
- `titleCase(input)`: capitalizes whitespace-delimited words.
- `truncate(input, maxLength)`: shortens text by Unicode code points with `…`.
- `wordCount(input)`: counts non-empty whitespace-delimited words.
- `stripHtml(input)`: removes markup, comments, and script/style blocks.
- `escapeRegExp(input)`: escapes RegExp syntax for literal matching.

Run the unit tests from this directory with `npm test`.
