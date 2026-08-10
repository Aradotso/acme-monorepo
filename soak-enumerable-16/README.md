# soak-enumerable-16

Small, dependency-free TypeScript string utilities. The implementation is in [`index.ts`](./index.ts), with unit tests in [`index.test.ts`](./index.test.ts).

## API

- [`slugify`](./index.ts): create a lowercase, hyphen-separated identifier.
- [`titleCase`](./index.ts): capitalize the first letter of each word.
- [`truncate`](./index.ts): cap a string by Unicode code-point length.
- [`wordCount`](./index.ts): count Unicode word-like runs.
- [`stripHtml`](./index.ts): remove comments, tags, and script/style blocks.
- [`escapeRegExp`](./index.ts): escape text for literal regular-expression use.

Run the tests with `npm test` from this directory.
