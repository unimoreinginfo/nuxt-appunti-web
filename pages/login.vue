<template>
    <section>
        <div class="container" style="margin: 0 auto; margin-top: 120px;">
            <h1 class="main" id="title"> accedi </h1>
            <form @submit.prevent="logIn">
                <div class="flexbox align-top wrap" style="margin-top: 80px; width: 100%; flex-direction: column;align-content: center">
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

export default Vue.extend({
    data() {
        return {
            email: "",
            password: "",
            inputsValid: {
                email: true, password: true
            }
        }
    },
    created() {
        // TODO:check if logged in and go to the right panel
    },
    methods: {

        logIn() {

            this.validateForm();
            if(this.$data.inputsValid && this.$data.inputsValid)
                this.$store.dispatch('logIn', {email: this.$data.email, password: this.$data.password});

        },
        validateForm() {
            
            this.$data.inputsValid = utils.validateInputs(this.$data.email, this.$data.password); // Y U NO WORK TypeError: Cannot read property 'validateInputs' of undefined
        
        }
    }
})
</script>