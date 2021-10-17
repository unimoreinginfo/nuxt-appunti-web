<template>
    <section id="main">
        <Loading ref="spinner" />
        <h1 class="main" style="margin: 0;"> Ciao, {{ name }} </h1>
        <ul style="width:200px" v-if="userIsAdmin" class="fancy-list noborder"><a href="/panel/admin"><li>vai al pannello admin</li> </a></ul>
        <h2> Ecco un veloce riepilogo </h2>
        <ul class="fancy-list noborder ibm" id="index_menu" style="text-align: center;">
            <a href="/panel"><li class="flexbox justify-between"><fa icon="list-alt" class="right" /> Riepilogo</li> </a>
            <a href="/panel/upload"><li class="flexbox justify-between"> <fa icon="upload" class="right" /> Carica appunti </li></a>
            <a href="/panel/edit"><li class="flexbox justify-between"> <fa icon="edit" class="right" /> Tutti i tuoi appunti</li></a> 
            <a href="/panel/settings"><li class="flexbox justify-between"> <fa icon="cog" class="right" /> Impostazioni profilo </li></a>
            <a href="/panel/developer"><li class="flexbox justify-between"> <fa icon="cog" class="right" /> Pannello developer </li></a>
            <li @click="logout" class="flexbox justify-between"> <fa icon="sign-out-alt" class="right" /> Logout </li>
        </ul>
        <div class="flexbox align-top" style="margin-top: 50px; width: 100%;">
            <div style="margin-right: 40px; width: 70%;" id="cont">
                <h3> Ultimi appunti caricati </h3>
                <ul class="fancy-list">
                    <li v-for="note in latest_items" :key="note.id">
                        <div class="flexbox justify-between align-center" style="min-height: 50px; overflow-x: hidden;">
                                <div style="width: 85%;">
                                    <span style="display: inline-block;"> {{ note.title }} </span><br>
                                    <span style="font-family: 'IBM Plex Sans', sans-serif; font-size: .89em;"> {{ note.visits }} visualizzazioni </span>
                                </div>
                                <div style="width: 15%; text-align: right;">
                                    <a :href="`/panel/edit/note/${note.subject_id}/${note.note_id}`">
                                        <div class="icon" :aria-label="`Modifica`" data-balloon-pos="left">
                                            <fa icon="edit" />
                                        </div>
                                    </a>
                                    <div class="icon" @click="deleteNote(note.note_id, note.subject_id, note.title)" :aria-label="`Elimina appunto`" data-balloon-pos="up">
                                            <fa icon="trash" />
                                        </div>
                                </div>
                            </div>
                    </li> 
                </ul>
            </div>
            <div class="box rounded bright" style="text-align: center; flex: 1; max-height: 300px;" id="counter">  
                <SVGCircle :stroke-width="2.5" :size="150" ref="size" id="circle" :initial-value="0.1" :radius="65" font-size="1.5em" fill="#212121" style="margin-top: 20px;" />
                <p class="dark"> 
                    <b>{{ size_info.folder_size_megabytes }}MB</b> su <b>{{ size_info.max_folder_size_megabytes }}MB utilizzati</b>
                </p>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { methods } from '@/lib/api'
import Loading from '@/components/Loading.vue';

export default Vue.extend({
    layout: 'panel',
    components: {
        Loading
    },
    data(){
        return {
            userIsAdmin: false,
            latest_items: [],
            size_info: {
                folder_size_megabytes: '',
                max_folder_size_megabytes: ''
            },
            name: this.$store.getters.getUser.name
        }
    },
    async created(){

        try{
            this.userIsAdmin = this.$store.getters.getUser.admin;

            let latest_items = await (this as any).$api.methods.notes.get(`&author_id=${this.$store.getters.getUser.id}&order_by=date`, 1);   
            
            this.latest_items = latest_items;

            let size = await (this as any).$api.methods.users.size();

            this.size_info = size; 
            this.$refs.size.progress(size.completion_percentage);

        }catch(err){

            console.log((err as any).response);

        }

    },
    mounted(){

        setTimeout((this.$refs.spinner as any).hide, 250);
        
    },
    methods: {
        logout(){

            methods.clearCookies();
            this.$store.commit('notLogged')
            this.$router.push('/');

        },
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