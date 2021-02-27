<template>
  <div> 
    <section id="main" class="full flexbox justify-center">
      <div class="container" style="margin-top:100px;margin-bottom:50px;color:white">
        <div class="flexbox">
            <div style="width: 50%;" id="notes">
                <h1>Appunti</h1>
                <div v-for="item in notes" :key="item.id" class="item bright flexbox">
                    <a :href="`/panel/editNote/${item.subject_id}/${item.note_id}`" style="text-decoration: none; color: inherit;">
                        <div>
                            <h2> {{ item.title }} </h2>
                            <span> {{ item.subject_name }} </span>
                            <span style="font-size: .75em"> di {{ item.name }} {{ item.surname }} </span>
                        </div>
                    </a>
                </div>
            </div>
            <div style="margin-left:30px" id="users">
                <h1>Utenti</h1>
                <div v-for="item in users" :key="item.id" class="item bright flexbox">
                    <a :href="`/panel/editUser/${item.id}`" style="text-decoration: none; color: inherit;">
                        <div>
                            <h2> {{ item.name }} {{ item.surname }} </h2>
                        </div>
                    </a>
                </div>
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
    data(){
        items: []
    },
    async created(){

        let items = {
            notes: [],
            notePages: 0,
            users: [],
            userPages: 0
        }; 

        try {

            var notesData = await methods.notes.get('&order_by=date&translate_subjects=true', 1, true);
            items.notes = notesData.result;
            items.notePages = notesData.pages;

            var usersData = await methods.users.getPage(1, true);    
            items.users = usersData.result;
            items.userPages = usersData.pages;
            // TODO:scrolling infinito
        } catch(err) {

            console.log(err);

        }finally{

            this.$data.items = items;

        }

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