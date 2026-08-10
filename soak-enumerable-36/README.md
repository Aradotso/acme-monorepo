# soak-enumerable-36

A dependency-free TypeScript string utility module. The public API is indexed below:

- [`slugify`](./index.ts): creates lowercase, hyphen-separated identifiers while preserving Unicode letters and numbers.
- [`titleCase`](./index.ts): uppercases the first character after each whitespace boundary.
- [`truncate`](./index.ts): limits Unicode code points and appends an omission marker when required.
- [`wordCount`](./index.ts): counts runs of non-whitespace characters.
- [`stripHtml`](./index.ts): removes markup-looking tags and keeps their text content.
- [`escapeRegExp`](./index.ts): escapes JavaScript regular-expression metacharacters for literal matching.

Run the unit tests with Node 24 or newer:

```sh
node --experimental-strip-types --test tests.test.ts
```
