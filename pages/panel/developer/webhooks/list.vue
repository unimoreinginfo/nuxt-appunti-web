<template>
        <section id="main" class="full">
        <nuxt-link to="/panel/developer" id="back">
            <div class="flexbox align-center" style="margin-bottom: 20px; background: #fefefe; max-width: 200px; width: 100%; padding-left: 10px; padding-right: 10px;">
                <fa icon="arrow-alt-circle-left" style="font-size: 2em; color: #5352ed; margin-right: 20px;" /> <p style="color: #5352ed">Pannello developer</p>
            </div>
        </nuxt-link>
                <h1>Elenco webhooks</h1>
                <ul class="fancy-list">
                    <li v-for="webhook in webhooks" :key="webhook.client_id">
                        <h3>{{webhook.title}}</h3>
                        <p>Client ID: {{webhook.client_id}} <br> Client Secret: {{webhook.client_secret}}</p>
                    </li>
                </ul>
                <div class="container" style="align-center">
                <div style="width:100%;margin-left:auto;margin-right:auto">
                    
                </div>
            </div>
       </section>
</template>
<script lang="ts">

import { AxiosError } from 'axios';
import Vue from 'vue'

export default Vue.extend({
    layout: 'panel',
    data: () => {
        return {
            webhooks: [] as any 
        };
    },
    async mounted(){
        try{
            
            this.webhooks = (await (this as any).$api.methods.webhooks.notes.list()).webhooks

        }catch(err) {
            alert("Qualcosa è andato stortissimo")
            console.log(err)
        }
    },
    methods: {
        
    }
})
</script>