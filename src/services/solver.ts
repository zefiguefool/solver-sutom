export function findPossibleWords(
  words: string[],
  regex: RegExp
): string[] {
  return words.filter((word) => regex.test(word));
}
