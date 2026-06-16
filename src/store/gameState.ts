import { reactive } from "vue";

interface GameState {
  inputLetters: string;
  list: any[];
  regExWord: RegExp | null;
  possibleWords: string[];
  wordlength: number;
  doesExist: boolean;
  suppress: boolean;
  resetVersion: number;
  searchVersion: number;
  soundEnabled: boolean;
}

export const gameState = reactive<GameState>({
  inputLetters: "",
  list: [],
  regExWord: null,
  possibleWords: [],
  wordlength: 0,
  doesExist: false,
  suppress: false,
  resetVersion: 0,
  searchVersion: 0,
  soundEnabled: true,
});
