<template>
        <!-- TODO: (anche da backend) aggiungere route per modificare e/o aggiungere file -->
        <section id="main" class="full">
        <nuxt-link to="/panel/edit" id="back">
            <div class="flexbox align-center" style="margin-bottom: 20px; background: #fefefe; max-width: 200px; width: 100%; padding-left: 10px; padding-right: 10px;">
                <fa icon="arrow-alt-circle-left" style="font-size: 2em; color: #5352ed; margin-right: 20px;" /> <p style="color: #5352ed">Torna ai tuoi appunti</p>
            </div>
        </nuxt-link>
        
            <Loading ref="spinner" />
                <h1> Modifica post </h1>
                <div class="container" style="align-center">
                <div style="width:100%;margin-left:auto;margin-right:auto">
                    <form>
                        <div class="flexbox" style="flex-direction:column;">
                            <SimulatedSelect :default="item.info.subject_id" ref="select_subject" right-icon="chevron-down" placeholder="Seleziona materia" data-id="select1" :items="getSubjects" class-name="full-width" />
                            <input type="text" class="fancy" v-model="item.info.title" placeholder="Titolo appunto"> 
                            <div class="flexbox justify-center" style="margin-top: 20px;">
                                <button @click="editNote()" class="fancy" style="margin-right: 10px;"><span>Modifica</span></button>
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
import Loading from '@/components/Loading.vue';

export default Vue.extend({

    layout: 'panel',
    components: {
        Loading
    },
    data: () => {
        return {
            item: {
                info: {
                    subject_id: 0,
                    uploaded_at: ""
                }
            },
            date: "",
            time: ""
        }
    },
    async created(){
        try{

            this.item = await (this as any).$api.methods.notes.getNote(this.$route.params.id, parseInt(this.$route.params.subject));
            let date = (new Date(this.item.info.uploaded_at))
            
            this.date = date.toLocaleDateString();
            this.time = date.toLocaleTimeString();
            
            console.log(this.item.info);
            

        }catch(err){

            // mettere un bel messaggio
            console.log(err);
            throw err;

        }
    },
    mounted(){
        
        (this.$refs.spinner as any).hide()     
        //(this as any).$refs.spinner.hide();

    },
    methods: {
        async editNote() {
            (this as any).$api.methods.notes.edit(
                this.$route.params.subject,
                this.$route.params.id,
                (this as any).$refs.select_subject.selected_value,
                this.$data.item.info.title);

          this.$router.push("/panel");
        },
        async getSubjects(){
            
            try{

                return await methods.subjects.getSubjects()

            }catch(err){

                console.log(err);
                throw err;

            }
            
        }
    },
})
</script>