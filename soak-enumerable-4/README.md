# soak-enumerable-4

Small TypeScript string utilities. The public module is [`index.ts`](./index.ts), which exports exactly six functions:

- `slugify(input)`: normalize text into a lowercase URL-style slug.
- `titleCase(input)`: capitalize whitespace-delimited words and normalize spacing.
- `truncate(input, maxLength)`: cap a string by Unicode code points with an ellipsis.
- `wordCount(input)`: count words containing Unicode letters or numbers.
- `stripHtml(input)`: remove comments, script/style blocks, and HTML tags.
- `escapeRegExp(input)`: escape regex metacharacters for literal matching.

Tests live in [`index.test.ts`](./index.test.ts) and cover empty input, Unicode input, and adversarial input for every function.
