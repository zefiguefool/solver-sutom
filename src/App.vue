<template>
  <div id="app">
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
import Navigation from './components/Navigation/Navigation.vue'
import SolverComponent from './components/SolverComponent/SolverComponent.vue'

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
    emitScroll(){
      //console.log("scroll");
      this.heightToScrollOnce = document.getElementsByClassName('intro').item(0).clientHeight;
      //console.log("this.heightToScrollOnce",this.heightToScrollOnce);
      window.scrollBy({
        top: this.heightToScrollOnce + 75,
        behavior: 'smooth'
      });
    },
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
  }
  .color-grid{
     background-color: #0077c7;
     border-radius: 4px;
  }
  .color-good-place{
    background-color: #e7002a;
    border-radius: 4px;
  }
  .color-bad-place{
    background-color: #0077c7;
    border-radius: 4px;
  }
  .bad-place{
    background-color: #ffbd00;
    border-radius: 4px;
  }
  .color-bad-place span{
    background-color: #ffbd00;
    border-radius: 2rem;
    width: 2.3rem;
    display: inline-block
  }
  .color-border{
    background-color: #fff;
  }
/* tusmo */
  .tusmo .input-letters li{
      border-radius: 0.5rem;
  }
  .tusmo .color-grid{
     background-color: #3a3a3c;
  }
  .tusmo .color-good-place{
    background-color: #e7002a;
  }
  .tusmo .color-bad-place{
    background-color: #ffbd00;
    
  }
   .tusmo .color-bad-place span{
    background-color: #ffbd00;
    border-radius:0;
  }
/*wordle*/
  .wordle .input-letters li{
      border-radius: 0.5rem;
  }
  .wordle .color-grid{
     background-color: #3a3a3c;
  }
  .wordle .color-good-place, .wordle.color-good-place{
    background-color: #3eaa42;
  }
  .wordle .color-bad-place{
    background-color: #d3952a;
    
  }
   .wordle .color-bad-place span{
    background-color: #d3952a;
    border-radius:0;
  }
/**/
  .sutom .color-letter-nok{
     color: #0077c7;
  }
  .sutom .color-letter-good-place{
    color: #e7002a;
  }
  .sutom.color-letter-bad-place{
    color: #ffbd00;
    border-radius: 2rem;
  }

/*wordle*/
  .wordle .color-letter-nok{
     color: #3a3a3c;
  }
  .wordle .color-letter-good-place{
    color: #3eaa42;
  }
  .wordle.color-letter-good-place{
    color: #3eaa42;
  }
  .wordle .color-letter-bad-place, .wordle.color-letter-bad-place{
    color: #d3952a;
    border-radius: none;
  }

/* Styles globaux */

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
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.game-selector button:hover {
  background-color: #45a049;
}

.game-selector button.active {
  background-color: #2E7D32;
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
</style>
