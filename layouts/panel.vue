<template>
  <div>
    <Navbar />
    <div id="panel-layout" class="flexbox align-top justify-between" style="width: 80%; margin: 0 auto; margin-top: 120px">
        <div id="panel-sidebar">
            <ul class="fancy-list noborder ibm">
                <a href="/panel"><li><fa icon="list-alt" class="right" /> Riepilogo</li> </a>
                <a href="/panel/upload"><li> <fa icon="upload" class="right" /> Carica appunti </li></a>
                <a href="/panel/edit"><li> <fa icon="edit" class="right" /> Tutti i tuoi appunti</li></a> 
                <a href="/panel/settings"><li> <fa icon="cog" class="right" /> Impostazioni profilo </li></a>
                <a href="/panel/developer"><li> <fa icon="cog" class="right" /> Pannello developer </li></a>
                <li @click="logout"> <fa icon="sign-out-alt" class="right" /> Logout </li>
            </ul>
        </div>
        <Nuxt style="flex: 1; margin-left: 30px; position: relative; min-height: calc(100vh - 120px)" />
    </div>
  </div>
</template>

<style lang="scss">

    @import '@/assets/scss/style.scss';
    #panel-sidebar{
        width: 250px;
    }
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
    @media screen and (max-width: 768px) {
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
import { methods } from '@/lib/api'

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

        },
        logout(){

            methods.clearCookies();
            this.$store.commit('notLogged')
            this.$router.push('/');

        },

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