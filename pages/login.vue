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
                    <p>Oppure, <a href="/signup" class="normal">registrati</a></p>
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
            meta: [
                {
                    hid: 'theme-color',
                    name: 'theme-color',
                    content: '#5352ed'
                },
                {
                    hid: 'title',
                    name: 'title',
                    content: 'appunti.me — login'
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
                    content: `appunti.me — login`
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
                    content: `appunti.me — login`
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
                    
                    let to = (/^\/{1}.*/.test(this.$route.query.to) ? this.$route.query.to : "/panel");
                    location.href = to;
                    
                }).catch((err: any) => {

                    this.$data.message = 'Credenziali errate'
                    console.log(err);

            })     
        }
    }
})
</script>
