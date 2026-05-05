<template>
    <div id="header-top" class="header-top tusmo">
        <h1 v-html="titreHTML" class="p-2"></h1>
        <a class="sound-element" @click="soundAction()" href="#">
            <img v-if="soundActive" src="../../assets/images/sound-on.jpg" />
            <img v-else src="../../assets/images/sound-off.jpg" />
        </a>
         <div class="intro col-md-7 mx-auto">
            <p>Voici un Solver pour le jeu<a href="https://www.tusmo.xyz/" target="_blank">tusmo</a> <img src="./../../assets/images/tusmo-visuel.png" alt="visuel sotum" /></p>
            <p>Entrez tel qu'affiché sur Tusmo une majuscule pour une <span class="color-good-place">lettre</span> bien placée, une minuscule pour une <span class="color-bad-place">lettre</span> mal placée et un tiret (-) pour une <span class="color-grid text-white">lettre</span> inconnue. Eliminez des lettres en activant "Mode lettres à exclure". Enfin lancer la recherche en cliquant sur "Chercher".
            </p>
        </div>
    </div>
</template>
<script>
    import {EventBus} from '../../event-bus.js'
    export default{
        name: 'HeaderTusmo',
        data(){
            return{
                istusmo: false,
                titreHTML: '<span class="color-good-place">S</span><span>o</span><span>l</span><span class="color-good-place">v</span><span>e</span><span>r</span><br><span class="color-bad-place">T</span><span class="color-bad-place">u</span><span>s</span><span>m</span></span><span>o</span>',
                soundActive : false
            }
        },
        methods: {
            soundAction(){
                this.soundActive = !this.soundActive;
                EventBus.$emit('soundAction',this.soundActive); 
            }
        }
    }
</script>
<style>
    @import './HeaderTusmo.css';
</style>