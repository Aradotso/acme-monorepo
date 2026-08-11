# soak-enumerable-2

Small dependency-free TypeScript string utilities. The implementation is in [`index.ts`](./index.ts), with unit tests in [`index.test.ts`](./index.test.ts).

## API

- [`slugify`](./index.ts#L7): normalize text into a kebab-case identifier.
- [`titleCase`](./index.ts#L20): capitalize words while preserving whitespace and punctuation.
- [`truncate`](./index.ts#L31): limit text by Unicode code points with an optional suffix.
- [`wordCount`](./index.ts#L48): count Unicode letter/number word runs.
- [`stripHtml`](./index.ts#L59): remove tags and script/style content.
- [`escapeRegExp`](./index.ts#L73): escape regex metacharacters for literal matching.

Run the tests from the repository root with `npm test`.
