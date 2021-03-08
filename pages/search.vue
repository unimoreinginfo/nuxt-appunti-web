<template>
    <section>
        <div class="container" style="margin: 0 auto; margin-top: 120px;">
            <h1 class="main" id="title"> Risultati di ricerca per "{{ q }}" </h1>
            <form>
                <div class="flexbox" style="align-items: flex-start;" id="main_form">
                    <SimulatedSelect ref="select_subject" right-icon="chevron-down" placeholder="Seleziona materia" data-id="select1" :items="getSubjects" />
                    <Searchbar ref="searchbar" model="fancy full-width" id="search" placeholder="Che cosa stai cercando?" :searchAction="getNotes" :disable-results="false" :timeout="true" outer-style="width: 100%; margin: 0 auto;" result-model="bright h100 hover-darken-blue" result-holder-model="absolute" :searchPageUrlGen="generateSearchPageUrl" />
                </div>
            </form>
            <div class="flexbox align-top justify-center wrap" style="margin-top: 80px; width: 100%;">
                <div style="width: 100%; margin-top: -100px;">
                    <ul class="fancy-list" style="width: 100%;">
                        <li v-for="note in notes" :key="note.id">
                            <div class="flexbox justify-between align-center" style="min-height: 50px; overflow-x: hidden;">
                                <div style="width: 85%;">
                                    <span style="display: inline-block;"> {{ note.title }} </span><br>
                                    <span style="font-family: 'IBM Plex Sans', sans-serif; font-size: .89em;"> di {{ note.name }} {{ note.surname }} </span>
                                </div>
                                <div style="width: 15%; text-align: right;">
                                    <a :href="`/author/${note.author_id}`">
                                        <div class="icon" :aria-label="`Visualizza gli appunti di ${note.name} ${note.surname}`" data-balloon-pos="left">
                                            <fa icon="user" />
                                        </div>
                                    </a>
                                    <a :href="`/item/${note.subject_id}/${note.id}`">
                                        <div class="icon" :aria-label="`Visualizza post`" data-balloon-pos="right">
                                            <fa icon="sign-in-alt" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { methods } from '@/lib/api';
import infiniteScrollComponent from '~/mixins/infinitescroll';
export default Vue.extend({
    head(){
        return {
            title: `appunti.me — risultati di ricerca per "${this.$data.q}"`,
            meta: [
                {
                    hid: 'theme-color',
                    name: 'theme-color',
                    content: '#5352ed'
                }
            ]
        }
    },
    mixins: [
        infiniteScrollComponent()
    ],
    async asyncData({ query }){
        try{
            let q = query.q as string;
            let subject_id = query.subject_id ? parseInt(query.subject_id as string) : undefined;
            let author_id = query.author_id ? query.author_id as string : undefined;
            let notes = await methods.notes.searchNotes(q, subject_id, author_id);
            return { notes, q, subject_id, author_id}


        }catch(err){

            // mettere un bel messaggio
            console.log(err);
            throw err;

        }
    },
    methods: {
        async getSubjects(){
            
            try{

                return await methods.subjects.getSubjects()

            }catch(err){

                console.log(err);
                throw err;

            }
            
        },
        async getNotes(){

            let query = (this as any).$refs.searchbar.query,
                subject = (this as any).$refs.select_subject.selected_value;
            
            try{
                
                let items = await methods.notes.searchNotes(query, subject);
                items.forEach((item: any) => {
                    item["url"] = `/item/${item.subject_id}/${item.id}` 
                });
                console.log(items);
                
                return items;

            }catch(err){

                console.log(err);
                throw err;

            }

        },
        generateSearchPageUrl() {
            let query = (this as any).$refs.searchbar.query,
                subject = (this as any).$refs.select_subject.selected_value;

            return `/search?q=${query}&subject_id=${subject ? subject : 'any'}`
        },
        async getFirstPage () {
            return await methods.notes.searchNotes(this.$data.q, this.$data.subject_id, this.$data.author_id, 1, true);
        },
        async getPage (page: number) {
            return await methods.notes.searchNotes(this.$data.q, this.$data.subject_id, this.$data.author_id, page, false);
        },
    }
})
</script>
