import Vue from "vue";

export const gameState = Vue.observable({
  regExWord: null,

  wordlength: 0,

  searchVersion: 0,

  resetVersion: 0,
  searchVersion: 0,
  inputLetters: "",
});
