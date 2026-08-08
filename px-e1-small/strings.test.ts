import assert from 'node:assert/strict';
import { slugify, titleCase } from './strings';

assert.equal(slugify(''), '');
assert.equal(slugify('Crème brûlée — déjà vu'), 'creme-brulee-deja-vu');
assert.equal(slugify('  many   spaces  '), 'many-spaces');
assert.equal(slugify('こんにちは 世界'), 'こんにちは-世界');

assert.equal(titleCase(''), '');
assert.equal(titleCase('élan vital'), 'Élan Vital');
assert.equal(titleCase('  many   spaces  '), 'Many Spaces');
assert.equal(titleCase('こんにちは 世界'), 'こんにちは 世界');
