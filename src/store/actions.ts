import { gameState } from "./gameState";
export function setInputLetters(letters: string): void {
  gameState.inputLetters = letters;
}

export function searchWords(
  regExWord: RegExp,
  wordlength: number
 ): void {
  gameState.regExWord = regExWord;
  gameState.wordlength = wordlength;
  gameState.searchVersion++;
}

export function suppress(inputLetters: string): void {
  gameState.suppress = true;
  gameState.inputLetters = inputLetters;
}

export function resetGame(): void {
  console.log("resetGame");

  gameState.inputLetters = "";
  gameState.list = [];

  gameState.regExWord = null;

  gameState.possibleWords = [];
  gameState.wordlength = 0;

  gameState.doesExist = false;
  gameState.suppress = false;

  gameState.searchVersion++;

  console.log(gameState);
}

export function setSoundEnabled(enabled:boolean): void {
  gameState.soundEnabled = enabled;
}
