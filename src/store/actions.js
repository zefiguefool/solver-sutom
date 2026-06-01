import { gameState } from "./gameState";

export function updateSearch({ regexWord, wordLength }) {
  gameState.regexWord = regexWord;

  gameState.wordLength = wordLength;
}

export function updateResults(words) {
  gameState.possibleWords = words;
}

export function resetGame() {
  gameState.wordLength = 0;

  gameState.regexWord = null;

  gameState.possibleWords = [];

  gameState.forbiddenLetters = [];

  gameState.requiredLetters = [];
}
