# px-e1-large

A dependency-light TypeScript string utility library. Every utility is Unicode-aware where length or character iteration matters, and each function documents its edge-case behavior in `src/index.ts`.

## API index

- `slugify`: `slugify('Crème brûlée') // 'creme-brulee'`
- `titleCase`: `titleCase('hello WORLD') // 'Hello World'`
- `truncate`: `truncate('Long text', 6) // 'Long …'`
- `wordCount`: `wordCount('hello 世界') // 2`
- `stripHtml`: `stripHtml('<p>Hello</p>') // 'Hello'`
- `escapeRegExp`: `new RegExp(escapeRegExp('a.b')) // /a\\.b/`
- `camelCase`: `camelCase('hello-world') // 'helloWorld'`
- `snakeCase`: `snakeCase('helloWorld') // 'hello_world'`
- `kebabCase`: `kebabCase('helloWorld') // 'hello-world'`
- `padCenter`: `padCenter('hi', 6, '-') // '--hi--'`
- `wrapText`: `wrapText('one two three', 7) // ['one two', 'three']`
- `levenshtein`: `levenshtein('kitten', 'sitting') // 3`
- `longestCommonPrefix`: `longestCommonPrefix('flower', 'flow') // 'flow'`
- `isPalindrome`: `isPalindrome('racecar') // true`
- `templateFill`: `templateFill('Hello, {{name}}!', { name: 'Ada' }) // 'Hello, Ada!'`

## Development

From this directory, run `npm install`, `npm test`, and `npm run typecheck`.

The test suite includes empty input, Unicode input, and adversarial edge cases for every exported function.
