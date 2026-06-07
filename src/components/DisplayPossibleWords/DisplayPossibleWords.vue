<template>
    <div id="possible-letters" class="possible-letters mx-auto text-center">
        <div class="oneLengthWord" v-for="(objPossibleWord, $index) in objPossibleWords" :key="$index">   
            <div v-if="objPossibleWord.lengthWords == lengthWordToFind">
                <div v-if="uniqueWords.length > 1">
                    <p>{{uniqueWords.length}} mots possibles de {{ objPossibleWord.lengthWords }} lettres</p>
                    <span v-for="(item, $index) in uniqueWords" :key="$index" v-html="item"></span>
                </div>
                <div v-else-if="uniqueWords.length == 1">
                    <p>{{uniqueWords.length}} mot possible de {{ objPossibleWord.lengthWords }} lettre</p>
                    <span v-for="(item, $index) in uniqueWords" :key="$index" v-html="item"></span>
                </div>
            </div>
        </div>  
        <div v-if="!doesExist">
            <p>Aucun mot trouvé</p>
        </div>
    </div>
</template>
<script>

import {gameState} from '../../store/gameState';
import {resetGame, suppress} from '../../store/actions';
    export default{
        name: 'DisplayPossibleWords',
        data(){
            return{
                heightToScroll: 0,
                counterWordsFound: 375194,
                objPossibleWords:[],
                lengthWordToFind: 0,
                doesExist: true,
                uniqueWords: [],
                dictionaryCache: {},
                gameState            
            }
        },
        mounted() {
            /* this.heightToScroll = document.getElementById('header-top').clientHeight + document.getElementById('display-keyboard-letters').clientHeight+48; */
             // longueurs fréquentes
                this.loadDictionary(5);
                this.loadDictionary(6);
                this.loadDictionary(7);
        },
        beforeUpdate(){
            this.heightToScroll = document.getElementById('header-top').clientHeight + document.getElementById('display-keyboard-letters').clientHeight;
        },
        methods: {

            async loadDictionary(length) {

            // déjà chargé
            if (this.dictionaryCache[length]) {
                return this.dictionaryCache[length];
            }

            const response = await fetch(`/dict/${length}.txt`);
            if (!response.ok) {
                throw new Error(
                    `Impossible de charger ${length}.txt`
                );
            }

            const text = await response.text();

            const words = text
            .split('\n')
            .filter(Boolean);

            this.dictionaryCache[length] = words;

            return words;
            }
        },
        watch: {
            async 'gameState.searchVersion'() {
                if (typeof window === 'undefined') return;
                console.log('searchVersion changed, recalculating possible words...');
                const regExWord = this.gameState.regExWord;

                const wordlength = this.gameState.wordlength;

                if ( !regExWord || !wordlength) {
                    return;
                }

                this.doesExist = true;
                this.counterWordsFound = 0;
                this.objPossibleWords = [];
                this.lengthWordToFind = wordlength;

                const words = await this.loadDictionary(
                    wordlength
                );

                const possibleWords = [];
                let firstLetter = null;

                const regexSource = regExWord.source;
                if (regexSource && regexSource[0] && /[a-z]/i.test(regexSource[0])) {
                    firstLetter = regexSource[0];
                }
                console.time("search");
                for (const word of words) {
                    if (firstLetter && word[0] !== firstLetter) {
                        continue;
                    }

                    if (regExWord.test(word)) {
                        possibleWords.push(word);
                    }
                }
                console.timeEnd("search");
                if (possibleWords.length > 0) {
                    this.uniqueWords =
                        [...new Set(
                        possibleWords
                        )];

                    this.objPossibleWords = [{
                        lengthWords:
                        wordlength,

                        wordsWithThisLength:
                        this.uniqueWords
                    }];

                    } else {

                        this.doesExist = false;
                        this.uniqueWords = [];
                    }
                }
            
        },
        updated(){
            console.log("updated DisplayPossibleWords");

        }   
    }
</script>
<style scoped>
    @import './DisplayPossibleWords.css';
</style>