import { describe, it, expect } from "vitest";

describe("solver", () => {
  it("filters words correctly", () => {
    const words = ["chat", "chien", "cheval"];

    const result = words.filter((word) => /^ch/.test(word));

    expect(result).toEqual(["chat", "chien", "cheval"]);
  });
});

describe("word length filter", () => {
  it("keeps only 5-letter words", () => {
    const words = ["chat", "chien", "cheval"];

    const result = words.filter((word) => word.length === 5);

    expect(result).toEqual(["chien"]);
  });
});

describe("first letter optimization", () => {
  it("keeps only words starting with c", () => {
    const words = ["chat", "chien", "maison"];

    const result = words.filter((word) => word[0] === "c");

    expect(result).toEqual(["chat", "chien"]);
  });
});
