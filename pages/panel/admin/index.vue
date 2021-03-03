<template>
    <section id="main">
        <Loading ref="spinner" />
        <h1 class="main" style="margin: 0;"> Pannello admin </h1>
        <div class="flexbox align-top">
            <div style="margin-right: 40px">
                <h3> Ultimi appunti caricati </h3>
                <ul class="fancy-list">
                    <li v-for="note in latest_items" :key="note.id">
                        <div class="flexbox justify-between align-center" style="min-height: 50px; overflow-x: hidden;">
                                <div style="width: 85%;">
                                    <span style="display: inline-block;"> {{ note.title }} </span><br>
                                    <span style="font-family: 'IBM Plex Sans', sans-serif; font-size: .89em;"> di <b>{{ note.name }} {{ note.surname }}</b> </span><br>
                                    <span style="font-family: 'IBM Plex Sans', sans-serif; font-size: .89em;"> {{ note.visits }} visualizzazioni </span>
                                </div>
                                <div style="width: 15%; text-align: right;">
                                    <a :href="`/panel/edit/note/${note.subject_id}/${note.note_id}`">
                                        <div class="icon" :aria-label="`Modifica`" data-balloon-pos="left">
                                            <fa icon="edit" />
                                        </div>
                                    </a>
                                    <div class="icon" @click="deleteNote(note.note_id, note.subject_id, note.title)" aria-label="Elimina appunto" data-balloon-pos="up">
                                        <fa icon="trash" />
                                    </div>
                                </div>
                            </div>
                    </li> 
                </ul>
            </div>
            <div style="margin-right: 40px">
                <h3> Alcuni utenti del sito </h3>
                <ul class="fancy-list">
                    <li v-for="user in users" :key="user.id">
                        <div class="flexbox justify-between align-center" style="min-height: 50px; overflow-x: hidden;">
                            <a :href="`/panel/edit/user/${user.id}`">
                                <span style="display: inline-block;"> {{ user.name }} {{ user.surname }} </span><br>
                            </a>
                        </div>
                    </li> 
                </ul>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/Loading.vue';

export default Vue.extend({
    layout: 'adminpanel',
    components: {
        Loading
    },
    data(){
        return {
            latest_items: [],
            users: [],
            name: this.$store.getters.getUser.name
        }
    },
    async created(){

        try{
            
            this.latest_items = await (this as any).$api.methods.notes.get(`&order_by=date`, 1);

            this.users = await (this as any).$api.methods.users.getPage(1, false);
            
        }catch(err){

            console.log(err.response);

        }

    },
    mounted(){

        setTimeout((this.$refs.spinner as any).hide, 250);
        
    },
    methods: {
        async deleteNote(id: string, subject: string, title: string) {
            if(!confirm(`Vuoi eliminare ${title}?`))
                return;            

            try{
                await (this as any).$api.methods.notes.delete(subject, id);
            }catch(err){
                console.log(err);
            }finally{
                let latest_items = await (this as any).$api.methods.notes.get(`&author_id=${this.$store.getters.getUser.id}&order_by=date`, 1);   
                this.latest_items = latest_items;
            }
        }

    },
    head(){
        return {
            title: 'appunti.me — admin',
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