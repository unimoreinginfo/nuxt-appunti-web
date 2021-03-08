<template>
    <section>
        <div class="container" style="margin: 0 auto; margin-top: 120px;">
            <div style="position: sticky; top: 80px; background: #5352ed; z-index: 2;">
                <div class="flexbox justify-between" style="overflow-x: hidden;">
                    <div class="flexbox align-center" style="margin-bottom: 20px;">
                        <div class="author-image" :style="`background: url('${author.image}'); background-size: cover; background-repeat: no-repeat; position: relative;`">
                            <fa v-if="!author.image" icon="user" style="position: absolute; color: #fefefe; bottom: 0; top: 0; left: 0; right: 0; margin: auto; transform: scale(5); "/>
                        </div>
                        <div style="margin-left: 40px;">
                            <h2 class="bright">{{ author.name }} {{ author.surname }} <span aria-label="Utente verificato!" data-balloon-pos="up"><fa icon="check-square" v-if="author.verified" style="transform: scale(0.7)" /></span></h2>
                            <!--<ul style="padding: 0; list-style-type: none; color: #fefefe;">
                                <li> <a class="normal" v-html="mail"></a> </li>
                            </ul>-->
                        </div>
                    </div>
                </div>
                <form>
                    <Searchbar ref="searchbar" model="fancy full-width" id="filter" :placeholder="`Cerca fra gli appunti di ${author.name}`" :searchAction="filter" :disable-results="false" :timeout="true" outer-style="width: 100%; margin: 0 auto;" result-model="bright h100 hover-darken-blue" :searchPageUrlGen="generateSearchPageUrl" />
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
                                <div>
                                    <span> {{ note.title }} </span><br>
                                    <span style="font-family: 'IBM Plex Sans', sans-serif; font-size: .89em;"> {{ note.subject_name }} </span><br>
                                </div>
                                <div>
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
            title: `appunti.me — appunti di ${this.$data.author.name}`,
            meta: [
                {
                    hid: 'theme-color',
                    name: 'theme-color',
                    content: '#5352ed'
                },
                {
                    hid: 'title',
                    name: 'title',
                    content: `appunti.me — appunti di ${this.$data.author.name}`
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
                    content: `appunti.me — appunti di ${this.$data.author.name}`
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
                    content: `appunti.me — appunti di ${this.$data.author.name}`
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
    async asyncData({ params, error }){
        try{

            let notes = await methods.notes.get(`&author_id=${params.id}&translate_subjects=true`);
            let author = await methods.users.get(params.id);

            if(author.error)
                return error({ statusCode: 404 })

            let random_stuff = "abcdefghijklmnopqrstuvwxyz";
            let split = author.email.split('');
            let mail = "";
            
            split.forEach((letter: string) => {
            
                // offuschiamo le email dai

                let r1 = Math.floor(Math.random() * ( 13 )),
                    r2 = Math.floor(Math.random() * ( 27 - 13 ));

                let sub = random_stuff.substring(r1, r2);
                mail += `${letter}<span style="display: none;">${sub}</span>`

            })

            console.log(mail);

            return { notes, author, mail, filtered: [], not_found: false, bad: false }

        }catch(err){

            if(err.response.status === 404)
                return error({ statusCode: 404 })
            
            return error({ statusCode: 500 })

        }
    },
    methods: {
        generateSearchPageUrl() {
            let query = (this as any).$refs.searchbar.query;

            return `/search?q=${query}&author_id=${this.$route.params.id}`
        },
        async getFirstPage () {
            return await methods.notes.get(`&author_id=${this.$route.params.id}&translate_subjects=true`, 1, true);
        },
        async getPage (page: number) {
            return await methods.notes.get(`&author_id=${this.$route.params.id}&translate_subjects=true`, page, false);
        },

        async filter(){

            try{

                console.log(this.$data.author.id);
                
                let notes = await methods.notes.searchNotes((this.$refs.searchbar as any).query, 0, this.$data.author.id); // 0 = any
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
</style>