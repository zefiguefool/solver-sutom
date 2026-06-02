<template>
    <div id="input-letters" :class="universe" class="input-letters mx-auto px-2 text-center">
        <ul>
            <li :class="item.state" v-for="(item, $index) in list" :key="$index">
                <span>{{ item.letter }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import {EventBus} from '../../event-bus.js'
import {resetGame, suppress} from '../../store/actions';
import {gameState} from "../../store/gameState";
    export default{
        name: 'DisplayInputLetters',
        data(){
            return{
                //list: [],
                isWordle: false,
                gameState
            }
        },
        computed:{
            universe:function(){
                return{
                    wordle: this.isWordle
                }
            },
            inputLetters: function(){
                return gameState.inputLetters;
            },
            list: function() {
                const result = [];
                const letters = this.inputLetters.split('');
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
        created(){
            EventBus.$on('getActiveLink',(rootPath) => {
                rootPath == '/wordle' ? this.isWordle = true : this.isWordle = false ;  
            });
            //console.log("isWordle : ", this.isWordle);
            
                //console.log("data : ", data);
                const liste = []
                //this.list = [];
                let tabInputLetters = gameState.inputLetters.split("");
                //console.log("tabInputLetters : ", tabInputLetters);
                let classAdd = "";
                for (let i = 0; i < tabInputLetters.length ; i ++){
                    if(tabInputLetters[i] === "-"){
                        classAdd = "color-grid";
                    }
                    else if (tabInputLetters[i] === tabInputLetters[i].toUpperCase()){
                        classAdd = "color-good-place";             
                    }
                    else if (tabInputLetters[i] === tabInputLetters[i].toLowerCase()){
                        classAdd = "color-bad-place";
                    }
                    liste.push(
                    {
                        letter: tabInputLetters[i],
                        state : classAdd
                    });
                    game.inputLetters = liste;  


                }
            
            EventBus.$on('suppress',() => {
                console.log("gameState.inputLetters : ", gameState.inputLetters);
                    gameState.inputLetters = gameState.inputLetters.slice(0, -1);
                    //console.log("pop list : ", this.list);
                })
            
            //suppress();
        },
        updated(){
                EventBus.$on('reset',() => {
                    this.list.length = 0;
                    this.list = [];
                    //console.log("reset list : ", this.list);
                    }
                );
                //resetGame();
        }
    }
</script>
<style scoped>
    @import './DisplayInputLetters.css';
</style>