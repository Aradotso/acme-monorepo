import assert from 'node:assert/strict';
import test from 'node:test';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from './index.ts';

test('slugify handles empty, unicode, and adversarial input', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify('Crème brûlée 東京'), 'creme-brulee-東京');
  assert.equal(slugify('---<script>alert(1)</script>---'), 'script-alert-1-script');
});

test('titleCase handles empty, unicode, and adversarial input', () => {
  assert.equal(titleCase(''), '');
  assert.equal(titleCase('éclair déjà vu'), 'Éclair Déjà Vu');
  assert.equal(titleCase('  <script>alert(1)</script>'), '  <script>alert(1)</script>');
});

test('truncate handles empty, unicode, and adversarial input', () => {
  assert.equal(truncate('', 4), '');
  assert.equal(truncate('東京タワー', 4), '東京タ…');
  assert.equal(truncate('attacker', 0), '');
});

test('wordCount handles empty, unicode, and adversarial input', () => {
  assert.equal(wordCount(''), 0);
  assert.equal(wordCount('こんにちは 世界 café'), 3);
  assert.equal(wordCount('...---!!!'), 0);
});

test('stripHtml handles empty, unicode, and adversarial input', () => {
  assert.equal(stripHtml(''), '');
  assert.equal(stripHtml('<p>こんにちは 世界</p>'), 'こんにちは 世界');
  assert.equal(stripHtml('<script>evil()</script><p>safe</p><!-- hide -->'), 'safe');
});

test('escapeRegExp handles empty, unicode, and adversarial input', () => {
  assert.equal(escapeRegExp(''), '');
  assert.equal(escapeRegExp('café 東京'), 'café 東京');
  const escaped = escapeRegExp('.*+?^${}()|[]\\/-');
  assert.ok(new RegExp(`^${escaped}$`).test('.*+?^${}()|[]\\/-'));
});
