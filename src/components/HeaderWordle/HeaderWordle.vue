<template>
    <div id="header-top" class="header-top wordle">
        <h1 v-html="titreHTML" class="p-2">{{ titreHTML }}</h1>
        <a class="sound-element" @click="soundAction()" href="#">
            <img v-if="soundActive" src="../../assets/images/sound-on.jpg" />
            <img v-else src="../../assets/images/sound-off.jpg" />
        </a>
         <div class="intro col-md-5 mx-auto">
            <p>Voici un Solver pour le jeu <a href="https://wordle.louan.me/" target="_blank">wordle</a> <img src="./../../assets/images/wordle-visuel.jpg" alt="visuel sotum" /></p>
            <p>Entrez tel qu'affiché sur wordle une majuscule pour une <span class="color-good-place">lettre</span> bien placée, une minuscule pour une <span class="color-bad-place">lettre</span> mal placée et un tiret (-) pour une <span class="color-grid text-white">lettre</span> inconnue. Eliminez des lettres en activant "Mode lettres à exclure". Enfin lancer la recherche en cliquant sur "Chercher".
            </p>
        </div>
    </div>
</template>
<script>
    import {bus} from '../../main'
    export default{
        name: 'Header',
        data(){
            return{
                isWordle: false,
                titreHTML: '<span class="color-good-place">S</span><span>o</span><span>l</span><span class="color-good-place">v</span><span>e</span><span>r</span><br><span class="color-bad-place">W</span><span>o</span><span class="color-bad-place">r</span><span>d</span><span>l</span></span><span>e</span>',
                soundActive : false
            }
        },
        methods: {
            soundAction:function(){
                this.soundActive = !this.soundActive;
                bus.$emit('soundAction',this.soundActive); 
            }
        }
    }
</script>
<style>
    @import './HeaderWordle.css';
</style>