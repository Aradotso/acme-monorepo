# soak-enumerable-1

Small Unicode-aware string utilities. The implementation is in [`index.ts`](./index.ts), with Vitest coverage in [`index.test.ts`](./index.test.ts).

Exports:

1. `slugify(input)` — creates a lowercase, hyphen-separated identifier while retaining Unicode letters and numbers.
2. `titleCase(input)` — capitalizes Unicode words while preserving whitespace and punctuation.
3. `truncate(input, length, omission?)` — limits Unicode code points, counting the omission string in the limit.
4. `wordCount(input)` — counts words containing letters or numbers, including internal apostrophes and hyphens.
5. `stripHtml(input)` — removes comments, tags, and script/style contents without decoding entities.
6. `escapeRegExp(input)` — escapes regular-expression syntax so input can be matched literally.

Run the tests from the repository root with `npm test`.
