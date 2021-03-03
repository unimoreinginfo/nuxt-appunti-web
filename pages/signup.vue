<template>
    <section class="full flexbox align-center justify-center">
        <div style="max-width: 670px; width: 100%; padding: 30px;">
                <h1 class="main" id="title" style="margin-bottom: 20px;"> Login </h1>
                <form @submit.prevent="signUp"> 
                    <input class="fancy" placeholder="Indirizzo email" type="email" style="width: 100%;" v-model="email">
                    <input class="fancy" placeholder="Password" type="password" style="width: 100%" v-model="password">
                    <input class="fancy" placeholder="Conferma password" type="password" style="width: 100%" v-model="password_confirm">
                    <input class="fancy" placeholder="Nome" type="text" style="width: 100%" v-model="name">
                    <input class="fancy" placeholder="Cognome" type="text" style="width: 100%" v-model="surname">
                    <input class="fancy" placeholder="ID Unimore" type="text" style="width: 100%" v-model="unimore_id">
                    <div class="flexbox justify-between align-center" style="margin-bottom:20px">
                        <button class="fancy"> <span> Registrati </span> </button>
                        <span style="font-family: 'DM Sans', sans-serif; color: #fefefe;">{{ message }}</span>
                    </div>
                </form>
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
            title: 'appunti.me — login',
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
        signUp(){
            if(!this.$data.email || !this.$data.password || this.$data.password_confirm || !this.$data.name || !this.$data.surname || !this.$data.unimore_id){
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

            if(!inputsValid.email) {
                this.message = "Password non valida!";
                return;
            }

            methods.auth.signup(this.email, this.password, this.name, this.surname, this.unimore_id)
                .then((info: any) => {

                    this.message = "Registrazione avvenuta con successo, controlla la mail Unimore per confermare l'account";
                    
                }).catch((err: any) => {

                    this.message = 'Si è verificato un problema';
                    console.log(err);

            })     
        }
    }
})
</script>
