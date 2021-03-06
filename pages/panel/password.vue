<template>
        <!-- TODO: (anche da backend) aggiungere route per modificare e/o aggiungere file -->
        <section id="main" class="full">
        <nuxt-link to="/panel/settings" id="back">
            <div class="flexbox align-center" style="margin-bottom: 20px; background: #fefefe; max-width: 200px; width: 100%; padding-left: 10px; padding-right: 10px;">
                <fa icon="arrow-alt-circle-left" style="font-size: 2em; color: #5352ed; margin-right: 20px;" /> <p style="color: #5352ed">Modifica utente</p>
            </div>
        </nuxt-link>
                <h1> Cambia password </h1>
                <div class="container" style="align-center">
                <div style="width:100%;margin-left:auto;margin-right:auto">
                    <form @submit.prevent="editPassword ">
                        <div class="flexbox" style="flex-direction:column;">
                            <input type="password" class="fancy" v-model="old_password" placeholder="Vecchia password">
                            <input type="password" class="fancy" v-model="new_password" placeholder="Nuova password"> 
                            <input type="password" class="fancy" v-model="confirm_new_password" placeholder="Conferma nuove password"> 
                            <div class="flexbox align-center">
                                <button class="fancy" style="margin-right: 10px;"><span>Cambia password</span></button>
                                <span style="color: white;">{{ message }}</span>
                            </div>
                        </div>
                    </form>
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
            old_password: "",
            new_password: "",
            confirm_new_password: "",
            message: ""
        };
    },
    methods: {
        async editPassword() {
            this.$data.message="";
            if(this.$data.new_password != this.$data.confirm_new_password) {
                this.$data.message="Password diverse!";
                return;
            }
            try {
                await (this as any).$api.methods.users.editPassword(
                    this.$store.getters.getUser.id,
                    this.$data.old_password,
                    this.$data.new_password);

                this.$data.message = "Password cambiata con successo"
            } catch(err) {
                console.log(err);
                this.$data.message="Password sbagliata";
            }
        }
    }
})
</script>