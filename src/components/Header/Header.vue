<template>
    <div id="header-top" class="header-top">
        <h1 v-html="titreHTML" class="p-2"></h1>
        <a class="sound-element" @click="soundAction()" href="#">
            <img v-if="soundActive" src="../../assets/images/sound-on.jpg" />
            <img v-else src="../../assets/images/sound-off.jpg" />
        </a>
        <div class="intro col-md-7 mx-auto">
            <p class="intro-first-line">Voici un <a href="#anchor" class="anchor" aria-label="Go to Solver">Solver <span class="font-weight-bold p-0">&darr;</span></a> pour le jeu <a href="https://sutom.nocle.fr/" target="_blank" class="sutom-color">Sutom</a> qui fonctionne également pour son équivalent <a href="https://www.tusmo.xyz/" target="_blank" class="tuzmo-color">Tusmo</a> et pour la variante <a href="https://www.tusmo.xyz/" target="_blank" class="wordle-color">Wordle</a> (première lettre du mot à deviner aussi)</p>
            <p>Entrez tel qu'affiché sur les trois jeux une<span class="text-uppercase">majuscule</span>pour une <span class="color-good-place tile">lettre</span> bien placée, une minuscule pour une <span class="bad-place tile">lettre</span> mal placée et un<span class="color-grid tile">tiret (-) </span> pour une lettre inconnue.<br />
            Eliminez des lettres en activant <span class="color-grid tile">"Mode lettres à exclure"</span>.<br />
            Lancez la recherche en cliquant sur <span class="search-button">Chercher</span></p>
            <p>Les résultats de la recherche sont ensuite fournis en dessous&nbsp;<a href="#anchor" class="anchor">(*)</a> :</p>
            <p><strong>Le solveur</strong> est affiché en premier. Les jeux Sutom, Tuzmo et Wordle sont affichés en dessous afin de vous permettre de jouer tout en vous aidant du solveur pour résoudre les grilles. Vous pouvez passer à la grille suivante à tout moment. Vous pouvez passer également d'un jeu à l'autre sans perdre votre progression.</p>
            <p class="mt-2"><a name="anchor"></a></p>
            <p>BONNE CHANCE ET AMUSEZ-VOUS BIEN !</p>
            <p class="font-smaller">
            (*) : Le solver se base sur une liste de mots français courants, il est donc possible que certains mots soient manquants. N'hésitez pas à me signaler les mots manquants ou à me proposer des améliorations.</p>    
        </div>
    </div>
</template>
<script>
    import {EventBus} from '../../event-bus.js'
    export default{
        name: 'AppHeader',
        data(){
            return{
                titreHTML: '<span class="color-good-place">S</span><span>o</span><span>l</span><span class="color-good-place">v</span><span>e</span><span>r</span><br><span class="color-bad-place">S</span><span>u</span><span class="color-bad-place">t</span><span>o</span><span>m</span>',
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
<style scoped>
    @import './Header.css';
</style>