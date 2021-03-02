<template>
    <client-only>
        <!-- TODO: (anche da backend) aggiungere route per modificare e/o aggiungere file -->
        <section id="main" class="full">
                <h1> Impostazioni profilo </h1>
                <div class="container" style="align-center">
                <div style="width:100%;margin-left:auto;margin-right:auto">
                    <form @submit.prevent="editPassword ">
                        <div class="flexbox" style="flex-direction:column;">
                            <input type="password" class="fancy" v-model="new_password" placeholder="Nuova password" style="margin-top:30px"> 
                            <input type="password" class="fancy" v-model="confirm_new_password" placeholder="Conferma nuove password" style="margin-top:30px"> 
                            <div class="flexbox justify-between align-center">
                                <button class="fancy" style="margin-right: 10px;"><span>Cambia password</span></button>
                                <span style="font-family: 'DM Sans', sans-serif; color: #fefefe;">{{ message }}</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
       </section>
  </client-only>
</template>
<script lang="ts">
import Vue from 'vue'
import { methods } from '@/lib/api';

export default Vue.extend({
    layout: 'adminpanel',
    data: () => {
        return {
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
                    this.$route.params.id,
                    "niente, sono admin",
                    this.$data.new_password);

                this.$router.push("/panel");
            } catch(err) {
                console.log(err);
                this.$data.message="Password sbagliata";
            }
        },
    },
})
</script>