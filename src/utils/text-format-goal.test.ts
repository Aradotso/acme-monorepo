import assert from 'node:assert/strict'
import test from 'node:test'

import { capitalize, slugify, truncate } from './text-format-goal.ts'

test('capitalize uppercases the first character', () => {
  assert.equal(capitalize('hello world'), 'Hello world')
  assert.equal(capitalize(''), '')
  assert.equal(capitalize('éclair'), 'Éclair')
})

test('truncate keeps strings within the limit and appends an ellipsis otherwise', () => {
  assert.equal(truncate('hello', 5), 'hello')
  assert.equal(truncate('Hello world', 8), 'Hello w…')
  assert.equal(truncate('hello', 1), '…')
  assert.equal(truncate('hello', 0), '')
})

test('slugify creates lowercase URL slugs', () => {
  assert.equal(slugify('Hello, World!'), 'hello-world')
  assert.equal(slugify(' Déjà Vu: 2025 '), 'deja-vu-2025')
  assert.equal(slugify('already-a-slug'), 'already-a-slug')
})
