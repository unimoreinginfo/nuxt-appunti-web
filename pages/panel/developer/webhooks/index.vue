<template>
        <section id="main" class="full">
        <nuxt-link to="/panel/developer" id="back">
            <div class="flexbox align-center" style="margin-bottom: 20px; background: #fefefe; max-width: 200px; width: 100%; padding-left: 10px; padding-right: 10px;">
                <fa icon="arrow-alt-circle-left" style="font-size: 2em; color: #5352ed; margin-right: 20px;" /> <p style="color: #5352ed">Pannello developer</p>
            </div>
        </nuxt-link>
                <h1>Registrazione webhooks</h1>
                <p>Qui potrai registrare webhook per ricevere notifiche riguardo agli appunti appena caricati.<br>
                <a class="normal" href="https://it.wikipedia.org/wiki/Webhook" > Che cos'è un webhook?</a><br>
                <a class="normal" href="https://github.com/unimoreinginfo/node-appunti-web/tree/master/docs/webhooks"> Qui</a>
                trovi un'implementazione in Nodejs del nostro protocollo. In questa pagina potrai ottenere le credenziali per validare gli webhook che ti vengono inviati.
                </p>
                <div class="container" style="align-center">
                <div style="width:100%;margin-left:auto;margin-right:auto">
                    <form @submit.prevent="registerWebhook">
                        <div class="flexbox" style="flex-direction:column;">
                            <input type="text" class="fancy" v-model="name" placeholder="Nome">
                            <input type="text" class="fancy" v-model="url" placeholder="URL webhook"> 
                            <div class="flexbox align-center">
                                <button class="fancy" style="margin-right: 10px;"><span>Registra</span></button>
                                <span style="color: white;">{{ message }}</span>
                            </div>
                        </div>
                    </form>
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
            name: "",
            url: "",
            message: ""
        };
    },
    methods: {
        async registerWebhook() {
            try {

                let response = await (this as any).$api.methods.webhooks.notes.create(this.name, this.url)
                this.message = `clientId: ${response.credentials.client_id}\n clientSecret: ${response.credentials.client_secret}` 

            } catch(err) {

                let status = (err as AxiosError).response!.status 
                if (status === 400){
                    if ((err as AxiosError).response!.data.error === "invalid_url")
                        this.message = "L'URL è invalido: ricordati che deve essere https!"
                    else 
                        this.message = "Tutti i parametri sono obbligatori"

                    return
                }
                this.message = "Errore del server..."
            }
        }
    }
})
</script>