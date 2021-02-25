<template>
  <div> 
    <section id="main" class="full flexbox justify-center align-center">
      <div class="container">
        <div class="flexbox align-center">
            <div style="width: 70%;" id="main_stuff">
                <h1 class="main" style="text-align: left">appunti.me</h1>
                <h2 class="main" style="text-align: left;"> fatto da studenti, per gli studenti </h2>
                <form class="full-width centered">
                    <div class="flexbox" style="align-items: flex-start;" id="main_form">
                        <SimulatedSelect ref="select_subject" right-icon="chevron-down" placeholder="Seleziona materia" data-id="select1" title="test" :items="getSubjects" />
                        <Searchbar ref="searchbar" model="fancy full-width" id="search" placeholder="Che cosa stai cercando?" :searchAction="getNotes" :disable-results="false" outer-style="width: 100%; margin: 0 auto;" result-model="bright h100 hover-darken-blue" />
                    </div>
                </form>
            </div>
            <div class="box" style="flex: 1; height: 70vh; overflow: auto;" id="latest">
                <h2 class="main"> Ultimi caricamenti </h2>
                <div v-for="item in latest" :key="item.id" class="item bright flexbox align-center">
                    <a :href="`/item/${item.subject_id}/${item.note_id}`" style="text-decoration: none; color: inherit;">
                        <div>
                            <h2> {{ item.title }} </h2>
                            <span> {{ item.subject_name }} </span>
                            <span style="font-size: .75em"> di <a :href="`/author/${item.author_id}`">{{ item.name }} {{ item.surname }}</a> </span>
                        </div>
                    </a>
                </div>
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
    async asyncData(){

        let items = {
            latest: []
        }; 

        try{

            items.latest = await methods.notes.get('&order_by=date&translate_subjects=true', 1);    
            items.latest.forEach((item: any) => { 
                if(item.title.length > 80) 
                    item.title =  item.title.substring(0, 80) + "..."
            })        

        }catch(err){

            console.log(err); // aaa

        }finally{

            return items;

        }

    },
    methods: {
        async getNotes(){

            let query = (this as any).$refs.searchbar.query,
                subject = (this as any).$refs.select_subject.selected_value;
            
            try{

                let items = await methods.notes.searchNotes(query, subject);
                items.forEach((item: any) => {
                    item["url"] = `/item/${item.subject_id}/${item.id}` 
                });
                return items;

            }catch(err){

                console.log(err);
                throw err;

            }

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
    head(){
        return {
            title: 'appunti.me — home',
            meta: [
                {
                    hid: 'theme-color',
                    name: 'theme-color',
                    content: '#5352ed'
                }
            ]
        }
    }
})
</script>