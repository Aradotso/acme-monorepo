import { describe, expect, it } from 'vitest';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from './index';

describe('slugify', () => {
  it.each([
    ['', ''],
    ['Crème brûlée 東京', 'creme-brulee-東京'],
    ['a---b<script>alert(1)</script>', 'a-b-script-alert-1-script'],
  ])('handles %j', (input, expected) => expect(slugify(input)).toBe(expected));
});

describe('titleCase', () => {
  it.each([
    ['', ''],
    ['élan vital 東京', 'Élan Vital 東京'],
    ["  hELLO,world!\ncan't STOP", "  Hello,World!\nCan'T Stop"],
  ])('handles %j', (input, expected) => expect(titleCase(input)).toBe(expected));
});

describe('truncate', () => {
  it.each([
    ['', 3, '…', ''],
    ['你好世界', 3, '…', '你好…'],
    ['password🔒-with-attacker-input', 10, '...', 'passwor...'],
  ])('handles %j', (input, length, omission, expected) => expect(truncate(input, length, omission)).toBe(expected));
  it('rejects negative lengths', () => expect(() => truncate('x', -1)).toThrow(RangeError));
});

describe('wordCount', () => {
  it.each([
    ['', 0],
    ['Café 東京 123', 3],
    ["one--two\nthree!!!", 3],
  ])('handles %j', (input, expected) => expect(wordCount(input)).toBe(expected));
});

describe('stripHtml', () => {
  it.each([
    ['', ''],
    ['<p>こんにちは&nbsp;世界</p>', 'こんにちは&nbsp;世界'],
    ['<p>safe</p><!-- leak --><script>alert("xss")</script><style>.x{}</style>', 'safe'],
  ])('handles %j', (input, expected) => expect(stripHtml(input)).toBe(expected));
});

describe('escapeRegExp', () => {
  it.each([
    ['', ''],
    ['café 東京', 'café 東京'],
    ['.*+?^${}()|[]\\/-\n', '\\.…?'],
  ])('escapes %j', (input) => {
    const escaped = escapeRegExp(input);
    expect(new RegExp(`^${escaped}$`).test(input)).toBe(true);
    expect(escaped).not.toContain('.*');
  });
});
