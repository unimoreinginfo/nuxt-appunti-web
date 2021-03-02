<template>
    <client-only>
        <!-- TODO: (anche da backend) aggiungere route per modificare e/o aggiungere file -->
        <section id="main" class="full">
                <h1> Impostazioni profilo </h1>
                <div class="container" style="align-center">
                <div style="width:100%;margin-left:auto;margin-right:auto">
                    <ul class="fancy-list noborder"><a href="/panel/password"><li>Modifica password</li> </a></ul>
                    <form @submit.prevent="editUser">
                        <div class="flexbox" style="flex-direction:column;">
                            <input type="text" class="fancy" v-model="name" placeholder="Nome" style="margin-top:30px">
                            <input type="text" class="fancy" v-model="surname" placeholder="Cognome" style="margin-top:30px"> 
                            <input type="text" class="fancy" v-model="unimore_id" placeholder="ID Unimore" style="margin-top:30px"> 
                            <div class="flexbox justify-center" style="margin-top: 20px;flex-direction:column">
                                <button class="fancy" style="margin-right: 10px;"><span>Modifica</span></button>
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
    layout: 'panel',
    data: () => {
        return {
            name: "",
            surname: "",
            unimore_id: null
        };
    },
    created(){
        try{

            methods.users.get(this.$store.getters.getUser.id).then((res) => {
                this.$data.name = res.name;
                this.$data.surname = res.surname;
                this.$data.unimore_id = res.unimore_id;
            });
            
        }catch(err){
            console.log(err);
            throw err;

        }
    },
    methods: {
        async editUser() {
            (this as any).$api.methods.users.edit(
                this.$store.getters.getUser.id,
                this.$data.name,
                this.$data.surname,
                this.$data.unimore_id);

          this.$router.push("/panel");
        },
    },
})
</script>