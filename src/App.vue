<template>
  <div id="app">
    <span @click.once="emitScroll" data-v-741978ef="" class="sticky-btn text-maroon fs-6 font-weight-bold underline position-sticky absolute-bottom">
      top
      <a data-v-741978ef="" href="#" title="Aller au Solver" aria-label="Go to Solver" class="anchor link-dark">
        <svg width="7%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 12L12 8M12 8L8 12M12 8V16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="maroon" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </span>
    <navigation></navigation>
    <router-view></router-view>
    <div id="to-scroll" class="to-scroll mx-auto">
       <div class="solver-container">
        <solver-component></solver-component>
       </div>
       <!-- Conteneur principal -->
       <!-- Sélecteur de jeu -->

    <div class="game-selector">
      <button
        v-for="game in games"
        :key="game.id"
        :id="game.id"
        @click="selectGame(game.id)"
        :class="{ active: currentGame === game.id }"
      >
        {{ game.name }}
      </button>
    </div>
       <div class="game-container">
       <!-- Iframe pour le jeu -->
        <div class="game-iframe-container">
          <iframe
            aria-label="Game Iframe"
            title="Games Iframe"
            name="game-iframe"
            loading="lazy"
            :src="currentGameUrl"
            frameborder="0"
            allowfullscreen
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* const Navigation = () =>
  import(
    './components/Navigation/Navigation.vue'
);
const SolverComponent = () =>
  import(
    './components/SolverComponent/SolverComponent.vue'
); */
import Navigation from './components/Navigation/Navigation.vue'
import SolverComponent from './components/SolverComponent/SolverComponent.vue';
export default {
  name: 'App',
  data(){
    return{
      // Données des jeux
      games : [
        { id: "sutom", name: "Sutom", url: "https://sutom.nocle.fr/" },
        { id: "tusmo", name: "tusmo", url: "https://www.tusmo.xyz/" }, // À remplacer
        {
          id: "wordle",
          name: "Wordle",
          url: "https://wordle.louan.me/",
        },
      ],
      currentGame: "sutom", // Jeu sélectionné par défaut
      attempts: '',
      solverResults: '',
      heightToScrollOnce: 0
    }
  },
  mounted() {
    // Charger les tentatives sauvegardées au démarrage
    this.attempts = localStorage.getItem(`attempts_${this.currentGame}`) || '';
  },
  components: {
        Navigation,
        SolverComponent
    },
  computed: {
    currentGameUrl() {
      const game = this.games.find(g => g.id === this.currentGame);
      return game ? game.url : '';
    }
  },
  methods: {
     selectGame(gameId) {
      // Sauvegarder les tentatives avant de changer de jeu
      localStorage.setItem(`attempts_${this.currentGame}`, this.attempts);
      this.currentGame = gameId;
      // Charger les tentatives sauvegardées pour le nouveau jeu
      this.attempts = localStorage.getItem(`attempts_${gameId}`) || '';
    },
    handleSolve(attempts) {
      this.attempts = attempts;
      localStorage.setItem(`attempts_${this.currentGame}`, attempts);
      // Ici, tu peux aussi appeler une API ou une fonction pour résoudre
      this.solverResults = `Résultats pour : ${attempts}`;
    },
    emitScroll(){
        this.heightToScrollOnce = document.getElementsByClassName('fieldset-container-component').item(0)?.clientHeight + document.getElementsByTagName('h1').item(0).clientHeight || 0;
        console.log('emit scroll solver component');
        window.scrollBy({
          top: this.heightToScrollOnce,
          behavior: 'smooth'
        });
      }
  }
}
</script>
<style>
  @import './css/_vars.css';
  @import './css/_fonts.css';
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size:1rem;
    color: var(--color-text);
    background-color: var(--body-background-color)
  }
  .color-grid{
     background-color: var(--color-grid);
     border-radius: 4px;
  }
  .color-good-place{
    background-color: var(--color-good-place);
    border-radius: 4px;
  }
  .color-bad-place{
    background-color: var(--color-bad-place);
    border-radius: 4px;
  }
  .color-grid .color-bad-place{
    border-radius: 2rem;
    display: inline-block;
    width:2rem;
  }
  .bad-place{
    background-color: var(--color-bad-place);
    border-radius: 4px;
  }
  .color-wordle-ok{
    background-color: var(--color-wordle-ok);
    border-radius: 4px;
  }
   .color-bad-place span{
    background-color: var(--color-bad-place);
    border-radius: 2rem;
    width: 2.3rem;
    display: inline-block
  }
  .color-bad-place span{
    background-color: var(--color-bad-place);
    border-radius: 2rem;
    width: 2.3rem;
    display: inline-block;
    text-align: center;
  }
  .color-border{
    background-color: var(--color-border);
  }
/* tusmo */
  .tusmo .input-letters li{
      border-radius: 0.5rem;
  }
  .tusmo .color-grid{
     background-color: var(--tusmo-color-background);
  }
  .tusmo .color-good-place{
    background-color: var(--tusmo-color-good-place);
  }
  .tusmo .color-bad-place{
    background-color: var(--tusmo-color-bad-place);
    
  }
   .tusmo .color-bad-place span{
    background-color: var(--tusmo-color-bad-place);
    border-radius:0;
  }
/*wordle*/
  .wordle .input-letters li{
      border-radius: 0.5rem;
  }
  .wordle .color-grid{
     background-color: var(--wordle-color-grid);
  }
  .wordle-color-keyboard-tile{
    background-color: var(--wordle-color-keyboard-tile);
  }
  .wordle .color-good-place, .wordle.color-good-place{
    background-color: var(--wordle-color-good-place);
  }
  .wordle .color-bad-place{
    background-color: var(--wordle-color-bad-place);
    
  }
   .wordle .color-bad-place span{
    background-color: var(--wordle-color-bad-place);
    border-radius:0;
  }
/**/
  .sutom .color-letter-nok{
     color: var(--sutom-color-letter-nok)
  }
  .sutom .color-letter-good-place{
    color: var(--sutom-color-letter-good-place);
  }
  .sutom.color-letter-bad-place{
    color: var(--sutom-color-letter-bad-place);
    border-radius: 2rem;
  }

/*wordle*/
  .wordle .color-letter-nok{
     color:var(--wordle-nok)
  }
  .wordle .color-letter-good-place{
    color: var(--wordle-color-good-place);
  }
  .wordle.color-letter-good-place{
    color: var(--wordle-color-good-place);
  }
  .wordle .color-letter-bad-place, .wordle.color-letter-bad-place{
    color: var(--wordle-color-bad-place);
    border-radius: none;
  }

/* Styles globaux */
:is(h1) > span {
  display: inline-block;
  width: 2rem;
  border: 1px solid #fff;
  background-color: #0a5566;
}

/* Sélecteur de jeu */
header {
  text-align: center;
  margin-bottom: 20px;
}

/* Sélecteur de jeu */
.game-selector {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.game-selector button {
  padding: 10px 20px;
  background-color: var(--color-select-game);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.game-selector button:hover {
  background-color: var(--color-select-game-hover);
}

.game-selector button.active {
  background-color: var(--color-select-game-active);
  font-weight: bold;
}

/* Conteneur principal */
.game-container {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  margin: 0 auto;
}

/* Iframe du jeu */
.game-iframe-container {
  width: 100%;
  max-width: 744px;
  height: 60vh;
  min-height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.game-iframe-container iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Responsive */
@media (min-width: 768px) {
  .game-container {
    flex-direction: row;
  }
}

.sticky-btn {
  z-index:3;
  top:50vh;
  left:90%;
}
</style>
