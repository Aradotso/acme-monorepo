import { describe, expect, it } from 'vitest';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from '../src/index.js';

describe('slugify', () => {
  it.each([
    ['', ''],
    [' Привет, мир! ', 'привет-мир'],
    ['../../etc/passwd<script>', 'etc-passwd-script'],
  ])('handles %j', (input, expected) => expect(slugify(input)).toBe(expected));
});

describe('titleCase', () => {
  it.each([
    ['', ''],
    ['  Καλημέρα   κόσμε ', 'Καλημέρα Κόσμε'],
    ['<script>alert(1)</script>', '<script>alert(1)</script>'],
  ])('handles %j', (input, expected) => expect(titleCase(input)).toBe(expected));
});

describe('truncate', () => {
  it.each([
    ['', 5, ''],
    ['你好世界', 4, '你好世界'],
    ['<img src=x onerror=alert(1)>', 10, '<img sr...'],
    ['abcdef', 2, 'ab'],
  ])('handles %j at %d', (input, limit, expected) => expect(truncate(input, limit)).toBe(expected));
});

describe('wordCount', () => {
  it.each([
    ['', 0],
    ['こんにちは 世界', 2],
    ['one\n\t two  <script>alert(1)</script>', 3],
  ])('handles %j', (input, expected) => expect(wordCount(input)).toBe(expected));
});

describe('stripHtml', () => {
  it.each([
    ['', ''],
    ['<p>你好，世界</p>', '你好，世界'],
    ['<script>alert("xss")</script><!-- hidden -->safe', 'alert("xss")safe'],
  ])('handles %j', (input, expected) => expect(stripHtml(input)).toBe(expected));
});

describe('escapeRegExp', () => {
  it.each([
    ['', ''],
    ['café 漢字', 'café 漢字'],
    ['.*+?^${}()|[]\\', '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\'],
  ])('handles %j', (input, expected) => {
    expect(escapeRegExp(input)).toBe(expected);
    expect(new RegExp(escapeRegExp(input)).test(input)).toBe(true);
  });
});
