<template>
    <div id="header-top" class="header-top">
        <h1 v-html="titreHTML" class="py-2 ps-0 pe-4"></h1>
        <a class="sound-element" @click="soundAction()" href="#">
            <img loading="lazy" width="36" height="30" v-if="soundActive" src="../../assets/images/sound-on.jpg" />
            <img loading="lazy" width="30" height="25" v-if="soundActive" src="../../assets/images/sound-on.jpg" />
        </a>
        <div class="intro col-md-7 mx-auto small">
            <p class="text-center">Comment utiliser le Solver ? 
                <span class="text-dark fs-6 font-weight-bold underline">
                    <a href="#" title="Aller au Solver" @click="emitScroll" class="anchor link-dark" aria-label="Go to Solver">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-down-square" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
</svg>
                    </a>
                </span>
            </p>
            <ul class="change-color">
                <li class="first"><span class="color-good-place tile">A</span> = bien placée</li>
                <li class="second"><span class="bad-place tile p-1">a</span> = présente mal placée</li>
                <li class="third"><span class="color-grid tile">-</span> = inconnue</li>
                <li class="fourth"><span class="color-grid tile">"Mode lettres à exclure"</span> = éliminer des lettres</li>
                <li class="fifth"><span class="search-button">Chercher</span> = lancer la recherche</li>
                <li class="sixth">
                    <a href="#" aria-label="Go to Sutom" id="to-scroll" @click="emitScrollButton" class="to-scroll col-md-6 mx-auto"><span class="select-game">Sutom</span></a> - <a href="#"  aria-label="Go to tusmo"  @click="emitScrollButton" class="to-scroll col-md-6 mx-auto"><span class="select-game">Tusmo</span></a> - <a href="#" class="anchor" aria-label="Go to wordle"  @click="emitScrollButton"><span class="select-game active">Wordle</span></a> = Selectionner son jeu</li>
            </ul>
            <details name="details-infos" class="details-infos">
                <summary class="relative">
                    <span class="px-2 py-1 font-weight-bold bg-burlywood text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle align-text-top" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                        </svg>
                        
                        Plus d'informations sur le Solver
                    </span>
                </summary>
                <ul class="more-infos text-left font-smaller">
                    <li class="first text-left pb-2">
                        <i class="em em-white_check_mark" aria-role="presentation" aria-label="WHITE HEAVY CHECK MARK"></i>
                        Fonctionne pour les jeux <a href="https://sutom.nocle.fr/" target="_blank" title="Aller sur le site de Sutom"
                        class="sutom-color underline p-1">Sutom<i class="fi fi-sc-up-right-from-square"></i></a>, <a
                        href="https://www.tusmo.xyz/" target="_blank" title="Aller sur le site de Tusmo" class="tuzmo-color underline p-1">Tusmo<i class="fi fi-sc-up-right-from-square"></i></a> et <a href="https://www.tusmo.xyz/" target="_blank" title="Aller sur le site de Wordle" class="wordle-color underline p-1">Wordle<i class="fi fi-sc-up-right-from-square"></i></a>
                    </li>
                    <li class="second"><strong><i class="em em-abacus" aria-role="presentation" aria-label="ABACUS"></i> Le solveur</strong> est affiché en premier. Les jeux Sutom, Tuzmo et Wordle sont affichés
                        en dessous afin de vous permettre de jouer tout en vous aidant du solveur pour résoudre les
                        grilles. Vous pouvez passer à la grille suivante à tout moment. Vous pouvez passer également
                        d'un jeu à l'autre sans perdre votre progression.</li>
                    <li class="third"><i class="em em-abc" aria-role="presentation" aria-label="INPUT SYMBOL FOR LATIN LETTERS"></i> Le dictionnaire se base sur une liste de mots français courants issus du <a href="https://github.com/SergeMalderez/Lexique383_v2" target="_blank" title="Aller sur le site de Lexique383 V2" class="underline color-primary bg-secondary">Lexique383 V2</a>, il est donc possible que certains mots
                        soient manquants. N'hésitez pas à me signaler les mots manquants ou à me proposer des
                        améliorations sur le <a href="https://github.com/zefiguefool/solver-sutom" target="_blank" title="Aller sur le dépôt du projet" class="underline color-primary bg-secondary">dépôt gitHub <svg data-component="Octicon" aria-hidden="true" focusable="false" class="octicon octicon-mark-github" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" display="inline-block" overflow="visible" style="vertical-align:text-bottom"><path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943"></path></svg> du projet</a>.</li>
                    </ul>
                    <p class="text-center"><strong>BONNE CHANCE ET AMUSEZ-VOUS BIEN !</strong></p>
            </details>
        </div>
    </div>
</template>
<script>
    import {EventBus} from '../../event-bus.js'
    export default{
        name: 'HeaderWordle',
        data(){
            return{
                isWordle: false,
                titreHTML: '<span class="color-good-place">S</span><span class="wordle color-good-place">O</span><span class="color-good-place">L</span><br><span class="color-bad-place">&nbsp;</span><span class="color-good-place">V</span><span class="wordle color-good-place"">A</span><br><span class="wordle bad-place">M</span><span class="wordle color-good-place">I</span><span class="color-bad-place">&nbsp;</span>',
                soundActive : false
            }
        },
        methods: {
            soundAction(){
                this.soundActive = !this.soundActive;
                EventBus.$emit('soundAction',this.soundActive); 
            },
            emitScroll(){
                this.heightToScrollOnce =  document.getElementsByClassName('intro').item(0).clientHeight;
                //console.log("this.heightToScrollOnce",this.heightToScrollOnce);
                window.scrollBy({
                    top: this.heightToScrollOnce,
                    behavior: 'smooth'
                });
            },
            emitScrollButton(){
                this.heightToScrollOnce =  document.getElementsByClassName('intro').item(0).clientHeight + document.getElementsByClassName('fieldset-container-component').item(0).clientHeight;
                window.scrollBy({
                    top: this.heightToScrollOnce,
                    behavior: 'smooth'
                });
            }
        }
    }
</script>
<style>
    @import './HeaderWordle.css';
</style>