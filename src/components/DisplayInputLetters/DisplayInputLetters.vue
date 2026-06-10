<template>
    <div id="input-letters" :class="universe" class="input-letters mx-auto px-2 text-center">
        <ul>
            <li :class="item.state" v-for="(item, $index) in list" :key="$index" data-testid="letter-input" >
                <span data-testid="letter-displayed">{{ item.letter }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
//import {resetGame, suppress} from '../../store/actions';
import {gameState} from "../../store/gameState";
    export default{
        name: 'DisplayInputLetters',
        data(){
            return{
                //isWordle: false,
                gameState
            }
        },
        computed:{
            game() {
                return this.$route.path.split('/').pop()
            },

            isWordle() {
                return this.game === 'wordle'
            },

            universe:function(){
                return{
                    sutom:this.$route.path === '/solvami/sutom',
                    tusmo:this.$route.path === '/solvami/tusmo',
                    wordle:this.$route.path === '/solvami/wordle',
                    
                }
            },
            inputLetters: function(){
                return gameState.inputLetters;
            },
            list: function() {
                const result = [];
                
                console.log("COMPUTED : inputLetters : ", this.inputLetters);
                if (!this.inputLetters || this.inputLetters.length === 0) {
                    return result; // Return an empty array if there are no input letters
                }
                const letters =  this.inputLetters.split('')
                for (let i = 0;i < letters.length;i++) {
                    let state = '';
                    const letter = letters[i];
                    if (letter === '-') {
                        state ='color-grid';
                    } else if (letter === letter.toUpperCase()) {
                        state = 'color-good-place';
                    } else {
                        state ='color-bad-place';
                    }
                    result.push({letter, state});
                }
                return result;
            }  
        },
        /* methods: {
            suppress: function(){

                this.inputLetters = this.inputLetters.slice(0, -1);
                console.log("SUPPRESS : inputLetters : ", this.inputLetters);
                suppress(this.inputLetters);
            },
            reset: function(){
                resetGame();
            }
        }, */
        
    }
</script>
<style scoped>
    @import './DisplayInputLetters.css';
</style>