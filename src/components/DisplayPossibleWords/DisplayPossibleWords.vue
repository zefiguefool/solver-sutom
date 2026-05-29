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
import {EventBus} from '../../event-bus.js'
    export default{
        name: 'DisplayPossibleWords',
        data(){
            return{
                heightToScroll: 0,
                counterWordsFound: 121272,
                objPossibleWords:[],
                lengthWordToFind: 0,
                doesExist: true,
                uniqueWords: [],
                dictionaryCache: {},            
            }
        },
       // Refactored to use fetch and improved performance by normalizing words during loading and simplifying the sorting logic by using localeCompare directly on the filtered list.
        created() {
            // 1. Define the correct absolute path to your dictionary file. This should point to the location where final-dictionary.txt is served from your web server.
            let fileUrl = './total-dictionary.txt' || '/solvami/total-dictionary.txt'; // Adjust this path as needed

    
            // 2. Fetch the dictionary asynchronously
           

            EventBus.$on('suppress', () => {
                this.doesExist = true;
            });
            EventBus.$on(
            'getPossibleWords',
            async ({ regExWord, wordlength }) => {

                this.doesExist = true;

                this.counterWordsFound = 0;

                this.objPossibleWords = [];

                this.lengthWordToFind = wordlength;

                // charge uniquement le bon dictionnaire
                const words =
                await this.loadDictionary(wordlength);

                const possibleWords = [];

                for (const word of words) {

                if (regExWord.test(word)) {
                    possibleWords.push(word);
                }
                }

                possibleWords.sort((a, b) =>
                a.localeCompare(b)
                );

                if (possibleWords.length > 0) {

                this.uniqueWords = [
                    ...new Set(possibleWords)
                ];

                this.objPossibleWords = [{
                    lengthWords: wordlength,
                    wordsWithThisLength: this.uniqueWords
                }];

                } else {

                this.doesExist = false;

                this.uniqueWords = [];
                }
            });
        },
        beforeUpdate(){
            this.heightToScroll = document.getElementById('header-top').clientHeight + document.getElementById('display-keyboard-letters').clientHeight+48;
        },
        methods: {

            async loadDictionary(length) {

            // déjà chargé
            if (this.dictionaryCache[length]) {
            return this.dictionaryCache[length];
            }
            
           const response = await fetch(
            `${process.env.BASE_URL}dict/${length}.txt`
            );

            const text = await response.text();

            const words = text
            .split('\n')
            .filter(Boolean);

            this.dictionaryCache[length] = words;

            return words;
        }
        },
        updated(){
            EventBus.$on('reset',() => {
                this.counterWordsFound = 121272;
                this.objPossibleWords = [];
                this.doesExist = true;
                }
            );
            window.scrollBy({
                top: this.heightToScroll,
                behavior: 'smooth'
            });
        }
    }
</script>
<style scoped>
    @import './DisplayPossibleWords.css';
</style>