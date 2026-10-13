import test from 'node:test';
import assert from 'node:assert/strict';
import { typeOf, humanKey, escapeHtml, countNodes } from '../json-utils.js';

test('typeOf distinguishes null, arrays, and primitives', () => {
  assert.equal(typeOf(null), 'null');
  assert.equal(typeOf([]), 'array');
  assert.equal(typeOf('text'), 'string');
  assert.equal(typeOf(3), 'number');
  assert.equal(typeOf(false), 'boolean');
});

test('humanKey formats snake_case and camelCase safely', () => {
  assert.equal(humanKey('first_name'), 'first name');
  assert.equal(humanKey('firstName'), 'first name');
  assert.equal(humanKey('<danger>&'), '<danger>&');
});

test('escapeHtml protects values and keys rendered as HTML', () => {
  assert.equal(escapeHtml('<script>alert("x")</script>'), '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  assert.equal(escapeHtml("A & 'B'"), 'A &amp; &#39;B&#39;');
});

test('countNodes counts nested objects, arrays, and primitive leaves', () => {
  assert.deepEqual(countNodes({ user: { active: true }, tags: ['a', 'b'], missing: null }), {
    groups: 2, lists: 1, leaves: 4
  });
});

test('countNodes supports root primitive JSON values', () => {
  assert.deepEqual(countNodes('hello'), { groups: 0, lists: 0, leaves: 1 });
  assert.deepEqual(countNodes(null), { groups: 0, lists: 0, leaves: 1 });
});
