<template>
    <section>
        <div class="container" style="margin: 0 auto; margin-top: 120px;">
            <div style="position: sticky; top: 80px; background: #5352ed; z-index: 2;">
                <h1 class="main" id="title"> {{ subject.name }} </h1>
                <h2 class="main" id="subtitle"> Docente: {{ subject.professor_name }} {{ subject.professor_surname }} </h2>
                <form>
                    <Searchbar ref="searchbar" model="fancy full-width" id="filter" :placeholder="`Cerca appunti per ${subject.name}`" :searchAction="filter" :disable-results="false" :timeout="true" outer-style="width: 100%; margin: 0 auto;" result-model="bright h100 hover-darken-blue" :disable-more="true" result-holder-model="absolute" :searchPageUrlGen="generateSearchPageUrl" />
                </form>
            </div>
            <div class="flexbox align-top justify-center wrap" style="margin-top: 80px; width: 100%; margin-left: -20px;">
                <a v-for="subject in filtered" :key="subject.id" :href="`/subject/${subject.id}`" style="margin: 20px; width: 23.3%;">
                    <div class="box flexbox align-center justify-center" style="height: 250px; background: rgba(255,255,255,0.9); color: #2f3542; border-radius: 10px;">
                        <h1 class="dark" style="text-align: center; font-size: 2em;"> {{ subject.name }} </h1>
                    </div>
                </a>
            </div>
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
import infiniteScrollComponent from '~/mixins/infinitescroll';


export default Vue.extend({
    head(){
        return {
            title: `appunti.me — ${this.$data.subject.name}`,
            meta: [
                {
                    hid: 'theme-color',
                    name: 'theme-color',
                    content: '#5352ed'
                },
                {
                    hid: 'title',
                    name: 'title',
                    content: `appunti.me — ${this.$data.subject.name}`
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'la piattaforma di appunti completamente open source!'
                },
                {
                    hid: 'og:type',
                    property: 'og:type',
                    content: 'website'
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: `${process.env.URI}${this.$route.fullPath}`
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: `appunti.me — ${this.$data.subject.name}`
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: 'la piattaforma di appunti completamente open source!'
                }, 
                {
                    hid: 'twitter:card',
                    property: 'twitter:card',
                    content: 'summary_large_image'
                },
                {
                    hid: 'twitter:url',
                    property: 'twitter:url',
                    content: `${process.env.URI}${this.$route.fullPath}`
                },
                {
                    hid: 'twitter:title',
                    property: 'og:title',
                    content: `appunti.me — ${this.$data.subject.name}`
                },
                {
                    hid: 'twitter:description',
                    property: 'og:description',
                    content: 'la piattaforma di appunti completamente open source!'
                }                               
            ]
        }
    },
    mixins: [
        infiniteScrollComponent()
    ],
    data: () => {
        return {
            notes: []
        }
    },
    async asyncData({ params, error }){
        try{

            let notes = await methods.notes.get(`&subject_id=${params.id}&translate_subjects=true`);
            let subject = await methods.subjects.getSubject(parseInt(params.id));

            if(!subject)
                return error({ statusCode: 404 })

            return { notes, subject, filtered: [] }

        }catch(err){
            
            if(err.response.status === 404)
                return error({ statusCode: 404 })
            
            return error({ statusCode: 500 })

        }
    },
    methods: {
        generateSearchPageUrl() {
            let query = (this as any).$refs.searchbar.query;

            return `/search?q=${query}&subject_id=${this.$route.params.id}`
        },
        async getFirstPage () {
            return await methods.notes.get(`&subject_id=${this.$route.params.id}&translate_subjects=true`, 1, true);
        },
        async getPage (page: number) {
            return await methods.notes.get(`&subject_id=${this.$route.params.id}&translate_subjects=true`, page, false);
        },
        async filter(){

            try{

                let notes = await methods.notes.searchNotes((this.$refs.searchbar as any).query, this.$data.subject.id);
                return notes;

            }catch(err){

                console.log(err);
                
                throw err;

            }

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