import { capitalize, slugify, truncate } from './text-format'

function equal(actual: string, expected: string): void {
  if (actual !== expected) {
    throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
  }
}

equal(capitalize('hello'), 'Hello')
equal(capitalize(''), '')
equal(capitalize('😀 hello'), '😀 hello')

equal(truncate('Hello world', 8), 'Hello w…')
equal(truncate('short', 10), 'short')
equal(truncate('Hello', 1), '…')
equal(truncate('Hello', 0), '')

equal(slugify('Hello, World!'), 'hello-world')
equal(slugify(' Crème brûlée '), 'creme-brulee')
equal(slugify('already---slug'), 'already-slug')
