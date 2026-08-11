# soak-enumerable-7

Small, dependency-free TypeScript text utilities. The public module is
`src/index.ts`; it exports exactly these six functions:

- `slugify(input)`: normalize text into a lowercase, hyphen-delimited identifier.
- `titleCase(input)`: capitalize each whitespace-delimited word.
- `truncate(input, maxLength)`: cap Unicode-aware text length with `...`.
- `wordCount(input)`: count non-empty whitespace-delimited words.
- `stripHtml(input)`: remove HTML comments and tags while preserving text.
- `escapeRegExp(input)`: make text safe to use as a regular-expression literal.

Run the unit tests and typecheck with:

```sh
npm install
npm test
npm run typecheck
```

Tests cover empty input, Unicode input, and adversarial input for every utility.
