<template>
    <section>
        <div class="container" style="margin: 0 auto; margin-top: 120px;">
            <h1 id="subject_name"><a :href="`/subject/${item.info.subject_id}`"><span style="border-bottom: 3px solid white;">{{ item.info.subject_name }}</span>  </a></h1>
            <h1 class="main" id="title"> {{ item.info.title }} </h1>
            <h2 class="main" id="subtitle"> di <a class="normal" :href="`/author/${item.info.author_id}`">{{ item.info.name }} {{ item.info.surname }}</a>, caricato il {{ date }} alle {{ time }} </h2>
            <div class="flexbox align-top">
                <div style="width: 60%;" id="enlarge">
                    <ul class="fancy-list" style="width: 100%;">
                        <li v-for="file in item.files" :key="file">
                            <div class="flexbox justify-between align-center">
                                <span> {{ file }} </span>
                                <a :href="`https://api.appunti.me/${item.info.storage_url}/${file}`">
                                    <div class="icon">
                                        <fa icon="download" />
                                    </div>
                                </a>
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
export default Vue.extend({
    head(){
        return {
            title: `appunti.me — (${this.$data.item.info.subject_name}) ${this.$data.item.info.title}`,
            meta: [
                {
                    hid: 'theme-color',
                    name: 'theme-color',
                    content: '#5352ed'
                }
            ]
        }
    },
    async asyncData({ params, error }){
        try{

            let item = await methods.notes.getNote(params.id, parseInt(params.subject)),
                date = new Date(item.info.uploaded_at);
            return { item, date: date.toLocaleDateString(), time: date.toLocaleTimeString(), not_found: false, bad: false }

        }catch(err){           

            if(err.response.status === 404)
                return error({ statusCode: 404 })
            
            return error({ statusCode: 500 })

        }
    }
})
</script>
<style lang="scss" scoped>
    @media screen and (max-width: 900px){
        #enlarge{
            width: 100% !important;
        }
    }
    @media screen and (max-width: 500px){
        #subject_name{
            font-size: 1.5em;
        }
        #subject_name{
            font-size: 5vw;
        }
        #title{
            font-size: 3em;
        }
        #subtitle{
            font-size: 1.25em;
        }
    }
</style>