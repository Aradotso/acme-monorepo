import {
  escapeRegExp,
  slugify,
  stripHtml,
  titleCase,
  truncate,
  wordCount,
} from './index';

type Test = [string, () => void];

function equal(actual: unknown, expected: unknown): void {
  if (actual !== expected) throw new Error(`expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

const tests: Test[] = [
  ['slugify: empty', () => equal(slugify(''), '')],
  ['slugify: unicode', () => equal(slugify('Crème brûlée 東京'), 'creme-brulee-東京')],
  ['slugify: adversarial punctuation', () => equal(slugify('  <script>alert(1)</script>  '), 'script-alert-1-script')],
  ['titleCase: empty', () => equal(titleCase(''), '')],
  ['titleCase: unicode', () => equal(titleCase('élan 東京'), 'Élan 東京')],
  ['titleCase: adversarial whitespace', () => equal(titleCase('  HELLO\n\tworld!!!  '), 'Hello World!!!')],
  ['truncate: empty', () => equal(truncate('', 4), '')],
  ['truncate: unicode', () => equal(truncate('café 🚀', 5), 'café…')],
  ['truncate: adversarial short limit', () => equal(truncate('abcdef', 1, '...'), '.')],
  ['wordCount: empty', () => equal(wordCount(''), 0)],
  ['wordCount: unicode', () => equal(wordCount('日本語 café 🚀'), 3)],
  ['wordCount: adversarial whitespace', () => equal(wordCount('  one\u00a0two\nthree!!!  '), 3)],
  ['stripHtml: empty', () => equal(stripHtml(''), '')],
  ['stripHtml: unicode', () => equal(stripHtml('<p>こんにちは 🚀</p>'), 'こんにちは 🚀')],
  ['stripHtml: adversarial markup', () => equal(stripHtml('<!-- hidden --><img src=x onerror=alert(1)>safe'), 'safe')],
  ['escapeRegExp: empty', () => equal(escapeRegExp(''), '')],
  ['escapeRegExp: unicode', () => equal(escapeRegExp('café 🚀'), 'café 🚀')],
  ['escapeRegExp: adversarial pattern', () => equal(escapeRegExp('^a.*[b](c)?$'), '\\^a\\.\\*\\[b\\]\\(c\\)\\?\\$')],
];

for (const [name, test] of tests) {
  test();
  console.log(`ok - ${name}`);
}
console.log(`${tests.length} tests passed`);
