<template>
  <div> 
    <section id="main" class="full flexbox justify-center align-center">
      <div class="container">
        <div class="flexbox align-center justify-center">
            <div style="text-align: center;">
                <form @submit.prevent="edit">
                  <SimulatedSelect ref="select_subject" right-icon="chevron-down" placeholder="Seleziona materia" data-id="select1" :items="getSubjects" />
                  <input type="text" class="fancy" v-model="item.info.title" placeholder="Titolo appunto">
                  <button class="fancy">Modifica</button>                 
                </form>
            </div>
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
        async edit() {

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