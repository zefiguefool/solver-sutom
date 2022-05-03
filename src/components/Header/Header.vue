<template>
    <div id="header-top" class="header-top">
        <h1 v-html="titreHTML" class="p-2">{{ titreHTML }}</h1>
        <a class="sound-element" @click="soundAction()" href="#">
            <img v-if="soundActive" src="../../assets/images/sound-on.jpg" />
            <img v-else src="../../assets/images/sound-off.jpg" />
        </a>
        <div class="intro col-md-5 mx-auto">
        <p>Voici un Solver pour le jeu <a href="https://sutom.nocle.fr/" target="_blank">sutom</a> <img src="./../../assets/images/sutom-visuel.jpeg" alt="visuel sotum" /></p>
        <p>Entrez tel qu'affiché sur sotum une <span class="text-uppercase">majuscule</span> pour une <span class="color-good-place">lettre</span> bien placée, une minuscule pour une <span class="bad-place">lettre</span> mal placée et un <span class="color-grid">tiret (-)</span> pour une lettre inconnue. Eliminez des lettres en activant "Mode lettres à exclure". Enfin lancer la recherche en cliquant sur "Chercher".
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
                titreHTML: '<span class="color-good-place">S</span><span>o</span><span>l</span><span class="color-good-place">v</span><span>e</span><span>r</span><br><span class="color-bad-place">S</span><span>u</span><span class="color-bad-place">t</span><span>o</span><span>m</span>',
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
<style scoped>
    @import './Header.css';
</style>