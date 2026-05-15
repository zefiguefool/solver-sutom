<template>
    <div id="header-top" class="header-top tusmo">
        <h1 v-html="titreHTML" class="p-2"></h1>
        <a class="sound-element" @click="soundAction()" href="#">
            <img v-if="soundActive" src="../../assets/images/sound-on.jpg" />
            <img v-else src="../../assets/images/sound-off.jpg" />
        </a>
         <div class="intro col-md-7 mx-auto">
            <!-- <p>Voici un Solver pour le jeu<a href="https://www.tusmo.xyz/" target="_blank">tusmo</a> <img src="./../../assets/images/tusmo-visuel.png" alt="visuel sotum" /></p>
            <p>Entrez tel qu'affiché sur Tusmo une majuscule pour une <span class="color-good-place">lettre</span> bien placée, une minuscule pour une <span class="color-bad-place">lettre</span> mal placée et un tiret (-) pour une <span class="color-grid text-white">lettre</span> inconnue. Eliminez des lettres en activant "Mode lettres à exclure". Enfin lancer la recherche en cliquant sur "Chercher".
            </p> -->
            <p class="intro-first-line">Comment utiliser le <a href="#anchor" class="anchor" aria-label="Go to Solver">Solver <span class="font-weight-bold p-0">&darr;</span></a> pour Tusmo ?</p>
            <ul>
                <li><span class="color-good-place tile">A</span> ---- → lettre bien placée</li>
                <li><span class="bad-place tile p-1">a</span> ---- → lettre présente mal placée</li>
                <li><span class="color-grid tile">-</span> ---- → lettre inconnue</li>
                <li><span class="color-grid tile">"Mode lettres à exclure"</span> ---- → éliminer des lettres</li>
                <li><span class="search-button">Chercher</span> ---- → lancer la recherche</li>
            </ul>
            <details open name="details-infos" class="details-infos">
                <summary class="relative"><span>Plus d'informations sur le <a href="#anchor" class="anchor" aria-label="Go to Solver">solver</a></span></summary>
                <div class="more-infos text-left">
                    <p class="text-left pb-2">Fonctionne pour les jeux <a href="https://sutom.nocle.fr/" target="_blank" title="Aller sur le site de Sutom"
                            class="sutom-color underline">Sutom<i class="fi fi-sc-up-right-from-square"></i></a>, <a
                            href="https://www.tusmo.xyz/" target="_blank" title="Aller sur le site de Tusmo" class="tuzmo-color underline">Tusmo<i class="fi fi-sc-up-right-from-square"></i></a> et <a href="https://www.tusmo.xyz/" target="_blank" title="Aller sur le site de Wordle" class="wordle-color underline">Wordle<i class="fi fi-sc-up-right-from-square"></i></a>
                    </p>
                    <p><strong>Le solveur</strong> est affiché en premier. Les jeux Sutom, Tuzmo et Wordle sont affichés
                        en dessous afin de vous permettre de jouer tout en vous aidant du solveur pour résoudre les
                        grilles. Vous pouvez passer à la grille suivante à tout moment. Vous pouvez passer également
                        d'un jeu à l'autre sans perdre votre progression.</p>
                    <p>Le solver se base sur une liste de mots français courants, il est donc possible que certains mots
                        soient manquants. N'hésitez pas à me signaler les mots manquants ou à me proposer des
                        améliorations.</p>
                </div>
            </details>
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