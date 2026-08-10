import assert from 'node:assert/strict';

import test from 'node:test';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from './index.ts';

test('slugify handles empty input, Unicode, and separator injection', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify('Crème brûlée 東京'), 'creme-brulee-東京');
  assert.equal(slugify('  Hello <script>alert(1)</script> world!  '), 'hello-script-alert-1-script-world');
});

test('titleCase handles empty input, Unicode, and markup-like input', () => {
  assert.equal(titleCase(''), '');
  assert.equal(titleCase('élan vital 東京'), 'Élan Vital 東京');
  assert.equal(titleCase('𐐀𐐨 𐐀𐐨'), '𐐀𐐨 𐐀𐐨');
  assert.equal(titleCase('<script>alert(1)</script>'), '<Script>alert(1)</script>');
});

test('truncate handles empty input, Unicode, and a hostile short limit', () => {
  assert.equal(truncate('', 10), '');
  assert.equal(truncate('🙂 café', 5), '🙂 ca…');
  assert.equal(truncate('ignore this', 1), '…');
  assert.equal(truncate('ignore this', 0), '');
});

test('wordCount handles empty input, Unicode, and HTML/script text', () => {
  assert.equal(wordCount(''), 0);
  assert.equal(wordCount('你好 мир café'), 3);
  assert.equal(wordCount('<script>alert(1)</script>'), 4);
  assert.equal(wordCount("rock’n’roll state-of-the-art"), 2);
});

test('stripHtml handles empty input, Unicode, and executable blocks', () => {
  assert.equal(stripHtml(''), '');
  assert.equal(stripHtml('<p>こんにちは &amp; мир</p>'), 'こんにちは & мир');
  assert.equal(stripHtml('<script>alert(1)</script><b>safe</b><!-- hidden -->'), 'safe');
});

test('escapeRegExp handles empty input, Unicode, and regex injection', () => {
  assert.equal(escapeRegExp(''), '');
  assert.equal(escapeRegExp('café 🙂'), 'café 🙂');
  const literal = '.*+?^${}()|[]\\';
  const escaped = escapeRegExp(literal);
  assert.equal(escaped, String.raw`\.\*\+\?\^\$\{\}\(\)\|\[\]\\`);
  assert.equal(new RegExp(`^${escaped}$`).test(literal), true);
});
