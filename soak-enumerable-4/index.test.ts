import { describe, expect, it } from 'vitest';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from './index';

describe('slugify', () => {
  it.each([['', ''], ['   !!! ', '']])('handles empty/separator-only input: %j', (input, expected) => expect(slugify(input)).toBe(expected));
  it('folds accents and retains Unicode letters', () => expect(slugify('Crème brûlée 東京')).toBe('creme-brulee-東京'));
  it('collapses hostile punctuation and whitespace', () => expect(slugify(' --DROP TABLE-- <script>alert(1)</script> ')).toBe('drop-table-script-alert-1-script'));
});

describe('titleCase', () => {
  it.each([['', ''], [' \n\t ', '']])('handles empty/whitespace input: %j', (input, expected) => expect(titleCase(input)).toBe(expected));
  it('handles Unicode casing', () => expect(titleCase('élan 東京')).toBe('Élan 東京'));
  it('normalizes hostile repeated whitespace without evaluating content', () => expect(titleCase('  hELLO\u0000  world<script>  ')).toBe('Hello\u0000 World<script>'));
});

describe('truncate', () => {
  it.each([['', 0, ''], ['hello', 10, 'hello']])('handles empty or non-truncating input', (input, limit, expected) => expect(truncate(input, limit)).toBe(expected));
  it('does not split Unicode surrogate pairs', () => expect(truncate('😀 café', 5)).toBe('😀 ...'));
  it('rejects invalid limits and handles tiny limits', () => {
    expect(() => truncate('secret', -1)).toThrow(RangeError);
    expect(truncate('secret', 2)).toBe('..');
  });
});

describe('wordCount', () => {
  it.each([['', 0], ['   ... --- ', 0]])('handles empty and punctuation-only input: %j', (input, expected) => expect(wordCount(input)).toBe(expected));
  it('counts words in multiple scripts', () => expect(wordCount('Olá мир 世界 42')).toBe(4));
  it('does not count markup punctuation as words', () => expect(wordCount('DROP TABLE; --')).toBe(2));
});

describe('stripHtml', () => {
  it.each([['', ''], ['<!-- only -->', '']])('handles empty and comment-only input: %j', (input, expected) => expect(stripHtml(input)).toBe(expected));
  it('keeps Unicode text and entities', () => expect(stripHtml('<p>café &amp; 東京</p>')).toBe('café &amp; 東京'));
  it('removes comments and executable blocks', () => expect(stripHtml('<div>Hello</div><!-- hide --><script>alert(1)</script><style>x{}</style>')).toBe('Hello'));
});

describe('escapeRegExp', () => {
  it.each([['', ''], ['plain', 'plain']])('handles empty and literal input: %j', (input, expected) => expect(escapeRegExp(input)).toBe(expected));
  it('escapes Unicode-containing literals', () => expect(new RegExp(escapeRegExp('café 東京')).test('café 東京')).toBe(true));
  it('escapes every regex metacharacter', () => {
    const literal = String.raw`[a-z]+(safe)?^$\\.`;
    expect(new RegExp(`^${escapeRegExp(literal)}$`).test(literal)).toBe(true);
  });
});

it('exports exactly the requested six functions', async () => {
  const module = await import('./index');
  expect(Object.keys(module).sort()).toEqual(['escapeRegExp', 'slugify', 'stripHtml', 'titleCase', 'truncate', 'wordCount']);
});
