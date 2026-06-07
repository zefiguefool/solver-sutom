/* import Vue from "vue"; */
import { reactive } from "vue";

export const gameState = reactive({
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
