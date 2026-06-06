<template>
  <div id="app" class="container-solver-component">
    <div id="to-scroll" @click.once="emitScroll" class="to-scroll">
      <fieldset class="fieldset-container-component">
        <legend class="legend">Solver</legend>
        <form-to-submit ></form-to-submit>
        <display-input-letters></display-input-letters>
        <display-possible-words></display-possible-words>
      </fieldset>
      
    </div>
  </div>
</template>
<script>

const Form = () =>
  import(
    '../Form/Form.vue'
);
const DisplayInputLetters = () =>
  import(
    '../DisplayInputLetters/DisplayInputLetters.vue'
);
const DisplayPossibleWords = () =>
  import(
    '../DisplayPossibleWords/DisplayPossibleWords.vue'
);

export default {
  name: 'App',
  data(){
    return{
      heightToScrollOnce: 0
    }
  },
  components: {
        'form-to-submit': Form,
        DisplayInputLetters,
        DisplayPossibleWords
    },
    methods: {
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
  @import '../../css/_vars.css';
  @import '../../css/_fonts.css';
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size:1rem;
  }
  .color-grid{
     background-color: #0077c7;
    /*  > span{
      border-radius: 5px;
     } */
  }
  .color-good-place{
    background-color: #e7002a;
  }
  .color-bad-place{
    background-color: #ffbd00;
  }
  .bad-place{
    background-color: #ffbd00;
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
/*wordle*/
  .wordle .input-letters li{
      border-radius: 0.5rem;
  }
  .wordle .color-grid{
     background-color: #3a3a3c;
  }
  .wordle .color-good-place{
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
  .color-letter-nok{
     color: #0077c7;
  }
  .color-letter-good-place{
    color: #e7002a;
  }
  .color-letter-bad-place{
    color: #ffbd00;
    border-radius: 2rem;
  }

/*wordle*/
  .color-letter-nok{
     color: #3a3a3c;
  }
  .wordle .color-letter-good-place{
    color: #3eaa42;
  }
  .wordle .color-letter-bad-place{
    color: #d3952a;
    border-radius: none;
  }
</style>
<style scoped>
    @import './SolverComponent.css';
</style>
