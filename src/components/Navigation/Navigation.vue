<template>
  <div class="wrapper-nav ">
    <ul :class="{ active: isActive }" class="nav">
        <li id="sutom" data-testid="nav-sutom">
            <router-link
                to="/solvami/sutom"
                @click="isActive = !isActive"
                :class="{ active: isActive }"
                class="sutom btn btn-nav"
                id="sutom">
                <span class="color-grid">S</span><span>u</span><span class="color-letter-bad-place">t</span><span>o</span><span>m</span>
            </router-link>
        </li>

        <li id="tusmo" data-testid="nav-tusmo">
            <router-link
                to="/solvami/tusmo"
                @click="isActive = !isActive"
                :class="{ active: isActive }"
                class="tusmo btn btn-nav"
                >
                <span class="color-good-place">T</span><span>u</span><span class="color-letter-bad-place">s</span><span>m</span><span>o</span>
            </router-link>
        </li>

        <li id="wordle" data-testid="nav-wordle">
            <router-link
                to="/solvami/wordle"
                @click="isActive = !isActive"
                :class="{ active: isActive }"
                class="sutom btn btn-nav"
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
    }
</script>
<style>
@import './Navigation.css';



    .btn-nav a, .btn-nav a:hover{
        color:#fff;
        text-decoration:none;
    }

</style>
