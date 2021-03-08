<template>
  <div> 
    <section id="main" class="full">
      <div class="container" style="width: 100%;" >
        <div class="flexbox">
            <div style="width: 100%;" id="users">
                <h1>Tutti gli utenti del sito</h1>
                <ul class="fancy-list">
                    <li v-for="user in users" :key="user.id">
                        <a :href="`/panel/edit/user/${user.id}`">
                            <div class="flexbox justify-between align-center" style="min-height: 50px; overflow-x: hidden;">
                                    <div style="width: 85%;">
                                        <span style="display: inline-block;"> {{ user.name }} {{ user.surname }} </span><br>
                                        <span style="font-family: 'IBM Plex Sans', sans-serif; font-size: .89em;"> ID Unimore: {{ user.unimore_id }} </span>
                                        <span style="font-family: 'IBM Plex Sans', sans-serif; font-size: .89em;"> email: {{ user.email }} </span>
                                        <span v-if="user.verified" color="green">utente verificato</span>
                                        <span v-else color="red">utente non verificato</span>
                                    </div>
                                </div>
                            </a>
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


/*  in sto file non posso usare il mixin dell'infinite scroll perché non posso accedere alle variabili dello store 
    (perché il mixin viene chiamato prima che il componente venga registrato sulla pagina)
*/

export default Vue.extend({
    layout: 'adminpanel',
    mixins: [

    ],
    data: () => {
        return {
            userPages: 1,
            load:true,
            loadedPage: 1,
            users: []
        };
    },
    async beforeMount () {
        try {
            let ret = await (this as any).$api.methods.users.getPage(1, true);
            this.$data.users = ret.result;
            this.$data.userPages = ret.pages;
        } catch(err) {
            console.log(err);
        }
        window.addEventListener('scroll', this.onscroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onscroll);
    },
    methods: {
        // roba infinite scroll
        addUserPages(page: number) {
            console.log(`loading page ${page}`);
            (this as any).$api.methods.users.getPage(page, false).then((data: any) => {
                this.$data.users=this.$data.users.concat(data);
                
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
            if (this.$data.loadedPage < this.$data.userPages) {
                    console.log("fired onscroll");
                    let totalPageHeight = document.body.scrollHeight;
                    let scrollPoint = window.scrollY + window.innerHeight;
                    if (scrollPoint >= totalPageHeight - 200) {
                        this.$data.loadedPage++;
                        this.addUserPages(this.$data.loadedPage);
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