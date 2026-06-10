<template>
  <div class="wrapper-nav ">
    <ul :class="myClass" class="nav">
        <li id="sutom" data-testid="nav-sutom">
            <router-link
                to="/solvami/sutom"
                class="sutom btn btn-primary btn-nav"
                @click="isActive = false"
                id="sutom">
                <span class="color-grid">S</span><span>u</span><span class="color-letter-bad-place">t</span><span>o</span><span>m</span>
            </router-link>
        </li>

        <li id="tusmo" data-testid="nav-tusmo">
            <router-link
                to="/solvami/tusmo"
                class="tusmo btn btn-primary btn-nav"
                @click="isActive = false"
                >
                <span class="color-good-place">T</span><span>u</span><span class="color-letter-bad-place">s</span><span>m</span><span>o</span>
            </router-link>
        </li>

        <li id="wordle" data-testid="nav-wordle">
            <router-link
                to="/solvami/wordle"
                class="wordle btn btn-primary btn-nav"
                @click="isActive = false"
                >
                <span class="color-wordle-ok">W</span><span>o</span><span class="color-letter-bad-place">r</span><span>d</span><span>l</span><span>e</span>
            </router-link>
        </li>
     </ul>
      <div class="box">
            <div @click="isActive = !isActive" :class="myClass" class="contLigne btn1">
                <div class="lignes"></div>
                <div class="lignes"></div>
                <div class="lignes"></div>
            </div>
        </div>
  </div>
</template>
<script>
    export default {
        name: 'NavigationMenu',
        components: {
        },
        data(){
            return{
                isActive: false
            }
        },
        computed: {
            myClass: function(){
                return{
                    active: this.isActive,
                }
            }
        }
    }
</script>
<style>
@import './Navigation.css';
    .btnnav{
        margin:5px
    }

    .btn-nav a, .btn-nav a:hover{
        color:#fff;
        text-decoration:none;
    }
</style>
