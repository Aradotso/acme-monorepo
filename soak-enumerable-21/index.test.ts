import assert from 'node:assert/strict';
import test from 'node:test';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from './index.ts';

test('slugify handles empty, unicode, and adversarial input', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify('Crème brûlée 東京'), 'creme-brulee-東京');
  assert.equal(slugify('---DROP TABLE!!!---'), 'drop-table');
});

test('titleCase handles empty, unicode, and adversarial input', () => {
  assert.equal(titleCase(''), '');
  assert.equal(titleCase('élan vital Καλημέρα'), 'Élan Vital Καλημέρα');
  assert.equal(titleCase('  <script>alert(1)</script> HELLO\tworld  '), '<script>alert(1)</script> Hello World');
});

test('truncate handles empty, unicode, and adversarial limits', () => {
  assert.equal(truncate('', 4), '');
  assert.equal(truncate('😀 café extra', 6), '😀 caf…');
  assert.equal(truncate('sensitive data', -10), '');
  assert.equal(truncate('abcdef', 1), '…');
});

test('wordCount handles empty, unicode, and adversarial spacing', () => {
  assert.equal(wordCount(''), 0);
  assert.equal(wordCount('你好 мир café'), 3);
  assert.equal(wordCount(' \t\n  \u00a0 '), 0);
});

test('stripHtml handles empty, unicode, and hostile markup', () => {
  assert.equal(stripHtml(''), '');
  assert.equal(stripHtml('<p>こんにちは &amp; мир</p>'), 'こんにちは & мир');
  assert.equal(stripHtml('<script>steal()</script><style>body{}</style><b>safe</b><!-- hidden -->'), 'safe');
});

test('escapeRegExp handles empty, unicode, and adversarial patterns', () => {
  assert.equal(escapeRegExp(''), '');
  assert.equal(escapeRegExp('café 😀'), 'café 😀');
  const escaped = escapeRegExp('.*+?^${}()|[]\\/-');
  assert.equal(new RegExp(`^${escaped}$`).test('.*+?^${}()|[]\\/-'), true);
});
