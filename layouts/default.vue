<template>
  <div>
    <div id="navbar" class="flexbox justify-between" style="background: #5352ed;">
      <span id="logo" class="bright">
        <a href="/" style="text-decoration: none; color: inherit;">appunti.me</a>
      </span>
      <div id="desktop">
        <a href="/"><nav class="bright">home</nav></a>
        <a href="/subjects"><nav class="bright">materie disponibili</nav></a>
        <a href="/login"><nav class="bright"><b>login</b></nav></a>
      </div>
      <div id="mobile-toggle" @click="toggleMenu">
        <div class="bar first"></div>
        <div class="bar second"></div>
      </div>
    </div>
    <div id="mobile-menu" class="flexbox align-center justify-center">
        <ul>
            <li><a href="/"><nav class="bright">home</nav></a></li>
            <li><a href="/subjects"><nav class="bright">materie disponibili</nav></a></li>
            <li><a href="/login"><nav class="bright"><b>login</b></nav></a></li>
        </ul>
    </div>
    <Nuxt />
  </div>
</template>

<style lang="scss">

    @import '@/assets/scss/style.scss';
    #mobile-toggle{
        display: none;
        width: 25px;
        .bar{
            background: #fefefe;
            width: 100%;
            height: 1px;
            margin-bottom: 7.5px;
        }
    }
    #mobile-menu{
        display: none;
        position: fixed;
        z-index: 199;
        top: 80px;
        height: calc(100vh - 80px);
        width: 100%;
        left: 100vw;
        background: $blue;
        ul{
            margin-top: -80px;
            padding: 0;
            list-style: none;
            li{
                font-family: 'IBM Plex Sans', sans-serif;
                margin-top: 10px;
                opacity: 0;
                transform: translateY(50px);
                a{
                    color: $white;
                    text-decoration: none;
                }
                width: 100%;
                font-size: 10vw;
            }
        }
    }
    @media screen and (max-width: 500px) {
        #mobile-toggle{
            display: block;
        }
        #mobile-menu{
            display: flex;
        }
    }

</style>
<script lang="ts">
import Vue from 'vue'
import { TimelineMax, Power2 } from 'gsap';
export default Vue.extend({
    data(){
        return {
            timeline: new TimelineMax({ paused: true })
        }
    },
    methods: {

        toggleMenu(){

            if(this.timeline.reversed())
                this.timeline.play();
            else this.timeline.reverse();

        }

    },
    mounted(){
        this.timeline.to('.bar.first', {
            duration: .25,
            ease: Power2.easeInOut,
            transform: 'rotate(45deg) translateY(6px)'
        })
        this.timeline.to('.bar.second', {
            duration: .25,
            ease: Power2.easeInOut,
            transform: 'rotate(-45deg) translateY(-6px)'
        }, 0)
        this.timeline.to('#mobile-menu', {
            duration: .5,
            ease: Power2.easeInOut,
            left: 0
        })
        this.timeline.to('#mobile-menu li', {
            duration: .5,
            opacity: 1,
            ease: Power2.easeOut,
            transform: 'translateY(0)',
            stagger: .1
        })
        // this.timeline.to('.')

        this.timeline.reversed(true);
    }
})
</script>