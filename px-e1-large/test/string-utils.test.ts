import assert from 'node:assert/strict';
import test from 'node:test';
import { camelCase, escapeRegExp, isPalindrome, kebabCase, levenshtein, longestCommonPrefix, padCenter, slugify, snakeCase, stripHtml, templateFill, titleCase, truncate, wordCount, wrapText } from '../src/index.js';

test('slugify handles empty, unicode, and adversarial punctuation', () => { assert.equal(slugify(''), ''); assert.equal(slugify(' Crème brûlée 世界 '), 'creme-brulee-世界'); assert.equal(slugify('///---'), ''); });
test('titleCase handles empty, unicode, and repeated whitespace', () => { assert.equal(titleCase(''), ''); assert.equal(titleCase('éLAN 世界'), 'Élan 世界'); assert.equal(titleCase(' \t\n '), ''); });
test('truncate handles empty, unicode, and tiny limits', () => { assert.equal(truncate('', 3), ''); assert.equal(truncate('😀abc', 3), '😀a…'); assert.equal(truncate('abcdef', 1), '…'); });
test('wordCount handles empty, unicode, and whitespace attacks', () => { assert.equal(wordCount(''), 0); assert.equal(wordCount('你好 мир'), 2); assert.equal(wordCount(' \u2003\t\n '), 0); });
test('stripHtml handles empty, unicode, and unclosed tags', () => { assert.equal(stripHtml(''), ''); assert.equal(stripHtml('<p>世界</p>'), '世界'); assert.equal(stripHtml('safe <script>alert(1)'), 'safe alert(1)'); });
test('escapeRegExp handles empty, unicode, and all metacharacters', () => { assert.equal(escapeRegExp(''), ''); assert.equal(escapeRegExp('café😀'), 'café😀'); assert.equal(escapeRegExp('.*+?^${}()|[]\\'), '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\'); });
test('camelCase handles empty, unicode, and separator runs', () => { assert.equal(camelCase(''), ''); assert.equal(camelCase('Éclair 世界'), 'éclair世界'); assert.equal(camelCase('---___'), ''); });
test('snakeCase handles empty, unicode, and separator runs', () => { assert.equal(snakeCase(''), ''); assert.equal(snakeCase('Hello 世界'), 'hello_世界'); assert.equal(snakeCase('---___'), ''); });
test('kebabCase handles empty, unicode, and separator runs', () => { assert.equal(kebabCase(''), ''); assert.equal(kebabCase('Hello 世界'), 'hello-世界'); assert.equal(kebabCase('---___'), ''); });
test('padCenter handles empty, unicode, and multi-character fill', () => { assert.equal(padCenter('', 0), ''); assert.equal(padCenter('😀', 5, '·'), '··😀··'); assert.equal(padCenter('x', 4, 'ab'), 'axab'); });
test('wrapText handles empty, unicode, and long-word adversaries', () => { assert.deepEqual(wrapText('', 4), []); assert.deepEqual(wrapText('你好 世界', 4), ['你好', '世界']); assert.deepEqual(wrapText('abcdefgh', 3), ['abc', 'def', 'gh']); assert.throws(() => wrapText('x', 0), RangeError); });
test('levenshtein handles empty, unicode, and divergent strings', () => { assert.equal(levenshtein('', ''), 0); assert.equal(levenshtein('😀', '😃'), 1); assert.equal(levenshtein('kitten', 'sitting'), 3); });
test('longestCommonPrefix handles empty, unicode, and no commonality', () => { assert.equal(longestCommonPrefix(), ''); assert.equal(longestCommonPrefix('😀abc', '😀世界'), '😀'); assert.equal(longestCommonPrefix('abc', 'xyz'), ''); });
test('isPalindrome handles empty, unicode, and punctuation significance', () => { assert.equal(isPalindrome(''), true); assert.equal(isPalindrome('😀a😀'), true); assert.equal(isPalindrome('A man, a plan'), false); });
test('templateFill handles empty, unicode, and missing/malformed placeholders', () => { assert.equal(templateFill('', {}), ''); assert.equal(templateFill('こんにちは {{name}}', { name: '世界' }), 'こんにちは 世界'); assert.equal(templateFill('{{missing}} {{bad', {}), '{{missing}} {{bad'); assert.equal(templateFill('{{n}}', { n: 0 }), '0'); });
