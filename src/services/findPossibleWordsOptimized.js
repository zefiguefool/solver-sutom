import { extractFirstLetter } from "./extractFirstLetter";

export function findPossibleWordsOptimized(words, regex) {
  let firstLetter = extractFirstLetter(regex);

  return words.filter((word) => {
    if (firstLetter && word[0] !== firstLetter) {
      return false;
    }

    return regex.test(word);
  });
}
