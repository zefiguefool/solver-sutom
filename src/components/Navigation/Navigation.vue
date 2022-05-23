<template>
  <div class="wrapper-nav">
      <ul :class="myClass" class="nav">
          <li @click.stop.prevent="getActiveLink($event)" id="sotum" class="sutom btn btn-primary btn-nav"><router-link to="/sutom" exact><span class="color-letter-good-place">S</span><span >u</span><span class="color-letter-bad-place">t</span><span>o</span><span>m</span></router-link></li>
          <li @click.stop.prevent="getActiveLink($event)" id="wordle" class="wordle btn btn-primary btn-nav"><router-link to="/wordle"><span class="color-letter-bad-place">W</span><span>o</span><span class="color-letter-good-place">r</span><span>d</span><span>l</span><span>e</span></router-link></li>
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
    import {bus} from '../../main'
    export default {
        name: 'Navigation',
        components: {
        },
        data(){
            return{
                isActive: false
            }
        },
        methods:{
            getActiveLink($event){
                this.isActive = !this.isActive;
                let rootPath = $event.target.parentNode.getAttribute("href");
                bus.$emit('getActiveLink',rootPath);
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
