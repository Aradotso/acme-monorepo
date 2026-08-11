import { describe, expect, it } from 'vitest';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from './index.js';

describe('slugify', () => {
  it.each([
    ['', ''],
    ['Crème brûlée — 東京', 'creme-brulee-東京'],
    ['   <script>alert(1)</script> !!! ', 'script-alert-1-script'],
  ])('handles %j', (input, expected) => expect(slugify(input)).toBe(expected));
});

describe('titleCase', () => {
  it.each([
    ['', ''],
    ['élan 東京', 'Élan 東京'],
    ["  hELLO—wORLD o'NEIL ", "  Hello—World O'Neil "],
  ])('handles %j', (input, expected) => expect(titleCase(input)).toBe(expected));
});

describe('truncate', () => {
  it.each([
    ['', 4, '…', ''],
    ['café 😀', 5, '…', 'café…'],
    ['abcdef', 1, '…', '…'],
  ])('handles %j', (input, limit, ellipsis, expected) => expect(truncate(input, limit, ellipsis)).toBe(expected));
});

describe('wordCount', () => {
  it.each([
    ['', 0],
    ['Привет мир 東京', 3],
    ['<script>alert(1)</script> -- !!!', 4],
  ])('handles %j', (input, expected) => expect(wordCount(input)).toBe(expected));
});

describe('stripHtml', () => {
  it.each([
    ['', ''],
    ['<p>你好 <strong>世界</strong></p>', '你好 世界'],
    ['<div>safe</div><script>document.body.innerHTML = "pwned"</script><!-- hidden -->', 'safe'],
  ])('handles %j', (input, expected) => expect(stripHtml(input)).toBe(expected));
});

describe('escapeRegExp', () => {
  it.each([
    ['', ''],
    ['café 東京', 'café 東京'],
    ['^$.*+?()[]{}|\\/-', '\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\\\/\\-'],
  ])('handles %j', (input, expected) => expect(escapeRegExp(input)).toBe(expected));

  it('creates a literal pattern for adversarial input', () => {
    const input = '.*(a+)+$';
    expect(new RegExp(`^${escapeRegExp(input)}$`).test(input)).toBe(true);
  });
});
