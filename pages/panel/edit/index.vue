<template>
  <div> 
    <Loading ref="spinner" />
    <section id="main" class="full">
        <nuxt-link to="/panel" id="back">
            <div class="flexbox align-center" style="margin-bottom: 20px; background: #fefefe; max-width: 200px; width: 100%; padding-left: 10px; padding-right: 10px;">
                <fa icon="arrow-alt-circle-left" style="font-size: 2em; color: #5352ed; margin-right: 20px;" /> <p style="color: #5352ed">Torna alla home</p>
            </div>
        </nuxt-link>
      <div class="container" style="width: 100%;" >
        <div class="flexbox">
            <div style="width: 100%;" id="notes">
                <h1>I tuoi appunti</h1>
                <ul class="fancy-list">
                    <li v-for="note in notes" :key="note.id">
                        <div class="flexbox justify-between align-center" style="min-height: 50px; overflow-x: hidden;">
                                <div style="width: 85%;">
                                    <span style="display: inline-block;"> {{ note.title }} </span><br>
                                    <span style="font-family: 'IBM Plex Sans', sans-serif; font-size: .89em;"> {{ note.visits }} visualizzazioni </span><br>
                                    <span style="font-family: 'IBM Plex Sans', sans-serif; font-size: .89em;"> {{ note.subject_name }} </span>
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
           
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Loading from '@/components/Loading.vue';

/*  in sto file non posso usare il mixin dell'infinite scroll perché non posso accedere alle variabili dello store 
    (perché il mixin viene chiamato prima che il componente venga registrato sulla pagina)
*/

export default Vue.extend({
    layout: 'panel',
    name: 'edit',
    components: {
        Loading
    },
    data: () => {
        return {
            notes: [],
            notePages: 0,
            loadedPages: [1],
            load: true
        };
    },
    async created(){
        try {
            var notesData = await (this as any).$api.methods.notes.get(`&translate_subjects=true&order_by=date&author_id=${this.$store.getters.getUser.id}`, 1, true);
            this.$data.notes = notesData.result;
            this.$data.notePages = notesData.pages;
        } catch(err) {
            console.log(err);
        }
    },
    mounted(){
        (this.$refs.spinner as any).hide()     
    },
    beforeMount () {
        window.addEventListener('scroll', this.onscroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onscroll);
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
                this.notes = [];
                for(let i = 1; i<=this.loadedPages.length; i++) {
                    this.addNotePages(i);
                }
            }
        },
        // roba infinite scroll
        addNotePages(page: number) {
            console.log(`loading page ${page}`);
            console.log(this.$data.notes);
            (this as any).$api.methods.notes.get(`&translate_subjects=true&order_by=date&author_id=${this.$store.getters.getUser.id}`, page, false).then((data: any) => {

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