<template>
    <section class="full flexbox align-center justify-center">
        <div style="max-width: 670px; width: 100%; padding: 30px;">
                <h1 class="main" id="title" style="margin-bottom: 20px;"> Login </h1>
                <form @submit.prevent="login">
                    <input class="fancy" placeholder="Indirizzo email" type="email" style="width: 100%;" v-model="email">
                    <input class="fancy" placeholder="Password" type="password" style="width: 100%" v-model="password">
                    <div class="flexbox justify-between align-center" style="margin-bottom:20px">
                        <button class="fancy"> <span> Accedi </span> </button>
                        <span style="font-family: 'DM Sans', sans-serif; color: #fefefe;">{{ message }}</span>
                    </div>
                    <ul style="width:200px" class="fancy-list noborder"><a href="/signup"><li>oppure registrati</li> </a></ul>
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
            email: "",
            password: "",
            loginFailed: false,
            message: ''
        }
    },
    mounted(){
        
    },
    methods: {
        login(){
            if(!this.$data.email || !this.$data.password){
                this.$data.message = 'Tutti i campi sono necessari';
                return;
            }
            (this as any).$api.methods.auth.login(this.email, this.$data.password)
                .then(async(info: any) => {

                    await methods.bridgeCookies(info.auth_token, info.refresh_token);
                    
                    let to = this.$route.query.to || "/panel";
                    location.href = to;
                    
                }).catch((err: any) => {

                    this.$data.message = 'Credenziali errate'
                    console.log(err);

            })     
        }
    }
})
</script>
