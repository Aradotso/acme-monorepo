# soak-enumerable-1

Small, dependency-free TypeScript string utilities. The public module is [`index.ts`](./index.ts), which exports exactly six functions:

- [`slugify`](./index.ts#L7) — normalize text into a lowercase, hyphen-separated slug.
- [`titleCase`](./index.ts#L19) — capitalize whitespace-delimited words.
- [`truncate`](./index.ts#L37) — cap Unicode text at a code-point length with an optional suffix.
- [`wordCount`](./index.ts#L49) — count whitespace-delimited words.
- [`stripHtml`](./index.ts#L58) — remove HTML comments and tags while retaining text.
- [`escapeRegExp`](./index.ts#L70) — escape regex metacharacters for literal matching.

Run the unit tests with:

```sh
npm install
npm test
```

The tests cover empty input, Unicode input, and an adversarial input for every function.
