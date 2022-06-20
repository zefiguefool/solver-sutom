<template>
    <div id="possible-letters" class="possible-letters mx-auto px-2 text-center">
        <div class="oneLengthWord" v-for="(objPossibleWord, $index) in objPossibleWords" :key="$index">   
            <div v-if="objPossibleWord.lengthWords == lengthWordToFind">
                <div v-if="uniqueWords.length > 1">
                    <p>{{uniqueWords.length}} mots possibles de {{ objPossibleWord.lengthWords }} lettres</p>
                     <span v-for="(item, $index) in uniqueWords" :key="$index" v-html="item">{{item}}</span>
                </div>
                <div v-else-if="uniqueWords.length == 1">
                    <p>{{uniqueWords.length}} mot possible de {{ objPossibleWord.lengthWords }} lettre</p>
                    <span v-for="(item, $index) in uniqueWords" :key="$index" v-html="item">{{item}}</span>
                </div>
            </div>
        </div>  
        <div v-if="!doesExist">
            <p>Aucun mot trouvé</p>
        </div>
    </div>
</template>
<script>
    //import {bus} from '../../main'
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
        created(){
            let fileUrl = 'fr.txt';
            let xhr = new XMLHttpRequest();
            let textWords = '';
            let words = [];
            /* eslint-disable no-mixed-spaces-and-tabs */
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

            this.$on('suppress',() => {
                    this.doesExist = true;
                }
            );
            
            this.$on('getPossibleWords',({regExWord,wordlength}) => {
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
            /* eslint-disable no-mixed-spaces-and-tabs */
        },
        beforeUpdate(){
            this.heightToScroll = document.getElementById('header-top').clientHeight + document.getElementById('display-keyboard-letters').clientHeight+48;
        },
        updated(){
            this.$on('reset',() => {
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