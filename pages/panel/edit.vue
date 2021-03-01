<template>
  <div> 
    <section id="main" class="full flexbox justify-center">
      <div class="container" style="margin-bottom:20px">
        <div class="flexbox">
            <div style="width: 70%;" id="notes">
                <h1>Appunti</h1>
                <ul class="fancy-list">
                    <li v-for="note in notes" :key="note.id">
                        <div class="flexbox justify-between align-center" style="min-height: 50px; overflow-x: hidden;">
                                <div style="width: 85%;">
                                    <span style="display: inline-block;"> {{ note.title }} </span><br>
                                     <span style="font-family: 'IBM Plex Sans', sans-serif;"> di <b>{{ note.name }} {{ note.surname }}</b></span><br>
                                    <span style="font-family: 'IBM Plex Sans', sans-serif; font-size: .89em;"> {{ note.visits }} visualizzazioni </span>
                                </div>
                                <div style="width: 15%; text-align: right;">
                                    <a :href="`/panel/editNote/${note.subject_id}/${note.note_id}`">
                                        <div class="icon" :aria-label="`Modifica`" data-balloon-pos="left">
                                            <fa icon="edit" />
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
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { methods } from '@/lib/api';

export default Vue.extend({
    layout: 'panel',
    data: () => {
        return {
            loadedPages: [1],
            load: true
        };
    },
    async asyncData(){
        let items = {
            notes: [],
            notePages: 0
        }; 
        try {
            var notesData = await methods.notes.get('&order_by=date', 1, true);
            items.notes = notesData.result;
            items.notePages = notesData.pages;
        } catch(err) {
            console.log(err);
        }finally{
            return items;
        }
    },
    beforeMount () {
        window.addEventListener('scroll', this.onscroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onscroll);
    },
    methods: {
        // roba infinite scroll
        addNotePages(page: number) {
            console.log(`loading page ${page}`);
            console.log(this.$data.notes);
            methods.notes.get(`&order_by=date&page=${page}`, 1, false).then((data) => {
                this.$data.notes=this.$data.notes.concat(data);
                
            });
        },
        onscroll() {
            // chiamato per ogni scroll, debouncing scorrimento
            if(this.$data.load) {
                this.$data.load = false;
                setTimeout(() => {this.$data.load = true}, 500);
                setTimeout(this.onScroll, 200);
            }
        },
        onScroll() {
            // funzione che fa funzionare l'infinite scroll vero e proprio
            if(this.$data.loadedPages[this.$data.loadedPages.length-1] < this.$data.notePages) {
                console.log("fired onscroll");
                let totalPageHeight = document.body.scrollHeight;
                let scrollPoint = window.scrollY + window.innerHeight;               
                if(scrollPoint >= totalPageHeight - 200){
                    let pageToBeLoaded = this.$data.loadedPages[this.$data.loadedPages.length-1]+1;
                    this.$data.loadedPages.push(pageToBeLoaded);
                    this.addNotePages(pageToBeLoaded);
                }
            }
        }
    },
    head(){
        return {
            title: 'appunti.me — lista appunti caricati',
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