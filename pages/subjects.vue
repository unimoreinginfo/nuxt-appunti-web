<template>
    <section>
        <div class="container" style="margin: 0 auto; margin-top: 120px;">
            <h1 class="main"> Materie disponibili </h1>
            <h2 class="main"> Lista di materie disponibili su appunti.me (in aggiornamento) </h2>
            <form>
                <Searchbar ref="searchbar" model="fancy full-width" id="filter" placeholder="Filtra materie" :searchAction="filter" :disable-results="true" :timeout="false" outer-style="width: 100%; margin: 0 auto;" result-model="bright h100 hover-darken-blue" />
            </form>
            <div class="flexbox align-top justify-center wrap" style="margin-top: 80px; width: 100%; margin-left: -20px;">
                <a v-for="subject in filtered" :key="subject.id" :href="`/subject/${subject.id}`" style="margin: 20px; width: 23.3%;">
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
    async asyncData({ params }){
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
</style>