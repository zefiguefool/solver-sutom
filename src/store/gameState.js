import Vue from "vue";

export const gameState = Vue.observable({
  // longueur du mot

  wordLength: 0,

  // regex finale

  regexWord: null,

  // résultats

  possibleWords: [],

  // lettres interdites

  forbiddenLetters: [],

  // lettres présentes

  requiredLetters: [],

  // chargement

  loading: false,
});
