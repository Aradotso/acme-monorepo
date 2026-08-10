import { describe, expect, test } from 'bun:test';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from '../index';

describe('slugify', () => {
  test('handles empty input', () => expect(slugify('')).toBe(''));
  test('preserves unicode letters and normalizes accents', () => expect(slugify('Crème brûlée 東京')).toBe('creme-brulee-東京'));
  test('neutralizes adversarial separators and markup', () => expect(slugify('  <script>alert(1)</script> -- DROP TABLE;  ')).toBe('script-alert-1-script-drop-table'));
});

describe('titleCase', () => {
  test('handles empty input', () => expect(titleCase('')).toBe(''));
  test('handles unicode casing', () => expect(titleCase('élan vital déjà vu')).toBe('Élan Vital Déjà Vu'));
  test('does not split astral word initials', () => expect(titleCase('😀hello')).toBe('😀hello'));
  test('collapses adversarial whitespace', () => expect(titleCase('  hello\n\tWORLD  ')).toBe('Hello World'));
});

describe('truncate', () => {
  test('handles empty input', () => expect(truncate('', 4)).toBe(''));
  test('does not split unicode emoji', () => expect(truncate('A😀BC', 3)).toBe('A😀…'));
  test('handles hostile limits and custom markers', () => {
    expect(truncate('sensitive content', -1)).toBe('');
    expect(truncate('abcdef', 2, '...')).toBe('..');
  });
});

describe('wordCount', () => {
  test('handles empty input', () => expect(wordCount('')).toBe(0));
  test('counts unicode words', () => expect(wordCount('こんにちは 世界')).toBe(2));
  test('does not execute or interpret adversarial text', () => expect(wordCount('<img src=x onerror=alert(1)>')).toBe(3));
});

describe('stripHtml', () => {
  test('handles empty input', () => expect(stripHtml('')).toBe(''));
  test('preserves unicode text', () => expect(stripHtml('<p>こんにちは&nbsp;世界</p>')).toBe('こんにちは&nbsp;世界'));
  test('removes multiline adversarial tags without executing content', () => expect(stripHtml('<script>\nalert(1)\n</script>safe')).toBe('\nalert(1)\nsafe'));
});

describe('escapeRegExp', () => {
  test('handles empty input', () => expect(escapeRegExp('')).toBe(''));
  test('preserves unicode literals', () => expect(escapeRegExp('café 東京')).toBe('café 東京'));
  test('escapes an adversarial regex payload', () => {
    const literal = '.*+?^${}()|[]\\-';
    expect(new RegExp(`^${escapeRegExp(literal)}$`, 'u').test(literal)).toBe(true);
  });
});
