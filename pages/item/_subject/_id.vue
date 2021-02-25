<template>
    <section>
        <div class="container" style="margin: 0 auto; margin-top: 120px;">
            <h1><a :href="`/subject/${item.info.subject_id}`"><span style="border-bottom: 3px solid white;">{{ item.info.subject_name }}</span>  </a></h1>
            <h1 class="main"> {{ item.info.title }} </h1>
            <h2 class="main"> di <a class="normal" :href="`/author/${item.info.author_id}`">{{ item.info.name }} {{ item.info.surname }}</a>, caricato il {{ date }} alle {{ time }} </h2>
            <div class="flexbox align-top">
                <div style="width: 60%;">
                    <ul class="fancy-list" style="width: 100%;">
                        <li v-for="file in item.files" :key="file">
                            <div class="flexbox justify-between align-center">
                                <span> {{ file }} </span>
                                <div class="icon">
                                    <fa icon="download" />
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
    }
})
</script>