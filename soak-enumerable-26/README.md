# soak-enumerable-26

Small Unicode-aware string utilities with no runtime dependencies. The module exports exactly six functions from [`index.ts`](./index.ts):

- [`slugify`](./index.ts#L7) — produce lowercase, hyphen-separated identifiers.
- [`titleCase`](./index.ts#L19) — capitalize each whitespace-delimited word.
- [`truncate`](./index.ts#L34) — cap Unicode strings with an ellipsis.
- [`wordCount`](./index.ts#L47) — count Unicode word-like runs.
- [`stripHtml`](./index.ts#L58) — remove markup and executable blocks.
- [`escapeRegExp`](./index.ts#L73) — escape regex metacharacters for literal matching.

Run the unit tests with:

```sh
npm test
```

The tests cover empty input, Unicode input, and an adversarial input for every function.
