<template>
    <section>
        <div class="container" style="margin: 0 auto; margin-top: 120px;">
            <h1 class="main" id="title"> Materie disponibili </h1>
            <h2 class="main" id="subtitle"> Lista di materie disponibili su appunti.me (in aggiornamento) </h2>
            <form>
                <Searchbar ref="searchbar" model="fancy full-width" id="filter" placeholder="Filtra materie" :searchAction="filter" :disable-results="true" :timeout="false" outer-style="width: 100%; margin: 0 auto;" result-model="bright h100 hover-darken-blue" />
            </form>
            <div class="flexbox align-top justify-center wrap" style="margin-top: 80px; width: 100%;">
                <a v-for="subject in filtered" :key="subject.id" :href="`/subject/${subject.id}`" class="robo" style="margin: 20px; width: 300px">
                    <div class="box flexbox align-center justify-center" style="height: 250px; background: rgba(255,255,255,0.9); color: #2f3542; border-radius: 10px;">
                        <h1 class="dark" style="text-align: center; font-size: 2em;"> {{ subject.name }} </h1>
                    </div>
                </a>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { methods } from '@/lib/api';
export default Vue.extend({
        head(){
        return {
            title: 'appunti.me — materie disponibili',
            meta: [
                {
                    hid: 'theme-color',
                    name: 'theme-color',
                    content: '#5352ed'
                },
                {
                    hid: 'title',
                    name: 'title',
                    content: 'appunti.me — materie disponibili'
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
                    content: `appunti.me — materie disponibili`
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
                    content: `appunti.me — materie disponibili`
                },
                {
                    hid: 'twitter:description',
                    property: 'og:description',
                    content: 'la piattaforma di appunti completamente open source!'
                }                               
            ]
        }
    },
    async asyncData(){
        try{

            let subjects = await methods.subjects.getSubjects();
            return { subjects, filtered: subjects }

        }catch(err){

            // mettere un bel messaggio
            console.log(err);
            throw err;

        }
    },
    methods: {
        filter(){

            this.$data.filtered = this.$data.subjects.filter(( item: any ) => {

                return item.name.toLowerCase().includes((this.$refs.searchbar as any).query.toLowerCase())
            
            })

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
    @media screen and (max-width: 768px){
        .robo{
            width: 100% !important;
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