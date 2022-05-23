<template>  
    <div :class="universe" class="form px-2 text-center">
        <p class="alert alert-warning" v-if="nothingToSearch">Saisissez un critère de recherche</p>
        <p class="alert alert-warning" v-if="firstLetterLowerCase">À Sutom la première lettre est connue. Tapez une majuscule en 1<sup>ère</sup> lettre</p>
        <p class="alert alert-warning" v-if="letterIsIncluded">Vous avez indiqué la lettre comme présente dans le mot.</p>
        <p class="alert alert-warning" v-if="letterIsExcluded">Vous avez indiqué la lettre comme absente du mot.</p>
        <div id="display-keyboard-letters" class="display-keyboard-letters mx-auto col-md-4 px-2 text-center">
            <ul>
                <li v-for="(item, $index) in alphabeticallist" :class="[{isActive : toggleKeyPressed[$index]}, {isGoodPlaced : toggleGoodPlaced[$index]}, {isBadPlaced : toggleBadPlaced[$index]}, keyboardExclude, {notinword : toggleIsNotInWord[$index]} ]"  :key="$index">
                    <a @click.prevent="" @mousedown.prevent="activeLetter($event);inputLetter($event);inputLetterExclude($event)"  :class="keyboardCase" href="#">{{ item }}</a>
                    <div class="display-control-letter">{{ item }}</div>
                </li>
                <li :class="{isActive: thisKeyPressed}">
                    <a href="#" @click.prevent="activeLetter($event);inputLetter($event)">-</a>
                    <div class="display-control-letter">-</div>
                </li>
                <li class="maj">
                    <a @click.prevent="isUppercase = !isUppercase" href="#" >⇧ Maj</a>
                </li>
                <li class="backspace">
                    <a @click.prevent="suppressLetter" href="#">⌫</a>
                </li>
            </ul>
            <ul>
                <li class="exclude">
                    <a @click.prevent="toggleKeyboardExcludeInclude"  href="#">{{textKeyboardExcludeInclude}}</a>
                </li>
                <li v-on:click.prevent="reset" class="reset">
                    <a href="#">Effacer tout</a>
                </li>
            </ul>
            <ul>
                <li v-on:click.prevent="getPossibleWords" class="validate">
                    <a href="#">Chercher</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {bus} from '../../main'
    export default{
        name: 'Form',
        data(){
            return{
                active: false,
                tabInputLetters : [],
                inputLetters: "",
                tabInputWrongLetters: [],
                inputWrongLetters: "",
                toggleKeyPressed: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                toggleIsNotInWord: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                toggleGoodPlaced: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                toggleBadPlaced: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
                thisKeyPressed: false,
                alphabeticallist : [],
                isUppercase: false,
                isExcludeActive: false,
                textKeyboardExcludeInclude: "Mode lettres à exclure",
                isWordle: false,
                heightToScrollOnce: 0,
                nothingToSearch: "",
                firstLetterLowerCase: "",
                letterIsIncluded: false,
                letterIsExcluded: false,
                soundActive: false,
                letterTwoStates: []
            }
        },
        methods: {
            toggleKeyboardExcludeInclude(){
                this.isExcludeActive = !this.isExcludeActive;
                this.isExcludeActive == true ? this.textKeyboardExcludeInclude = 'Mode lettres à inclure' : this.textKeyboardExcludeInclude = 'Mode lettres à exclure'
            },
            activeLetter($event){
                let alphabet = "abcdefghijklmnopqrstuvwxyz";
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
                let alphabet = "abcdefghijklmnopqrstuvwxyz-";
                if(this.inputLetters.length != 0){
                    let pos = alphabet.indexOf(this.inputLetters[this.inputLetters.length-1].toLowerCase());
                    this.toggleGoodPlaced.splice(pos,1,false);
                    this.toggleBadPlaced.splice(pos,1,false);
                    this.inputLetters = this.inputLetters.substring(0,this.inputLetters.length - 1);
                    this.tabInputLetters.pop();

                    bus.$emit('suppress');
                }
            },
            inputLetter($event){
                this.firstLetterLowerCase = false;
                this.letterIsIncluded = false;
                this.letterIsExcluded = false;
                if(!this.isExcludeActive){
                    let inputLetter = $event.target.innerText;
                    let alphabet = "abcdefghijklmnopqrstuvwxyz";
                    let pos = 0;
                   
                    if(this.inputWrongLetters.includes(inputLetter) || this.inputWrongLetters.includes(inputLetter.toLowerCase()) ){
                         this.letterIsExcluded = true;
                         return
                    }

                    pos = alphabet.indexOf(inputLetter.toLowerCase());
                    if(inputLetter =="-"){
                        this.tabInputLetters.push(inputLetter);
                        this.inputLetters = this.tabInputLetters.join('');
                        if(this.soundActive){
                            let audioObj = "";
                            let src = "";
                            src = require("../../assets/sounds/lettre-non-trouve.wav");
                            audioObj = new Audio(src);
                            audioObj.play();
                        }
                    }
                    else if(inputLetter != inputLetter.toLowerCase()){
                        this.tabInputLetters.push(inputLetter);
                        this.inputLetters = this.tabInputLetters.join('');
                        this.toggleGoodPlaced.splice(pos,1,true);
                        if(this.soundActive){
                            let audioObj = "";
                            let src = "";
                            src = require("../../assets/sounds/lettre-bien-place.wav");
                            audioObj = new Audio(src);
                            audioObj.play();
                        }
                    }
                    else if (inputLetter == inputLetter.toLowerCase()){ 
                        this.tabInputLetters.push(inputLetter);
                        this.inputLetters = this.tabInputLetters.join('');
                        this.veriFyFirstLetterMaj();
                        if (this.firstLetterLowerCase == true){
                            this.tabInputLetters.pop(inputLetter);
                            return;
                        } 
                        this.toggleBadPlaced.splice(pos,1,true);
                        if(this.soundActive){
                            let audioObj = "";
                            let src = "";
                            src = require("../../assets/sounds/lettre-mal-place.wav"); 
                            audioObj = new Audio(src);
                            audioObj.play();
                        }
                    }
                    bus.$emit('inputLetter',this.inputLetters); 
                }
            },
            inputLetterExclude: function($event){
                if(this.isExcludeActive){
                    this.isUppercase = false;
                    let pos = 0;
                    let alphabet = "abcdefghijklmnopqrstuvwxyz";
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
                        //search += '(?!'+splitInputLetters[i]+').';
                        search += '(?!'+ splitInputLetters[i]+')' + letterTwoStates + '.';
                    }
                }
                wordlength = this.inputLetters.length;
                if (wordlength){
                    exclude = '(?!.*['+this.inputWrongLetters+'])';
                    regExWord = new RegExp(`${exclude}${include}${search}${unknown}`);
                }
                console.log("regExWord : ",regExWord)
                if(regExWord.length != 0)
                {
                    this.nothingToSearch = false;
                    bus.$emit('getPossibleWords',{regExWord,wordlength});
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
                this.tabInputWrongLetters =[];
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
                bus.$emit('reset');
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
            }
        },
        created(){
            let alphabet = "abcdefghijklmnopqrstuvwxyz";
            this.alphabeticallist = alphabet.split("");
        
            bus.$on('getActiveLink',(rootPath) => {
                rootPath == '/wordle' ? this.isWordle = true : this.isWordle = false ; 
                this.firstLetterLowerCase = "";
            });
            bus.$on('soundAction',(soundActive) => {
                this.soundActive = soundActive;
            });

        }
    }
</script>
<style scoped>
    @import './Form.css';
</style>