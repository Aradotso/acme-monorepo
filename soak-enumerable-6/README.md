# soak-enumerable-6

A dependency-free TypeScript module of six small text utilities. The implementation is in [`index.ts`](./index.ts), with unit tests in [`index.test.ts`](./index.test.ts).

## API

- [`slugify(input)`](./index.ts) — makes a lowercase, hyphen-separated identifier while retaining Unicode letters and numbers.
- [`titleCase(input)`](./index.ts) — uppercases the first Unicode letter after each whitespace boundary.
- [`truncate(input, maxLength, ellipsis?)`](./index.ts) — limits text by Unicode code point and adds an ellipsis when needed.
- [`wordCount(input)`](./index.ts) — counts runs beginning with a Unicode letter or number.
- [`stripHtml(input)`](./index.ts) — removes comments, script/style blocks, and HTML-like tags without evaluating them.
- [`escapeRegExp(input)`](./index.ts) — escapes regex metacharacters for literal matching.

Run the tests from this directory with Node 24 or newer:

```sh
node --experimental-strip-types --test index.test.ts
```
