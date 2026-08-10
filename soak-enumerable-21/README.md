# soak-enumerable-21

A small TypeScript string utility module. The implementation is in [`index.ts`](./index.ts), with unit coverage in [`index.test.ts`](./index.test.ts).

## API

- [`slugify`](./index.ts#L8): normalize text into a lowercase, hyphen-separated slug.
- [`titleCase`](./index.ts#L20): capitalize Unicode words while normalizing whitespace.
- [`truncate`](./index.ts#L34): shorten text with a Unicode-safe ellipsis.
- [`wordCount`](./index.ts#L48): count whitespace-separated words.
- [`stripHtml`](./index.ts#L59): remove markup, comments, scripts, and styles and decode common entities.
- [`escapeRegExp`](./index.ts#L76): escape text for literal use in a regular expression.

## Tests

Run the tests with Node 22 or newer:

```sh
node --test soak-enumerable-21/index.test.ts
```
