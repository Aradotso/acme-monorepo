import { describe, expect, it } from 'vitest';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from './index';

describe('slugify', () => {
  it('handles empty input', () => expect(slugify('')).toBe(''));
  it('folds Unicode accents', () => expect(slugify('Crème brûlée')).toBe('creme-brulee'));
  it('removes adversarial punctuation and separators', () => expect(slugify(' --DROP-- TABLE; -- ')).toBe('drop-table'));
});

describe('titleCase', () => {
  it('handles empty input', () => expect(titleCase('')).toBe(''));
  it('capitalizes Unicode letters', () => expect(titleCase('élan vital 東京')).toBe('Élan Vital 東京'));
  it('does not alter letters after punctuation inside words', () => expect(titleCase("don't <script>alert('x')</script>")).toBe("Don't <script>alert('x')</script>"));
});

describe('truncate', () => {
  it('handles empty input', () => expect(truncate('', 4)).toBe(''));
  it('does not split an emoji', () => expect(truncate('A😀BC', 2)).toBe('A…'));
  it('handles a suffix longer than the limit', () => expect(truncate('abcdef', 2, '[cut]')).toBe('[c'));
});

describe('wordCount', () => {
  it('handles empty input', () => expect(wordCount('')).toBe(0));
  it('counts words across scripts', () => expect(wordCount('Hello 世界')).toBe(2));
  it('ignores punctuation and emoji', () => expect(wordCount('!!! 👩‍💻 ...')).toBe(0));
});

describe('stripHtml', () => {
  it('handles empty input', () => expect(stripHtml('')).toBe(''));
  it('retains Unicode text', () => expect(stripHtml('<p>こんにちは</p>')).toBe('こんにちは'));
  it('removes comments and executable blocks', () => expect(stripHtml('<script>alert(1)</script><!-- secret --><b>safe</b>')).toBe('safe'));
});

describe('escapeRegExp', () => {
  it('handles empty input', () => expect(escapeRegExp('')).toBe(''));
  it('leaves Unicode text intact', () => expect(escapeRegExp('café')).toBe('café'));
  it('escapes every regex metacharacter', () => expect(escapeRegExp('.*+?^${}()|[]\\/')).toBe('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\/'));
});
