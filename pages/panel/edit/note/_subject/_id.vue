<template>
    <client-only>
        <!-- TODO: (anche da backend) aggiungere route per modificare e/o aggiungere file -->
        <section id="main" class="full">
                <h1> Modifica post </h1>
                <div class="container" style="align-center">
                <div style="width:100%;margin-left:auto;margin-right:auto">
                    <form>
                        <div class="flexbox" style="flex-direction:column;">
                            <SimulatedSelect :default="item.info.subject_id" ref="select_subject" right-icon="chevron-down" placeholder="Seleziona materia" data-id="select1" :items="getSubjects" style=";margin-left:auto;margin-right:auto" />
                            <input type="text" class="fancy" v-model="item.info.title" placeholder="Titolo appunto" style="margin-top:30px"> 
                            <div class="flexbox justify-center" style="margin-top: 20px;">
                                <button @click="editNote()" class="fancy" style="margin-right: 10px;"><span>Modifica</span></button>
                                <button @click="deleteNote()" class="fancy del" style="margin-left: 10px;"><span>Elimina</span></button>
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
    async asyncData({ params }){
        try{

            let item = await methods.notes.getNote(params.id, parseInt(params.subject)),
                date = new Date(item.info.uploaded_at);
            
            console.log(item.info);
            
            
            return { item, date: date.toLocaleDateString(), time: date.toLocaleTimeString() }

        }catch(err){

            // mettere un bel messaggio
            console.log(err);
            throw err;

        }
    },
    methods: {
        async deleteNote() {
          (this as any).$api.methods.notes.delete(
            this.$route.params.subject,
            this.$route.params.id);

          this.$router.push("/panel");
        },
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