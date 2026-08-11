# soak-enumerable-10

Small Unicode-aware string helpers. The implementation is in [`index.ts`](./index.ts), and the unit tests are in [`index.test.ts`](./index.test.ts).

## API

- `slugify(input)` — normalizes text into a lowercase hyphen-separated slug.
- `titleCase(input)` — uppercases the first letter after each whitespace boundary.
- `truncate(input, maxLength, suffix?)` — limits Unicode code points and appends a suffix when needed.
- `wordCount(input)` — counts Unicode word-like segments, excluding punctuation and emoji.
- `stripHtml(input)` — removes comments, script/style blocks, and HTML tags.
- `escapeRegExp(input)` — escapes regex metacharacters for literal matching.

Each function documents its edge cases in its source doc comment. Tests cover empty input, Unicode input, and adversarial input for every function.
