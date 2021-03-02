<template>
    <section id="main">
        <Loading ref="spinner" />
        <h1 class="main" style="margin: 0;"> Ciao, {{ name }} </h1>
        <h2> Ecco un veloce riepilogo </h2>
        <div class="flexbox align-top" style="margin-top: 50px; width: 100%;">
            <div style="margin-right: 40px; width: 70%;">
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
                                </div>
                            </div>
                    </li> 
                </ul>
            </div>
            <div class="box rounded bright" style="text-align: center; flex: 1; max-height: 300px;">  
                <SVGCircle :stroke-width="2.5" ref="size" id="circle" :initial-value="0.1" :radius="100" fill="#212121" />
                <p class="dark"> 
                    <b>{{ size_info.folder_size_megabytes }}MB</b> su <b>{{ size_info.max_folder_size_megabytes }}MB utilizzati</b>
                </p>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/Loading.vue';

export default Vue.extend({
    layout: 'panel',
    components: {
        Loading
    },
    data(){
        return {
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
            
            let latest_items = await (this as any).$api.methods.notes.get(`&author_id=${this.$store.getters.getUser.id}&order_by=date`, 1);   
            this.latest_items = latest_items;

            let size = await (this as any).$api.methods.users.size();
            this.size_info = size; 

            this.$refs.size.progress(size.completion_percentage);

        }catch(err){

            console.log(err.response);

        }

    },
    mounted(){

        setTimeout((this.$refs.spinner as any).hide, 250);
        
    },
    methods: {
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