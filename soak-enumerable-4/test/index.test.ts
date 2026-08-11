import { describe, expect, it } from 'vitest';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from '../src/index.js';

describe('slugify', () => {
  it.each([
    ['', ''],
    ['Crème brûlée — 東京', 'creme-brulee-東京'],
    ['../../etc/passwd<script>alert(1)</script>', 'etc-passwd-script-alert-1-script'],
  ])('handles %j', (input, expected) => expect(slugify(input)).toBe(expected));
});

describe('titleCase', () => {
  it.each([
    ['', ''],
    ['  déjà vu 東京  ', 'Déjà Vu 東京'],
    ['<script>alert("xss")</script>', '<script>alert("xss")</script>'],
  ])('handles %j', (input, expected) => expect(titleCase(input)).toBe(expected));
});

describe('truncate', () => {
  it.each([
    ['', 4, '…', ''],
    ['naïve café 🚀', 9, '…', 'naïve ca…'],
    ['DROP TABLE users; --', 0, '…', ''],
  ])('handles %j', (input, length, ellipsis, expected) => expect(truncate(input, length, ellipsis)).toBe(expected));
  it('does not split surrogate pairs', () => expect(truncate('hello 🚀', 6)).toBe('hello…'));
});

describe('wordCount', () => {
  it.each([
    ['', 0],
    ['こんにちは мир café', 3],
    ['... -- !!!', 0],
    ["state-of-the-art can't fail", 3],
  ])('handles %j', (input, expected) => expect(wordCount(input)).toBe(expected));
});

describe('stripHtml', () => {
  it.each([
    ['', ''],
    ['<p>こんにちは <strong>世界</strong></p>', 'こんにちは 世界'],
    ['<!-- drop --><img src=x onerror=alert(1)>safe', 'safe'],
  ])('handles %j', (input, expected) => expect(stripHtml(input)).toBe(expected));
});

describe('escapeRegExp', () => {
  it.each([
    ['', ''],
    ['café 🚀', 'café 🚀'],
    ['\\.^$*+?()[]{}|', String.raw`\\\.\^\$\*\+\?\(\)\[\]\{\}\|`],
  ])('handles %j', (input, expected) => expect(escapeRegExp(input)).toBe(expected));
  it('creates a literal matcher for adversarial text', () => {
    const value = '.*(a|b)\\d+';
    expect(new RegExp(`^${escapeRegExp(value)}$`).test(value)).toBe(true);
  });
});
