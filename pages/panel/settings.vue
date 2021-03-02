<template>
        <!-- TODO: (anche da backend) aggiungere route per modificare e/o aggiungere file -->
        <section id="main" class="full">
            <Loading ref="spinner" />
                <h1> Impostazioni profilo </h1>
                <div class="container" style="align-center">
                <div style="width:100%;margin-left:auto;margin-right:auto">
                    <p style="margin-bottom: 20px;">
                        <a class="normal" href="/panel/password"> Modifica password </a>
                    </p>
                    <form @submit.prevent="editUser">
                        <div class="flexbox" style="flex-direction:column;">
                            <input type="text" class="fancy" v-model="name" placeholder="Nome">
                            <input type="text" class="fancy" v-model="surname" placeholder="Cognome"> 
                            <input type="text" class="fancy" v-model="unimore_id" placeholder="ID Unimore"> 
                            <div class="flexbox">
                                <button class="fancy" style="margin-right: 10px;"><span>Modifica</span></button>
                                <p> {{ message }} </p>
                            </div>                            
                        </div>
                    </form>
                </div>
            </div>
       </section>
</template>
<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/Loading.vue';
import { methods } from '@/lib/api';

export default Vue.extend({
    layout: 'panel',
    components: {
        Loading
    },
    data: () => {
        return {
            name: "",
            surname: "",
            unimore_id: null,
            message: ''
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
    mounted(){
        (this.$refs.spinner as any).hide()
    },
    methods: {
        async editUser() {
            try{
                await (this as any).$api.methods.users.edit(
                this.$store.getters.getUser.id,
                this.$data.name,
                this.$data.surname,
                this.$data.unimore_id);

                this.message = 'Profilo modifcato correttamente!'
            }catch(err){

                this.message = 'Qualcosa è andato storto durante la modifica del tuo profilo...'

            }
        },
    },
})
</script>