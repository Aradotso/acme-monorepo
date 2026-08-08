import assert from 'node:assert/strict';
import test from 'node:test';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from './index.ts';

test('slugify handles empty input, unicode, and punctuation attacks', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify('Crème brûlée 東京'), 'creme-brulee-東京');
  assert.equal(slugify('---<script>alert(1)</script>---'), 'script-alert-1-script');
});

test('titleCase handles empty input, unicode, and repeated whitespace', () => {
  assert.equal(titleCase(''), '');
  assert.equal(titleCase('élan vital 東京'), 'Élan Vital 東京');
  assert.equal(titleCase('  hELLO\t<script>alert(1)</script>  '), 'Hello <script>alert(1)</script>');
});

test('truncate handles empty input, unicode, and hostile limits', () => {
  assert.equal(truncate('', 4), '');
  assert.equal(truncate('😀 café', 5), '😀 ca…');
  assert.equal(truncate('sensitive', -100), '');
  assert.equal(truncate('abcdef', 1), '…');
});

test('wordCount handles empty input, unicode, and punctuation floods', () => {
  assert.equal(wordCount(''), 0);
  assert.equal(wordCount('Привет мир 東京'), 3);
  assert.equal(wordCount('!!! <script>alert(1)</script> ???'), 4);
  assert.equal(wordCount("don't mother-in-law"), 2);
});

test('stripHtml handles empty input, unicode, and executable blocks', () => {
  assert.equal(stripHtml(''), '');
  assert.equal(stripHtml('<p>こんにちは&nbsp;世界</p>'), 'こんにちは&nbsp;世界');
  assert.equal(stripHtml('Hi<!-- evil --> <script>alert(1)</script><b>there</b>'), 'Hi there');
});

test('escapeRegExp handles empty input, unicode, and regex injection', () => {
  assert.equal(escapeRegExp(''), '');
  assert.equal(escapeRegExp('café 東京'), 'café 東京');
  const hostile = '.*+?^${}()|[]\\';
  assert.equal(new RegExp(`^${escapeRegExp(hostile)}$`).test(hostile), true);
});
