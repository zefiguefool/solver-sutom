import { gameState } from "./gameState";

export function setInputLetters(letters) {
  gameState.inputLetters = letters;
}

export function searchWords(regExWord, wordlength) {
  gameState.regExWord = regExWord;

  gameState.wordlength = wordlength;

  gameState.searchVersion++;
}

/* export function resetGame() {
  gameState.resetVersion++;
}
 */
export function suppress() {
  gameState.suppress = true;
}

export function resetGame() {
  gameState.resetCounter++;

  gameState.regexWord = null;

  gameState.wordLength = 0;

  gameState.inputLetters = [];

  gameState.possibleWords = [];
}
