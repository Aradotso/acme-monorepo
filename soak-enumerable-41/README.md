# soak-enumerable-41

Small Unicode-aware string utilities. The implementation is in [`index.ts`](./index.ts), with unit coverage in [`index.test.ts`](./index.test.ts).

## API

- [`slugify`](./index.ts#L8) — normalize text into a lowercase hyphenated slug.
- [`titleCase`](./index.ts#L18) — capitalize letters beginning whitespace-delimited words.
- [`truncate`](./index.ts#L29) — limit text by Unicode code points with an ellipsis.
- [`wordCount`](./index.ts#L43) — count Unicode words, including internal apostrophes and hyphens.
- [`stripHtml`](./index.ts#L54) — remove comments and tags without evaluating markup.
- [`escapeRegExp`](./index.ts#L64) — escape regular-expression metacharacters for literal matching.

## Test

```sh
npm test
```
