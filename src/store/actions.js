import { gameState } from "./gameState";
gameState;
export function setInputLetters(letters) {
  gameState.inputLetters = letters;
}

export function searchWords(regExWord, wordlength) {
  gameState.regExWord = regExWord;
  gameState.wordlength = wordlength;
  gameState.searchVersion++;
}

export function suppress(inputLetters) {
  gameState.suppress = true;
  gameState.inputLetters = inputLetters;
}

export function resetGame() {
  gameState.inputLetters = [];
  gameState.list = [];

  gameState.regexWord = null;

  gameState.possibleWords = [];
  gameState.wordLength = 0;

  gameState.doesExist = false;
  gameState.suppress = false;
  gameState.resetCounter = 0;
}

export function setSoundEnabled(enabled) {
  gameState.soundEnabled = enabled;
}
