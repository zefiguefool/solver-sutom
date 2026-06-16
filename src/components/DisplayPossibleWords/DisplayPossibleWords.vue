<template>
    <div id="possible-letters" class="possible-letters mx-auto text-center">
        <div v-if="hasResults" class="oneLengthWord">
            <p>
                {{ uniqueWords.length }}
                {{ wordCountLabel }}
                de
                {{ lengthWordToFind }}
                {{ letterCountLabel }}
            </p>
            <span
                v-for="(item, index) in uniqueWords"
                :key="index"
                v-html="item"
            ></span>
        </div>
    </div>
</template>
<script lang="ts">

import {gameState} from '../../store/gameState';
import { findPossibleWordsOptimized } from '../../services/findPossibleWordsOptimized'


    export default{
        name: 'DisplayPossibleWords',
        data(){
            return{
                heightToScroll: 0,
                counterWordsFound: 375194,
                lengthWordToFind: 0,
                doesExist: true,

                uniqueWords: [] as string[],
                dictionaryCache: {} as Record<number, string[]>,
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
            },
            clearResults() {
                console.log('clearResults')
                this.uniqueWords = [];
                this.doesExist = true;
            }
        },
        computed: {
            hasResults() {
                return this.uniqueWords.length > 0;
            },

            wordCountLabel() {
                return this.uniqueWords.length > 1
                ? 'mots possibles'
                : 'mot possible';
            },

            letterCountLabel() {
                return this.lengthWordToFind > 1
                ? 'lettres'
                : 'lettre';
            }
        },
        watch: {
            async 'gameState.searchVersion'() {
                if (typeof window === 'undefined') return;
                console.log('searchVersion changed, recalculating possible words...');
                const regExWord = this.gameState.regExWord as RegExp | null;
                console.log("regExWord :",regExWord)
                const wordlength = this.gameState.wordlength as number;
                if ( !regExWord || wordlength <=0) {
                    this.clearResults();
                    return;
                }

                this.doesExist = true;
                this.counterWordsFound = 0;
                this.lengthWordToFind = wordlength;

                const words = await this.loadDictionary(
                    wordlength
                );

                let possibleWords: string[] = [];


                console.time("search");
                possibleWords = findPossibleWordsOptimized(words, regExWord)
                console.timeEnd("search");
                if (possibleWords.length > 0) {
                    this.uniqueWords =
                        [...new Set(
                        possibleWords
                        )];

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