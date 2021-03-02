<template>
    <div class="loading-spinner flexbox align-center justify-center">
        <fa icon="circle-notch" />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import gsap, { Power2 } from 'gsap';

export default Vue.extend({
    methods: {
        hide(){
            gsap.to(this.$el, { opacity: 0, pointerEvents: 'none', duration: .5, ease: Power2.easeInOut })
        }
    }
})
</script>
<style lang="scss" scoped>
    
    @import '@/assets/scss/partials/colors';

    .loading-spinner{
        position: absolute;
        width: 100%;
        z-index: 150;
        height: 100%;
        background: $blue;
        svg{
            font-size: 5vw;
            color: rgba(255,255,255,0.75);
            animation: spin 1s infinite linear;
        }
    }
    @keyframes spin{
        to{ transform: rotate(360deg); }
    }

</style>