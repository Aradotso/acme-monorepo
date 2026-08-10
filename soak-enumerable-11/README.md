# soak-enumerable-11

Small Unicode-aware TypeScript string utilities. The implementation is in [`index.ts`](./index.ts), with Bun tests in [`test/index.test.ts`](./test/index.test.ts).

## API

- `slugify(value)` — creates a lowercase, dash-separated slug while retaining Unicode letters and numbers.
- `titleCase(value)` — trims, normalizes whitespace, and capitalizes each word.
- `truncate(value, limit, omission?)` — limits text by Unicode code points and appends an omission marker when needed.
- `wordCount(value)` — counts runs of non-whitespace characters.
- `stripHtml(value)` — removes tag-shaped markup but does not decode entities or sanitize content.
- `escapeRegExp(value)` — escapes regex metacharacters so the value can be matched literally.

Every function documents its edge cases in source comments, and each has tests for empty input, Unicode input, and adversarial input.

Run the tests from the repository root:

```sh
bun test soak-enumerable-11/test/index.test.ts
```
