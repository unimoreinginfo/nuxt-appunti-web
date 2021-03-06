<template>
        <!-- TODO: (anche da backend) aggiungere route per modificare e/o aggiungere file -->
        <section id="main" class="full">    
                <h1> Modifica utente </h1>
                <div class="container" style="align-center">
                <div style="width:100%;margin-left:auto;margin-right:auto">
                    <ul class="fancy-list noborder"><a :href="`/panel/edit/password/${$route.params.id}`"><li>Modifica password</li> </a></ul>
                    <form @submit.prevent="editUser">
                        <div class="flexbox" style="flex-direction:column;">
                            <input type="text" class="fancy" v-model="name" placeholder="Nome" style="margin-top:30px">
                            <input type="text" class="fancy" v-model="surname" placeholder="Cognome" style="margin-top:30px"> 
                            <input type="text" class="fancy" v-model="unimore_id" placeholder="ID Unimore" style="margin-top:30px"> 
                            <!-- TODO: sistemare esteticamente e far funzionare sta cosa admin -->
                            admin<br>
                            sì<input type="radio" name="admin">
                            no<input type="radio" name="admin">
                            <div class="flexbox justify-center" style="margin-top: 20px;">
                                <button class="fancy" style="margin-right: 10px;"><span>Modifica</span></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
       </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { methods } from '@/lib/api';

export default Vue.extend({

    layout: 'adminpanel',
    async created(){
        try{

            let item = await (this as any).$api.methods.users.get(this.$route.params.id);
            
            return item;

        }catch(err){
            console.log(err);
            throw err;

        }
    },
    methods: {
        async editUser() {
            (this as any).$api.methods.users.edit(
                this.$route.params.id,
                this.$data.name,
                this.$data.surname,
                this.$data.unimore_id);

          this.$router.push("/panel");
        },
    },
})
</script>