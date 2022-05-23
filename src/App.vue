<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
    <div id="to-scroll" @click.once="emitScroll" class="to-scroll">
    <form-to-submit ></form-to-submit>
    <display-input-letters></display-input-letters>
    <display-possible-words></display-possible-words>
    </div>
  </div>
</template>
<script>
import Navigation from './components/Navigation/Navigation.vue'
import Form from './components/Form/Form.vue'
import DisplayInputLetters from './components/DisplayInputLetters/DisplayInputLetters.vue'
import DisplayPossibleWords from './components/DisplayPossibleWords/DisplayPossibleWords.vue'

export default {
  name: 'App',
  data(){
    return{
      heightToScrollOnce: 0
    }
  },
  components: {
        'navigation': Navigation,
        'form-to-submit': Form,
        'display-input-letters': DisplayInputLetters,
        'display-possible-words': DisplayPossibleWords
    },
    methods: {
      emitScroll(){
        this.heightToScrollOnce = document.getElementsByClassName('intro').item(0).clientHeight;
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
  }
  .color-grid{
     background-color: #0077c7;
  }
  .color-good-place{
    background-color: #e7002a;
  }
  .color-bad-place{
    background-color: #0077c7;
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
