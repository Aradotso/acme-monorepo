import assert from 'node:assert/strict';
import { test } from 'node:test';
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from './index.ts';

test('slugify handles empty, Unicode, and adversarial input', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify('Crème brûlée 東京'), 'creme-brulee');
  assert.equal(slugify('  <script>alert(1)</script> -- DROP TABLE;  '), 'script-alert-1-script-drop-table');
});

test('titleCase handles empty, Unicode, and adversarial input', () => {
  assert.equal(titleCase(''), '');
  assert.equal(titleCase('élan vital'), 'Élan Vital');
  assert.equal(titleCase("hello'; DROP TABLE"), "Hello'; Drop Table");
});

test('truncate handles empty, Unicode, and adversarial input', () => {
  assert.equal(truncate('', 4), '');
  assert.equal(truncate('🙂 café', 5), '🙂 ca…');
  assert.equal(truncate('aaaaaaaaaaaaaaaa', 0), '');
  assert.equal(truncate('abcdef', 1), '…');
});

test('wordCount handles empty, Unicode, and adversarial input', () => {
  assert.equal(wordCount(''), 0);
  assert.equal(wordCount('你好 café 42'), 3);
  assert.equal(wordCount('<script>alert(1)</script> !!!'), 4);
});

test('stripHtml handles empty, Unicode, and adversarial input', () => {
  assert.equal(stripHtml(''), '');
  assert.equal(stripHtml('<p>こんにちは &amp; мир</p>'), 'こんにちは &amp; мир');
  assert.equal(stripHtml('<script>window.steal = true</script><b>safe</b><!--secret-->'), 'safe');
});

test('escapeRegExp handles empty, Unicode, and adversarial input', () => {
  assert.equal(escapeRegExp(''), '');
  assert.equal(escapeRegExp('café?'), 'café\\?');
  const hostile = '.*+?^${}()|[]\\/-';
  assert.equal(new RegExp(`^${escapeRegExp(hostile)}$`).test(hostile), true);
});
