import Vue from "vue";

export const gameState = Vue.observable({
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
