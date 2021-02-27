<template>
  <div> 
    <section id="main" class="full flexbox justify-center align-center">
      <div class="container" style="align-center justify-center">
            <div style="text-align: center;width:80%;margin-left:auto;margin-right:auto">
                <form @submit.prevent="editNote" >
                  <div class="flexbox" style="flex-direction:column;">
                    <SimulatedSelect ref="select_subject" right-icon="chevron-down" placeholder="Seleziona materia" data-id="select1" :items="getSubjects" style=";margin-left:auto;margin-right:auto" />
                    <input type="text" class="fancy" v-model="item.info.title" placeholder="Titolo appunto" style="margin-top:30px"> 
                    <button class="fancy" style="margin-top:25px;width:20%;margin-left:auto;margin-right:auto">Modifica</button>
                  </div>
                </form>
                <button :v-on="deleteNote" class="fancy del" style="margin-top:25px;width:20%;margin-left:auto;margin-right:auto">Elimina</button>
            </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { methods } from '@/lib/api';

export default Vue.extend({
    async asyncData({ params }){
        try{

            let item = await methods.notes.getNote(params.id, parseInt(params.subject)),
                date = new Date(item.info.uploaded_at);
            return { item, date: date.toLocaleDateString(), time: date.toLocaleTimeString() }

        }catch(err){

            // mettere un bel messaggio
            console.log(err);
            throw err;

        }
    },
    methods: {
        async deleteNote() {
          console.log("appunto eliminato");
        },
        async editNote() {
          console.log("appunto modificato");
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