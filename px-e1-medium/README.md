# Text utilities

This directory contains six dependency-free TypeScript text helpers. Each function works with Unicode strings and returns a new string or number without mutating its input.

## `slugify(input)`
Creates a lowercase, hyphen-separated slug. Accents are folded and non-Latin letters are retained.
```ts
slugify('Crème brûlée 東京'); // 'creme-brulee-東京'
```

## `titleCase(input)`
Capitalizes the first character of each whitespace-delimited word and normalizes the rest of each word.
```ts
titleCase('  hello WORLD  '); // 'Hello World'
```

## `truncate(input, maxLength, omission?)`
Limits text by Unicode code points. Long strings end with `…` by default, or with the supplied omission marker. `maxLength` must be a finite integer; invalid values throw `RangeError`.
```ts
truncate('A long description', 10); // 'A long de…'
truncate('A long description', 10, '...'); // 'A long ...'
```

## `wordCount(input)`
Counts runs of Unicode letters and numbers. Internal apostrophes and hyphens stay within one word.
```ts
wordCount("Don't panic, 東京!"); // 3
```

## `stripHtml(input)`
Removes comments, script/style blocks, and HTML tags while leaving their ordinary text content.
```ts
stripHtml('<p>Hello <strong>world</strong></p>'); // 'Hello world'
```
This is text extraction, not an HTML sanitizer; escape the result before inserting it into HTML.

## `escapeRegExp(input)`
Escapes JavaScript regular-expression metacharacters so input can be safely matched literally.
```ts
const pattern = new RegExp(`^${escapeRegExp(userInput)}$`);
```

All exports are available from `src/index.ts`.
