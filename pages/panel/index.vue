<template>
    <section id="main">
        <h1 class="main" style="margin: 0;"> Ciao, {{ $store.getters.getUser.name }} </h1>
    </section>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    layout: 'panel',
    data(){
        return {
            items: []
        }
    },
    created(){

        console.log(this.$store);
        
    },
    methods: {
    },
    head(){
        return {
            title: 'appunti.me — admin',
            meta: [
                {
                    hid: 'theme-color',
                    name: 'theme-color',
                    content: '#5352ed'
                }
            ]
        }
    }
})
</script>