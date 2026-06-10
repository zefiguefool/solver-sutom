export function findPossibleWords(words, regex) {
  return words.filter((word) => regex.test(word));
}
