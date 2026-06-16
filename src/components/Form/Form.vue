<template>  
    <div :class="universe" class="form text-center">
        <p class="alert alert-warning" v-if="nothingToSearch">Saisissez un critère de recherche</p>
        <p class="alert alert-warning" v-if="firstLetterLowerCase">À Sutom la première lettre est connue. Tapez une majuscule en 1<sup>ère</sup> lettre</p>
        <p class="alert alert-warning" v-if="letterIsIncluded">Vous avez indiqué la lettre comme présente dans le mot.</p>
        <p class="alert alert-warning" v-if="letterIsExcluded">Vous avez indiqué la lettre comme absente du mot.</p>
        <div id="display-keyboard-letters" class="display-keyboard-letters mx-auto text-center">
            <ul class="alphabeticallist">
                <li v-for="(item, $index) in alphabeticallist" :class="[{isActive : toggleKeyPressed[$index]}, {isGoodPlaced : toggleGoodPlaced[$index]}, {isBadPlaced : toggleBadPlaced[$index]}, keyboardExclude, {notinword : toggleIsNotInWord[$index]} ]"  :key="$index">
                    <a href="#" @click.prevent="activeLetter($event);inputLetter($event);inputLetterExclude($event)"  :class="keyboardCase" data-testid="letter-input">{{ item }}</a>
                    <div class="display-control-letter">{{ item }}</div>
                </li>
                <li :class="{isActive: thisKeyPressed}">
                    <a href="#" @click.prevent="activeLetter($event);inputLetter($event)">-</a>
                    <div class="display-control-letter">-</div>
                </li>
                <li class="maj">
                    <a @click.prevent="isUppercase = !isUppercase" href="#" >⇧ Maj</a>
                </li>
                <li class="special-keys exclude">
                    <a @click.prevent="toggleKeyboardExcludeInclude"  href="#">{{textKeyboardExcludeInclude}}</a>
                </li>
                <li v-on:click.prevent="reset" class="special-keys reset">
                    <a href="#">Effacer tout</a>
                </li>
                <li class="backspace">
                    <a @click.prevent="suppressLetter" href="#">⌫</a>
                </li>
            </ul>
            <ul class="special-keys">

                <li v-on:click.prevent="getPossibleWords" class="validate">
                    <a class="fw-bold" href="#">Chercher</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
    import {resetGame, setInputLetters} from '../../store/actions';
    import {searchWords} from '../../store/actions';
    import {gameState} from '../../store/gameState';
    const SOUND_GOOD = new URL("../../assets/sounds/lettre-bien-place.wav",import.meta.url).href;
    const SOUND_BAD = new URL("../../assets/sounds/lettre-mal-place.wav",import.meta.url).href;
    const SOUND_MISS = new URL("../../assets/sounds/lettre-non-trouve.wav",import.meta.url).href;
    type ToggleArray = boolean[];
    type LetterState = {
        letter: string;
        state?: string;
    };
    type Letter = string
    export default{
        name: 'SearchForm',
        data(){
            return{
                active: false as boolean,
                tabInputLetters : [] as string[],
                inputLetters: "" as string,
                tabInputWrongLetters: [] as unknown as string,
                inputWrongLetters: "" as string,
                toggleKeyPressed: Array(26).fill(false) as ToggleArray,
                toggleIsNotInWord: Array(26).fill(false) as ToggleArray,
                toggleGoodPlaced: Array(26).fill(false) as ToggleArray,
                toggleBadPlaced: Array(26).fill(false) as ToggleArray,
                thisKeyPressed: false as boolean,
                alphabeticallist: [] as string[],
                isUppercase: false as boolean,
                isExcludeActive: false as boolean,
                textKeyboardExcludeInclude: "Mode lettres à exclure" as string,
                heightToScrollOnce: 0 as number,
                nothingToSearch: "" as string,
                firstLetterLowerCase: "" as string,
                letterIsIncluded: false as boolean,
                letterIsExcluded: false as boolean,
                letterTwoStates: [] as string[],
                gameState
            }
        },
        methods: {
            toggleKeyboardExcludeInclude(){
                this.isExcludeActive = !this.isExcludeActive;
                this.isExcludeActive == true ? this.textKeyboardExcludeInclude = 'Mode lettres à inclure' : this.textKeyboardExcludeInclude = 'Mode lettres à exclure'
            },
            activeLetter($event){
                let alphabet = "azertyuiopqsdfghjklmwxcvbn";
                let pressedLetter = $event.target.innerText;
                let pos = 0;

                this.nothingToSearch = false;
                if(pressedLetter == "-"){
                    this.thisKeyPressed = true;
                    setTimeout(()=>{
                        this.thisKeyPressed = false;
                        },500)
                }
                else{
                    pos = alphabet.indexOf(pressedLetter);
                    for (let elem of document.querySelectorAll('.display-keyboard-letters li')) {
                        if(elem.innerText.toLowerCase() == pressedLetter ){
                            this.toggleKeyPressed.splice(pos,1,true);
                            setTimeout(()=>{
                                this.toggleKeyPressed.splice(pos,1,false);
                            },500)
                        } 
                    }
                }
            },
            desactiveLetter(){
                for (let i = 0; i< this.toggleKeyPressed.length ; i++) {
                    if (this.toggleKeyPressed[i] == true){
                        this.toggleKeyPressed[i] = false;
                    }
                }
            },
            suppressLetter(){
                let alphabet = "azertyuiopqsdfghjklmwxcvbn";
                if(this.inputLetters.length != 0){
                    let pos = alphabet.indexOf(this.inputLetters[this.inputLetters.length-1].toLowerCase());
                    this.toggleGoodPlaced.splice(pos,1,false);
                    this.toggleBadPlaced.splice(pos,1,false);
                    this.inputLetters = this.inputLetters.substring(0,this.inputLetters.length - 1);
                    this.tabInputLetters.pop();
                    setInputLetters(this.inputLetters);
                }
            },
            playSound(sound: string): void {
                if (this.soundActive) {
                    new Audio(sound).play();
                }
            },
            inputLetter($event: MouseEvent): void{
                this.firstLetterLowerCase = false;
                this.letterIsIncluded = false;
                this.letterIsExcluded = false;
                if(!this.isExcludeActive){
                    const target = $event.target as HTMLElement;
                    const inputLetter: string = target.innerText;

                    const alphabet: string = "azertyuiopqsdfghjklmwxcvbn-";
                    let pos: number = 0;
                   
                    if(this.inputWrongLetters.includes(inputLetter) || this.inputWrongLetters.includes(inputLetter.toLowerCase()) ){
                         this.letterIsExcluded = true;
                         return
                    }

                    pos = alphabet.indexOf(inputLetter.toLowerCase());
                     // -------------------------
                     // CASE "-"
                     // -------------------------
                    if(inputLetter =="-"){
                        this.tabInputLetters.push(inputLetter);
                        this.inputLetters = this.tabInputLetters.join('');
                        this.playSound(SOUND_MISS);
                    }
                    // -------------------------
                    // MAJUSCULE = GOOD PLACE
                    // -------------------------
                    else if(inputLetter != inputLetter.toLowerCase()){
                        this.tabInputLetters.push(inputLetter);
                        this.inputLetters = this.tabInputLetters.join('');
                        this.toggleGoodPlaced.splice(pos,1,true);
                        this.playSound(SOUND_GOOD);
                    }
                    // -------------------------
                    // MINUSCULE = BAD PLACE
                    // -------------------------
                    else if (inputLetter == inputLetter.toLowerCase()){ 
                        this.tabInputLetters.push(inputLetter);
                        this.inputLetters = this.tabInputLetters.join('');
                        this.veriFyFirstLetterMaj();
                        if (this.firstLetterLowerCase == true){
                            this.tabInputLetters.pop();
                            return;
                        } 
                        this.toggleBadPlaced.splice(pos,1,true);
                        this.playSound(SOUND_BAD);
                    }
                    gameState.inputLetters = this.inputLetters;
                }
            },
            inputLetterExclude: function($event){
                if(this.isExcludeActive){
                    this.isUppercase = false;
                    let pos = 0;
                    let alphabet = "azertyuiopqsdfghjklmwxcvbn";
                    this.alphabeticallist = alphabet.split("");
                    let inputWrongLetter = $event.target.innerText.toLowerCase();
                    
                    // remplissage affichage des lettres fausses
                    pos = alphabet.indexOf(inputWrongLetter);

                   // affichage des lettres fausses
                    if(this.toggleIsNotInWord[alphabet.indexOf(inputWrongLetter)] == false){
                        if(this.inputLetters.indexOf(inputWrongLetter.toUpperCase()) != -1){
                            this.letterTwoStates.push(inputWrongLetter);
                            this.inputWrongLetters = this.tabInputWrongLetters.join('');
                            this.toggleIsNotInWord.splice(pos,1,true);
                        }else if(this.inputLetters.indexOf(inputWrongLetter) != -1){
                            this.letterIsIncluded = true;
                        }
                        else{
                            this.tabInputWrongLetters.push(inputWrongLetter);
                            this.inputWrongLetters = this.tabInputWrongLetters.join('');
                            this.toggleIsNotInWord.splice(pos,1,true);
                        }
                        
                    // suppression des lettres fausses
                    }else{
                        if(this.inputLetters.toLowerCase().indexOf(inputWrongLetter) != -1){
                            this.letterTwoStates.splice(this.letterTwoStates.indexOf(inputWrongLetter),1);
                        }else{
                            this.tabInputWrongLetters.splice(this.tabInputWrongLetters.indexOf(inputWrongLetter),1);
                        }
                        this.inputWrongLetters = this.inputWrongLetters.replace(`${inputWrongLetter}`,'');
                        this.toggleIsNotInWord.splice(pos,1,false);

                    }
                }
            },
            veriFyFirstLetterMaj: function(){
                if(!this.isWordle){
                    let verifyFirstLetter = this.inputLetters.split('');
                    if(verifyFirstLetter.length != 0){
                       if(verifyFirstLetter[0] === verifyFirstLetter[0].toUpperCase()){
                            this.firstLetterLowerCase = false;
                        }else{
                            this.firstLetterLowerCase = true
                        }
                    }
                }
            },
            getPossibleWords: function(){
                let wordlength = 0;
                let regExWord = "";
                let exclude = "";
                let search = "";
                let unknown = "";
                let include = "";
                let letterTwoStates = "";
                
                // ajout des lettres déjà jouées mais qui n'apparaitront plus
                for(let i = 0 ; i < this.letterTwoStates.length ; i++){
                    letterTwoStates +='(?!'+this.letterTwoStates[i]+')'
                }
                //construction de la RegEx
                let splitInputLetters = this.inputLetters.split('');
                
                for(let i = 0 ; i < splitInputLetters.length ; i++){
                    if(splitInputLetters[i] === "-"){
                        search += letterTwoStates+'.'
                    }
                    else if (splitInputLetters[i] === splitInputLetters[i].toUpperCase()){
                        search += splitInputLetters[i].toLowerCase(); 
                    }else if (splitInputLetters[i] === splitInputLetters[i].toLowerCase()){
                        include += '(?=.*' + splitInputLetters[i] + ')';
                        search += '(?!'+ splitInputLetters[i]+')' + letterTwoStates + '.';
                    }
                }
                wordlength = this.inputLetters.length;
                if (wordlength){
                    exclude = '(?!.*['+this.inputWrongLetters+'])';
                    regExWord = new RegExp(`${exclude}${include}${search}${unknown}`);
                }
                //console.log("regExWord : ",regExWord)
                if(regExWord.length != 0)
                {
                    this.nothingToSearch = false;
                    searchWords(regExWord,wordlength);
                }else{
                    this.nothingToSearch = true;
                }
                
            },
            reset:function(){
                this.firstLetterLowerCase = "",
                this.nothingToSearch = "";
                this.active = false;
                this.tabInputLetters  = [];
                this.inputLetters = "";
                this.tabInputWrongLetters = [];
                this.inputWrongLetters ="";
                this.toggleIsNotInWord = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
                this.toggleKeyPressed = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
                this.toggleGoodPlaced = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                this.toggleBadPlaced = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                this.isUppercase = false;
                this.isExcludeActive = false;
                this.letterIsIncluded = false;
                this.letterIsExcluded = false;
                this.textKeyboardExcludeInclude = "Mode lettres à exclure";
                this.letterTwoStates = [];
                console.log("resetGame in Form Vue")
                resetGame();
                console.log(
                    gameState.regExWord,
                    gameState.wordlength,
                    gameState.searchVersion
                );

            }
        },
        computed: {
            keyboardCase:function(){
                return{
                    uppercase: this.isUppercase,
                }
            },
            keyboardExclude:function(){
                return{
                    excludeActive: this.isExcludeActive
                }
            },
            universe:function(){
                return{
                    wordle: this.isWordle
                }
            },
             soundActive() {

                return gameState.soundEnabled;
            },
            isWordle() {
                return this.$route.name === 'wordle'
            }

        },
        created(){
            //console.log("created and is wordle equal to : ", this.isWordle);
            let alphabet = "azertyuiopqsdfghjklmwxcvbn";
            this.alphabeticallist = alphabet.split("");
        }
    }
</script>
<style scoped>
    @import './Form.css';
</style>