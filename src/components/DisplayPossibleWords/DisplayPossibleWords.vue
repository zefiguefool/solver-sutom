<template>
    <div id="possible-letters" class="possible-letters mx-auto px-2 text-center">
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
                counterWordsFound: 228526,
                objPossibleWords:[],
                lengthWordToFind: 0,
                doesExist: true,
                uniqueWords: []
            }
        },
        /*created(){
            let fileUrl = 'fr.txt';
            let xhr = new XMLHttpRequest();
            let textWords = '';
            let words = [];
            => eslint-disable no-mixed-spaces-and-tabs
            xhr.open("GET",fileUrl, true);
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    textWords = this.responseText;
                }
                let lines = textWords.split(/\r\n/);
                for(var line = 0; line < lines.length; line++){
                    // creation du tableau de mots du dictionnaire
                    words.push((lines[line]).toLowerCase());
                }
            };
            xhr.overrideMimeType("text/plain; charset=UTF-8");
            xhr.send();

            EventBus.$on('suppress',() => {
                    this.doesExist = true;
                }
            );
            
            EventBus.$on('getPossibleWords',({regExWord,wordlength}) => {
                    this.doesExist = true
                    let isPossibleWord = false;
                    let possibleWordsLength = 0;
                    let possibleWords = [];
                    this.counterWordsFound = 0;
                    this.objPossibleWords = [];
                    this.lengthWordToFind = wordlength;
                    var indexLength = 0;
                    //comparaison du tableau de mots du dictionnaire avec le'expression regulière provenant des champs de saisie
                    for(let index = 0; index < words.length-1; index++){
                        words[index] = words[index].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        if(words[index].length == wordlength){
                            isPossibleWord = regExWord.test(words[index]);
                            if(isPossibleWord == true){
                                this.counterWordsFound++;
                                possibleWords.push(words[index]);
                            }
                        }
                    }
                    //tri par longueur et alphabet
                    console.log("possibleWords avant tri : ", possibleWords);
                    possibleWords.sort(function(a, b) {
                        return a.length - b.length || a.localeCompare(b);
                    });
                    //affichage
                    for (let i=0, len = possibleWords.length ; i<len ; i++) {
                        let ilength = possibleWords[i].length;
                        if(ilength > possibleWordsLength){
                            possibleWordsLength = ilength;
                            let wordObj = {
                                lengthWords: 0,
                                wordsWithThisLength: []
                            }
                            this.objPossibleWords.splice(indexLength,0,wordObj);
                            this.objPossibleWords[indexLength].lengthWords = possibleWordsLength;
                            indexLength++; 
                                                    
                        }
                        this.objPossibleWords[indexLength-1].wordsWithThisLength.push(possibleWords[i]);
                    }
                    if(possibleWords.length != 0){
                        this.doesExist = true;
                        this.uniqueWords = [...new Set(this.objPossibleWords[0].wordsWithThisLength)];
                    }else{
                         this.doesExist = false;
                    }
                }
            );
            => eslint-disable no-mixed-spaces-and-tabs
        }*/
       // Refactored to use fetch and improved performance by normalizing words during loading and simplifying the sorting logic by using localeCompare directly on the filtered list.
        created() {
            // 1. Define the correct absolute path to your dictionary
            let fileUrl = 'fr.txt' || '/sutom/fr.txt'; 
            let words = [];

            // 2. Fetch the dictionary asynchronously
            fetch(fileUrl)
                .then(response => {
                    if (!response.ok) throw new Error("Could not find fr.txt at " + fileUrl);
                    return response.text();
                })
                .then(textWords => {
                    // Split by line breaks and normalize immediately to improve performance during search
                    const lines = textWords.split(/\r?\n/);
                    words = lines.map(line => 
                        line.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    );
                    console.log("Dictionary loaded successfully. Word count:", words.length);
                })
                .catch(err => {
                    console.error("Error loading dictionary:", err);
                });

            EventBus.$on('suppress', () => {
                this.doesExist = true;
            });

            EventBus.$on('getPossibleWords', ({ regExWord, wordlength }) => {
                // Safety check: if dictionary isn't loaded yet, stop
                if (words.length === 0) {
                    console.warn("Dictionary is still loading or failed to load.");
                    return;
                }

                this.doesExist = true;
                let possibleWords = [];
                this.counterWordsFound = 0;
                this.objPossibleWords = [];
                this.lengthWordToFind = wordlength;

                // 3. Filter the dictionary
                for (let index = 0; index < words.length; index++) {
                    const currentWord = words[index];
                    if (currentWord.length === wordlength) {
                        if (regExWord.test(currentWord)) {
                            this.counterWordsFound++;
                            possibleWords.push(currentWord);
                        }
                    }
                }

                // 4. Sort alphabetically
                possibleWords.sort((a, b) => a.localeCompare(b));

                console.log("possibleWords après tri : ", possibleWords);

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
                this.counterWordsFound = 336528;
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