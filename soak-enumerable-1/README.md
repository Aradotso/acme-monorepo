# Soak Enumerable 1

Small TypeScript string utilities. The implementation is in [`index.ts`](./index.ts), and each exported function has unit tests in [`index.test.ts`](./index.test.ts).

## API

- [`slugify`](./index.ts#L7): make a lowercase, hyphen-separated identifier while preserving Unicode letters and numbers.
- [`titleCase`](./index.ts#L19): capitalize each whitespace-delimited word.
- [`truncate`](./index.ts#L34): cap a string by Unicode code points with an ellipsis.
- [`wordCount`](./index.ts#L49): count non-whitespace runs.
- [`stripHtml`](./index.ts#L59): remove tags and decode common HTML entities.
- [`escapeRegExp`](./index.ts#L74): escape text for literal use in a regular expression.

Run the tests from the repository root with `npm test`.
