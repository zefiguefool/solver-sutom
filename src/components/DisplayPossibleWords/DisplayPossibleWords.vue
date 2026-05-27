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
                words : []            }
        },
       // Refactored to use fetch and improved performance by normalizing words during loading and simplifying the sorting logic by using localeCompare directly on the filtered list.
        created() {
            // 1. Define the correct absolute path to your dictionary file. This should point to the location where final-dictionary.txt is served from your web server.
            let fileUrl = './total-dictionary.txt' || '/sutom/total-dictionary.txt'; // Adjust this path as needed

    
            // 2. Fetch the dictionary asynchronously
            fetch(fileUrl)
                .then(response => {
                    if (!response.ok) throw new Error("Could not find final-dictionary.txt at " + fileUrl);
                    return response.text();
                })
                .then(text => {
                    this.words = text.split('\n').filter(word => word.trim() !== '');
                })
                .catch(err => {
                    console.error("Error loading dictionary:", err);
                });

            EventBus.$on('suppress', () => {
                this.doesExist = true;
            });

            EventBus.$on('getPossibleWords', ({ regExWord, wordlength }) => {
                // Safety check: if dictionary isn't loaded yet, stop
                //console.log("Received getPossibleWords event with regExWord:", regExWord, "and wordlength:", wordlength);
                console.log("Current dictionary state (first 5 words):", this.words.slice(0, 5));
                console.log("Current word length:", wordlength);
                if (wordlength === 0) {
                    console.warn("Dictionary is still loading or failed to load.");
                    return;
                }

                this.doesExist = true;
                let possibleWords = [];
                this.counterWordsFound = 0;
                this.objPossibleWords = [];
                this.lengthWordToFind = wordlength;

                // 3. Filter the dictionary
                for (let index = 0; index < this.words.length; index++) {
                    const currentWord = this.words[index];
                    if (currentWord.length === wordlength) {
                        if (regExWord.test(currentWord)) {
                            this.counterWordsFound++;
                            possibleWords.push(currentWord);
                        }
                    }
                }

                // 4. Sort alphabetically
                possibleWords.sort((a, b) => a.localeCompare(b));

                //console.log("possibleWords après tri : ", possibleWords);

                // 5. Structure the results for the template
                if (possibleWords.length > 0) {
                    this.doesExist = true;
                    
                    // We group words by length (though here they all match wordlength)
                    // to maintain compatibility with your <template> logic
                    this.objPossibleWords = [{
                        lengthWords: wordlength,
                        wordsWithThisLength: [...new Set(possibleWords)] // Ensure uniqueness
                    }];
                    
                    this.uniqueWords = this.objPossibleWords[0].wordsWithThisLength;
                } else {
                    this.doesExist = false;
                    this.uniqueWords = [];
                }
            });
        },
        beforeUpdate(){
            this.heightToScroll = document.getElementById('header-top').clientHeight + document.getElementById('display-keyboard-letters').clientHeight+48;
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