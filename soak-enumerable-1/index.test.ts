import { describe, expect, it } from 'vitest';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from './index';

describe('slugify', () => {
  it.each(['', '!!!'])('handles empty or punctuation-only input: %s', (input) => expect(slugify(input)).toBe(''));
  it('folds unicode accents and retains other scripts', () => expect(slugify('Crème brûlée 東京')).toBe('creme-brulee-東京'));
  it('does not allow hostile separator runs to create leading or trailing separators', () => expect(slugify(' --- DROP TABLE; -- ')).toBe('drop-table'));
});

describe('titleCase', () => {
  it('handles empty input', () => expect(titleCase('')).toBe(''));
  it('handles unicode words and preserves punctuation', () => expect(titleCase('élan über café')).toBe('Élan Über Café'));
  it('treats markup-looking input as text rather than executing or removing it', () => expect(titleCase('<script>alert(1)</script>')).toBe('<Script>Alert(1)</Script>'));
});

describe('truncate', () => {
  it('handles empty input and zero length', () => { expect(truncate('', 5)).toBe(''); expect(truncate('abc', 0)).toBe(''); });
  it('does not split unicode surrogate pairs', () => expect(truncate('😀😀abc', 3)).toBe('😀😀…'));
  it('handles an adversarial tiny limit without exceeding it', () => expect(truncate('attack', 1)).toBe('…'));
});

describe('wordCount', () => {
  it('handles empty input', () => expect(wordCount('')).toBe(0));
  it('counts unicode words', () => expect(wordCount('你好 мир café')).toBe(3));
  it('ignores emoji and hostile punctuation', () => expect(wordCount('!!! 😀 hello ... ok')).toBe(2));
});

describe('stripHtml', () => {
  it('handles empty input', () => expect(stripHtml('')).toBe(''));
  it('preserves unicode text and decodes common entities', () => expect(stripHtml('<p>你好 &amp; café</p>')).toBe('你好 & café'));
  it('removes executable script blocks as well as tags', () => expect(stripHtml('<script>alert(1)</script><b>safe</b><!-- hidden -->')).toBe('safe'));
});

describe('escapeRegExp', () => {
  it('handles empty input', () => expect(escapeRegExp('')).toBe(''));
  it('preserves unicode literals', () => expect(escapeRegExp('café 😀')).toBe('café 😀'));
  it('escapes an adversarial pattern into a safe literal', () => {
    const literal = '.*+?^${}()|[]\\';
    expect(new RegExp(escapeRegExp(literal)).test(literal)).toBe(true);
  });
});
