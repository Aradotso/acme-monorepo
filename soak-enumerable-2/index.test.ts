import { describe, expect, it } from 'vitest';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from './index';

describe('slugify', () => {
  it.each([
    ['', ''],
    ['Crème brûlée 東京', 'creme-brulee-東京'],
    ['---a___b!!!', 'a-b'],
  ])('handles %j', (input, expected) => expect(slugify(input)).toBe(expected));
});

describe('titleCase', () => {
  it.each([
    ['', ''],
    ['élan vital 東京', 'Élan Vital 東京'],
    ['  hello\nworld!!!', '  Hello\nWorld!!!'],
  ])('handles %j', (input, expected) => expect(titleCase(input)).toBe(expected));
});

describe('truncate', () => {
  it.each([
    ['', ''],
    ['東京駅', '東京駅'],
    ['🧪🧪🧪', '🧪…'],
  ])('handles %j', (input, expected) => expect(truncate(input, input === '🧪🧪🧪' ? 2 : 10)).toBe(expected));
  it('handles a limit smaller than the suffix', () => expect(truncate('abcdef', 1, '...')).toBe('.'));
});

describe('wordCount', () => {
  it.each([
    ['', 0],
    ['こんにちは 世界', 2],
    ['... -- !!!', 0],
  ])('handles %j', (input, expected) => expect(wordCount(input)).toBe(expected));
});

describe('stripHtml', () => {
  it.each([
    ['', ''],
    ['<p>Привет <strong>世界</strong></p>', 'Привет 世界'],
    ['<script>alert(1)</script><p>safe</p>', 'safe'],
  ])('handles %j', (input, expected) => expect(stripHtml(input)).toBe(expected));
});

describe('escapeRegExp', () => {
  it.each([
    ['', ''],
    ['café 東京', 'café 東京'],
    ['.*+?^${}()|[]\\', '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\'],
  ])('handles %j', (input, expected) => expect(escapeRegExp(input)).toBe(expected));
  it('makes adversarial text literal', () => {
    const value = 'a.*[b]';
    expect(new RegExp(`^${escapeRegExp(value)}$`).test(value)).toBe(true);
    expect(new RegExp(`^${escapeRegExp(value)}$`).test('axxb')).toBe(false);
  });
});
