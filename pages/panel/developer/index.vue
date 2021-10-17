<template>
        <section id="main" class="full">
        <nuxt-link to="/panel/" id="back">
            <div class="flexbox align-center" style="margin-bottom: 20px; background: #fefefe; max-width: 200px; width: 100%; padding-left: 10px; padding-right: 10px;">
                <fa icon="arrow-alt-circle-left" style="font-size: 2em; color: #5352ed; margin-right: 20px;" /> <p style="color: #5352ed">Torna alla home</p>
            </div>
        </nuxt-link>
        <h1> Pannello developer </h1>
            <div class="container" style="align-center">
                <div style="width:100%;margin-left:auto;margin-right:auto">
                    <h3>Elenco funzioni developer:</h3>
                    <ul class="fancy-list noborder ibm">
                        <li><a class="normal" href="/panel/developer/webhooks">Registrazione webhook</a></li>
                        <li><a class="normal" href="/panel/developer/webhooks/list">Elenco webhooks</a></li>
                    </ul>
                </div>
            </div>
       </section>
</template>
<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
    layout: 'panel',
    data: () => {
        return {
            
        };
    },
    methods: {
        
    }
})
</script>