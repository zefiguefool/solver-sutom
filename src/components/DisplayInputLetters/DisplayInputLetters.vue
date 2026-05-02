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
    export default{
        name: 'DisplayInputLetters',
        data(){
            return{
                list: [],
                isWordle: false
            }
        },
        computed:{
            universe:function(){
                return{
                    wordle: this.isWordle
                }
            }
        },
        created(){
            EventBus.$on('getActiveLink',(rootPath) => {
                rootPath == '/wordle' ? this.isWordle = true : this.isWordle = false ;  
            });
            console.log("isWordle : ", this.isWordle);
            EventBus.$on('inputLetter',(data) => {
                console.log("data : ", data);
                this.list = [];
                let tabInputLetters = data.split("");
                console.log("tabInputLetters : ", tabInputLetters);
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
                    this.list.push(
                    {
                        letter: tabInputLetters[i],
                        state : classAdd
                    });
                }
            });
            EventBus.$on('suppress',() => {
                    this.list.pop();
                }
            );
        },
        updated(){
                EventBus.$emit('reset',() => {
                    this.list.length = 0;
                    this.list = [];
                    }
                );
        }
    }
</script>
<style scoped>
    @import './DisplayInputLetters.css';
</style>