import { describe, it, expect } from "vitest";

import { findPossibleWords } from "../../src/services/solver.js";
import { extractFirstLetter } from "../../src/services/extractFirstLetter.js";
import { findPossibleWordsOptimized } from "../../src/services/findPossibleWordsOptimized.js";

describe("findPossibleWords", () => {
  it("returns matching words", () => {
    const words = ["chat", "chien", "maison"];

    const regex = /^ch/;

    const result = findPossibleWords(words, regex);

    expect(result).toEqual(["chat", "chien"]);
  });
});

describe("extractFirstLetter", () => {
  it("extracts first fixed letter from complex regex", () => {
    const regex = /(?!.*x)(?=.*u)p..(?!u)...e/;
    expect(extractFirstLetter(regex)).toBe("p");
  });

  it("extracts first letter from simple regex", () => {
    const regex = /^ch/;
    expect(extractFirstLetter(regex)).toBe("c");
  });
  it("returns null when no fixed letter exists", () => {
    const regex = null;
    expect(extractFirstLetter(regex)).toBe(null);
  });
});

describe("findPossibleWordsOptimized", () => {
  it("filters correctly", () => {
    const words = ["chic", "choc", "plus"];
    const regex = /(?!.*[])ch.c/;
    const result = findPossibleWordsOptimized(words, regex);
    expect(result).toEqual(["chic", "choc"]);
  });
});

/* describe("word length filter", () => {
  it("keeps only 5-letter words", () => {
    const words = ["chat", "chien", "cheval"];

    const result = words.filter((word) => word.length === 5);

    expect(result).toEqual(["chien"]);
  });
}); */
