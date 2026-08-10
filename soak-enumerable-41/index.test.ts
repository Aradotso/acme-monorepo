import assert from 'node:assert/strict';
import test from 'node:test';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from './index.js';

test('slugify handles empty, Unicode, and separator injection', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify('Crème brûlée 東京'), 'creme-brulee-東京');
  assert.equal(slugify('किताब'), 'किताब');
  assert.equal(slugify('  hello///DROP TABLE users;  '), 'hello-drop-table-users');
});

test('titleCase handles empty, Unicode, and hostile spacing', () => {
  assert.equal(titleCase(''), '');
  assert.equal(titleCase('élan 東京 café'), 'Élan 東京 Café');
  assert.equal(titleCase('  <script>alert(1)</script>  two\twords'), '  <script>alert(1)</script>  Two\tWords');
});

test('truncate handles empty, Unicode, and tiny limits', () => {
  assert.equal(truncate('', 4), '');
  assert.equal(truncate('你好世界', 3), '你好…');
  assert.equal(truncate('😀😀😀', 2), '😀…');
  assert.equal(truncate('abcdef', 0), '');
});

test('wordCount handles empty, Unicode, and regex-looking input', () => {
  assert.equal(wordCount(''), 0);
  assert.equal(wordCount('Привет мир 東京'), 3);
  assert.equal(wordCount('किताब पढ़ना'), 2);
  assert.equal(wordCount("hello ' OR 1=1 -- <script>"), 5);
});

test('stripHtml handles empty, Unicode, and script/comment payloads', () => {
  assert.equal(stripHtml(''), '');
  assert.equal(stripHtml('<p>こんにちは</p> — café'), 'こんにちは — café');
  assert.equal(stripHtml('safe<!-- <img src=x onerror=alert(1)> --><script>alert(1)</script>'), 'safealert(1)');
});

test('escapeRegExp handles empty, Unicode, and a complete metacharacter payload', () => {
  assert.equal(escapeRegExp(''), '');
  assert.equal(escapeRegExp('café 東京'), 'café 東京');
  const input = String.raw`.*+?^\${}()|[]\\/`;
  const escaped = escapeRegExp(input);
  assert.equal(new RegExp(escaped).test(input), true);
  assert.equal(new RegExp(`^${escaped}$`).test(input), true);
});
