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
    import {bus} from '../../main'
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
            bus.$on('getActiveLink',(rootPath) => {
                rootPath == '/wordle' ? this.isWordle = true : this.isWordle = false ;  
            });
            bus.$on('inputLetter',(data) => {
                this.list = [];
                let tabInputLetters = data.split("");
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
            bus.$on('suppress',() => {
                    this.list.pop();
                }
            );
        },
        updated(){
                bus.$on('reset',() => {
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