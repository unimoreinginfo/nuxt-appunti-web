<template>
    <section>
        <div class="container" style="margin: 0 auto; margin-top: 120px;">
            <h1 class="main" id="title"> accedi </h1>
            <form @submit.prevent="login">
                <div class="flexbox align-top wrap" style="margin-top: 80px; width: 100%; flex-direction: column;align-content: center">
                    <span v-if="loginFailed" style="color: red">Combinazione email e password sbagliata</span>
                    <input class="fancy" placeholder="email" type="text" style="width:50%" v-model="email">
                    <span v-if="!inputsValid.email" style="color: red">Email non valida</span>
                    <input class="fancy" placeholder="password" type="password" style="margin-top:50px;width:50%" v-model="password">
                    <span v-if="!inputsValid.password" style="color: red">Password non valida</span>
                    <button class="fancy" style="align:center; margin-top:50px">accedi</button>
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
    data() {
        return {
            email: "",
            password: "",
            inputsValid: {
                email: true, password: true
            },
            loginFailed: false
        }
    },
    created(){

        let token = this.$store.getters.getToken;
        console.log(`token: ${token}`);
        if(!token)
            return;

        if(this.$store.getters.isLogged)
            return this.$router.push('/panel');

    },
    methods: {

        login() {

            this.validateForm();
            if(this.$data.inputsValid.email && this.$data.inputsValid.password){
                methods.auth.login(this.$data.email, this.$data.password)
                    .then(token => {

                        console.log(token);
                        this.$data.loginFailed = false;
                        localStorage.setItem('token', token);
                        this.$store.commit('setAuth', token);
                        let to = this.$route.query.to || "/panel/admin";
                        this.$router.push(to as string);

                    }).catch(err => {
                        this.$data.loginFailed = true;
                        console.log(err);

                    })
            }            

        },
        validateForm() {
            
            this.$data.inputsValid = utils.validateInputs(this.$data.email, this.$data.password);
        
        }
    }
})
</script>
