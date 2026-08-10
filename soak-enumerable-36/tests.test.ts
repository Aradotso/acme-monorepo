import assert from "node:assert/strict";
import test from "node:test";
import {
  escapeRegExp,
  slugify,
  stripHtml,
  titleCase,
  truncate,
  wordCount,
} from "./index.ts";

test("slugify handles empty, Unicode, and adversarial input", () => {
  assert.equal(slugify(""), "");
  assert.equal(slugify("Crème brûlée 東京"), "creme-brulee-東京");
  assert.equal(slugify("../../<script>alert(1)</script> --"), "script-alert-1-script");
});

test("titleCase handles empty, Unicode, and adversarial input", () => {
  assert.equal(titleCase(""), "");
  assert.equal(titleCase("élan 東京"), "Élan 東京");
  assert.equal(titleCase("  <script>alert(1)</script>\t42nd"), "  <script>alert(1)</script>\t42nd");
});

test("truncate handles empty, Unicode, and adversarial input", () => {
  assert.equal(truncate("", 4), "");
  assert.equal(truncate("😀 café", 5), "😀 ca…");
  assert.equal(truncate("<script>".repeat(100), 8), "<script…");
  assert.equal(truncate("abcdef", 1), "…");
});

test("wordCount handles empty, Unicode, and adversarial input", () => {
  assert.equal(wordCount(""), 0);
  assert.equal(wordCount("日本語  café\n世界"), 3);
  assert.equal(wordCount(" \t\n".repeat(1000)), 0);
  assert.equal(wordCount("<script>alert(1)</script>"), 1);
});

test("stripHtml handles empty, Unicode, and adversarial input", () => {
  assert.equal(stripHtml(""), "");
  assert.equal(stripHtml("<p>こんにちは 🌍</p>"), "こんにちは 🌍");
  assert.equal(stripHtml('<img src="x > y"><script>alert(1)</script>'), "alert(1)");
});

test("escapeRegExp handles empty, Unicode, and adversarial input", () => {
  assert.equal(escapeRegExp(""), "");
  assert.equal(escapeRegExp("café 東京"), "café 東京");
  const hostile = ".*+?^${}()|[]\\";
  assert.equal(escapeRegExp(hostile), "\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\");
  assert.match("a.*b", new RegExp(escapeRegExp("a.*b")));
});
