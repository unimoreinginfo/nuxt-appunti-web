<template>
    <section>
        <div class="container" style="margin: 0 auto; margin-top: 120px;">
            <div style="position: sticky; top: 80px; background: #5352ed; z-index: 2;">
                <h1 class="main" id="title"> {{ subject.name }} </h1>
                <h2 class="main" id="subtitle"> Docente: {{ subject.professor_name }} {{ subject.professor_surname }} </h2>
                <form>
                    <Searchbar ref="searchbar" model="fancy full-width" id="filter" :placeholder="`Cerca appunti per ${subject.name}`" :searchAction="filter" :disable-results="false" :timeout="true" outer-style="width: 100%; margin: 0 auto;" result-model="bright h100 hover-darken-blue" />
                </form>
            </div>
            <div class="flexbox align-top justify-center wrap" style="margin-top: 80px; width: 100%; margin-left: -20px;">
                <a v-for="subject in filtered" :key="subject.id" :href="`/subject/${subject.id}`" style="margin: 20px; width: 23.3%;">
                    <div class="box flexbox align-center justify-center" style="height: 250px; background: rgba(255,255,255,0.9); color: #2f3542; border-radius: 10px;">
                        <h1 class="dark" style="text-align: center; font-size: 2em;"> {{ subject.name }} </h1>
                    </div>
                </a>
            </div>
            <div style="width: 100%; margin-top: -50px;">
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
                                    <a :href="`/item/${note.subject_id}/${note.note_id}`">
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
    </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { methods } from '@/lib/api';
export default Vue.extend({
    async asyncData({ params, redirect }){
        try{

            let notes = await methods.notes.get(`&subject_id=${params.id}&translate_subjects=true`);
            let subject = await methods.subjects.getSubject(parseInt(params.id));

            if(!subject)
                return redirect('/404');

            return { notes, subject, filtered: [] }

        }catch(err){

            // mettere un bel messaggio
            console.log(err);
            throw err;

        }
    },
    methods: {
        async filter(){

            try{

                let notes = await methods.notes.searchNotes((this.$refs.searchbar as any).query, this.$data.subject.id);
                return notes;

            }catch(err){

                console.log(err);
                
                throw err;

            }

            /*this.$data.filtered = this.$data.subjects.filter(( item: any ) => {

                return item.name.toLowerCase().includes((this.$refs.searchbar as any).query.toLowerCase())
            
            })*/

        }
    }
})
</script>
<style lang="scss" scoped>
    .box{
        transition: .25s all ease-in-out;
        &:hover{
            transform: translateY(-10px);
            box-shadow: 0 14px 28px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.17);
        }
    }
    @media screen and (max-width: 500px){
        #subject_name{
            font-size: 1.5em;
        }
        #title{
            font-size: 3em;
        }
        #subtitle{
            font-size: 1.25em;
        }
    }
</style>