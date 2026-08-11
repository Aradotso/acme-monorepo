import { describe, expect, it } from 'vitest';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from './index';

describe('slugify', () => {
  it('handles empty input', () => expect(slugify('')).toBe(''));
  it('preserves Unicode letters and removes accents', () => expect(slugify(' Crème brûlée 東京 ')).toBe('creme-brulee-東京'));
  it('collapses adversarial separators and punctuation', () => expect(slugify('---hello---world!!!')).toBe('hello-world'));
});

describe('titleCase', () => {
  it('handles empty input', () => expect(titleCase('')).toBe(''));
  it('handles Unicode casing and preserves whitespace', () => expect(titleCase('élan über')).toBe('Élan Über'));
  it('does not execute or alter punctuation', () => expect(titleCase('alert(1) <b>ok</b>')).toBe('Alert(1) <b>ok</b>'));
});

describe('truncate', () => {
  it('handles empty input', () => expect(truncate('', 5)).toBe(''));
  it('does not split Unicode surrogate pairs', () => expect(truncate('你好世界', 3)).toBe('你好…'));
  it('handles hostile limits without looping or throwing', () => expect(truncate('secret', Number.MIN_SAFE_INTEGER)).toBe(''));
});

describe('wordCount', () => {
  it('handles empty input', () => expect(wordCount('')).toBe(0));
  it('counts Unicode words separated by Unicode whitespace', () => expect(wordCount('こんにちは\u00a0世界')).toBe(2));
  it('counts punctuation runs without interpreting them', () => expect(wordCount('... ???')).toBe(2));
});

describe('stripHtml', () => {
  it('handles empty input', () => expect(stripHtml('')).toBe(''));
  it('keeps Unicode text and decodes entities', () => expect(stripHtml('<p>你好 &amp; мир</p>')).toBe('你好 & мир'));
  it('removes adversarial script and style content', () => expect(stripHtml('<script>alert(1)</script><style>.x{}</style><b>safe</b>')).toBe('safe'));
});

describe('escapeRegExp', () => {
  it('handles empty input', () => expect(escapeRegExp('')).toBe(''));
  it('leaves Unicode text intact', () => expect(escapeRegExp('café 日本語')).toBe('café 日本語'));
  it('escapes every regular expression metacharacter', () => {
    const input = String.raw`^$\\.*+?()[]{}|/`;
    const escaped = escapeRegExp(input);
    expect(new RegExp(escaped).test(input)).toBe(true);
    expect(new RegExp(escaped).test('other')).toBe(false);
  });
});
