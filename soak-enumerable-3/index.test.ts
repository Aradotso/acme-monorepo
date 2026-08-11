import { describe, expect, it } from "vitest";
import { escapeRegExp, slugify, stripHtml, titleCase, truncate, wordCount } from "./index";

describe("slugify", () => {
  it.each([
    ["empty input", "", ""],
    ["unicode", "Crème brûlée 東京", "creme-brulee-東京"],
    ["adversarial separators", "  __DROP TABLE users;--  ", "drop-table-users"],
  ])("handles %s", (_, input, expected) => expect(slugify(input)).toBe(expected));
});

describe("titleCase", () => {
  it.each([
    ["empty input", "", ""],
    ["unicode", "élan vital 東京", "Élan Vital 東京"],
    ["adversarial whitespace", "\n  <script>alert('x')</script>\tDROP  TABLE  ", "<script>alert('x')</script> Drop Table"],
  ])("handles %s", (_, input, expected) => expect(titleCase(input)).toBe(expected));
});

describe("truncate", () => {
  it.each([
    ["empty input", "", 4, ""],
    ["unicode", "😀 café", 6, "😀 café"],
    ["adversarial limit", "secret", -1, ""],
  ])("handles %s", (_, input, limit, expected) => expect(truncate(input, limit)).toBe(expected));

  it("does not split an emoji when truncating", () => expect(truncate("😀😀😀", 2)).toBe("😀…"));
});

describe("wordCount", () => {
  it.each([
    ["empty input", "", 0],
    ["unicode", "こんにちは 世界", 2],
    ["adversarial whitespace", "\u0000\n\t  one\u00a0two  ", 3],
  ])("handles %s", (_, input, expected) => expect(wordCount(input)).toBe(expected));
});

describe("stripHtml", () => {
  it.each([
    ["empty input", "", ""],
    ["unicode", "<p>Olá, 世界</p>", "Olá, 世界"],
    ["adversarial executable content", '<!-- <img> --><script>alert("x")</script><p>safe</p>', "safe"],
  ])("handles %s", (_, input, expected) => expect(stripHtml(input)).toBe(expected));
});

describe("escapeRegExp", () => {
  it.each([
    ["empty input", "", ""],
    ["unicode", "café/東京", "café\\/東京"],
    ["adversarial syntax", "^$.*+?()[]{}|\\-", "\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\\\-"],
  ])("handles %s", (_, input, expected) => expect(escapeRegExp(input)).toBe(expected));

  it("matches adversarial text literally", () => {
    const input = "[a-z]+\\d";
    expect(new RegExp(`^${escapeRegExp(input)}$`).test(input)).toBe(true);
  });
});
