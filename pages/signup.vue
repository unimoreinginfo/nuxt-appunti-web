<template>
    <section class="full flexbox align-center justify-center">
        <div style="max-width: 670px; width: 100%; padding: 30px;">
                <h1 class="main" id="title" style="margin-bottom: 20px;"> Registrati </h1>
                <form @submit.prevent="signup"> 
                    <input class="fancy" placeholder="Indirizzo email" type="email" style="width: 100%;" v-model="email">
                    <div class="flexbox">
                        <input class="fancy" placeholder="Password" type="password" style="width: 100%" v-model="password">
                        <input class="fancy" placeholder="Conferma password" type="password" style="width: 100%" v-model="password_confirm">
                    </div>
                    <div class="flexbox">
                        <input class="fancy" placeholder="Nome" type="text" style="width: 100%" v-model="name">
                        <input class="fancy" placeholder="Cognome" type="text" style="width: 100%" v-model="surname">
                    </div>
                    <input class="fancy" placeholder="ID Unimore (il numero prima della mail istituzionale)" type="text" style="width: 100%" v-model="unimore_id">
                    <div class="flexbox justify-between align-center to-block" style="margin-bottom:20px">
                        <button class="fancy"> <span> Registrati </span> </button>
                        <span class="to-margin-top" style="font-family: 'DM Sans', sans-serif; color: #fefefe; display: block; max-width: 50%;">{{ message }}</span>
                    </div>
                </form>
                <p>
                    <ul>
                        <li>La password deve essere lunga almeno 8 caratteri</li>
                    </ul>    
                </p>
            </div>
    </section>
</template>
<script lang="ts">
import Vue from 'vue'
import utils from '@/lib/utils';
import { methods } from '@/lib/api'

export default Vue.extend({
    head(){
        return {
            title: 'appunti.me — registrati',
            meta: [
                {
                    hid: 'theme-color',
                    name: 'theme-color',
                    content: '#5352ed'
                },
                {
                    hid: 'title',
                    name: 'title',
                    content: 'appunti.me — registrati'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'la piattaforma di appunti completamente open source!'
                },
                {
                    hid: 'og:type',
                    property: 'og:type',
                    content: 'website'
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: `${process.env.URI}${this.$route.fullPath}`
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: `appunti.me — registrati`
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: 'la piattaforma di appunti completamente open source!'
                }, 
                {
                    hid: 'twitter:card',
                    property: 'twitter:card',
                    content: 'summary_large_image'
                },
                {
                    hid: 'twitter:url',
                    property: 'twitter:url',
                    content: `${process.env.URI}${this.$route.fullPath}`
                },
                {
                    hid: 'twitter:title',
                    property: 'og:title',
                    content: `appunti.me — registrati`
                },
                {
                    hid: 'twitter:description',
                    property: 'og:description',
                    content: 'la piattaforma di appunti completamente open source!'
                }                               
            ]
        }
    },
    data() {
        return {
            name: "",
            surname: "",
            unimore_id: "",
            email: "",
            password: "",
            password_confirm: "",
            message: ""
        }
    },
    mounted(){
        
    },
    methods: {
        signup(){
            if(!this.$data.email || !this.$data.password || !this.$data.password_confirm || !this.$data.name || !this.$data.surname /*|| !this.$data.unimore_id*/){
                console.log(this.$data);
                this.$data.message = 'Tutti i campi sono necessari';
                return;
            }
            
            if(this.password != this.password_confirm) {
                this.message = "Password diverse!"
                return;
            }

            let inputsValid = utils.validateInputs(this.email, this.password);

            if(!inputsValid.email) {
                this.message = "Email non valida!";
                return;
            }

            if(!inputsValid.password) {
                this.message = "Password non valida!";
                return;
            }

            methods.auth.signup(this.email, this.password, this.name, this.surname, this.unimore_id)
                .then((info: any) => {

                    this.message = "Registrazione avvenuta con successo, controlla la tua casella email per verificare il tuo account!";
                    
                }).catch((err: any) => {

                    if(err.response.status === 409){
                        this.message = 'Questa mail è già registrata!'
                        return;
                    }

                    this.message = 'Si è verificato un errore durante la registrazione, molto probabilmente l\'ID Unimore è già registrato';
                    console.log(err);

            })     
        }
    }
})
</script>
