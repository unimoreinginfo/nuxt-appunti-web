<template>
  <div> 
    <div id="navbar" class="flexbox justify-between">
      <span id="logo" class="bright">
        appunti.me
      </span>
      <div id="desktop">
        <nav class="bright">home</nav>
        <nav class="bright">materie disponibili</nav>
        <nav class="bright"><b>segnala un bug!</b></nav>
        <nav class="bright">login</nav>
      </div>
    </div>
    <section id="main" class="full flexbox justify-center align-center">
      <div class="container">
        <div class="flexbox align-center">
            <div style="width: 70%;">
                <h1 class="main" style="text-align: left">appunti.me</h1>
                <h2 class="main" style="text-align: left;"> fatto da studenti, per gli studenti </h2>
                <form class="full-width centered">
                    <div class="flexbox" style="align-items: flex-start;">
                        <SimulatedSelect right-icon="chevron-down" placeholder="Seleziona materia" data-id="select1" title="test" :items="[{ name: 'Analisi Matematica II', value: 'asdjiasnbd', uri: 'asidjnasd' }]" />
                        <Searchbar ref="searchbar" model="fancy full-width" id="search" placeholder="Che cosa stai cercando?" :searchAction="thing" :disable-results="false" outer-style="width: calc(100% - 250px); margin: 0 auto;" result-model="bright h100 hover-darken-blue" />
                    </div>
                </form>
            </div>
            <div class="box" style="flex: 1; height: 70vh; overflow: hidden;">
                <h2 class="main"> Ultimi caricamenti </h2>
                <div class="item bright flexbox align-center">
                    <div>
                        <h2> Analisi Matematica II </h2>
                        <span> di Emiliano Maccaferri </span>
                    </div>
                </div>
                <div class="item bright flexbox align-center">
                    <div>
                        <h2> Calcolatori Elettronici </h2>
                        <span> di Emiliano Maccaferri </span>
                    </div>
                </div>
                <div class="item bright flexbox align-center">
                    <div>
                        <h2> Elettronica Digitale &mdash; CMOS e PMOS </h2>
                        <span> di Emiliano Maccaferri </span>
                    </div>
                </div>
                <div class="item bright flexbox align-center">
                    <div>
                        <h2> Statistica e Probabilità &mdash; Introduzione </h2>
                        <span> di Emiliano Maccaferri </span>
                    </div>
                </div>
                <div class="item bright flexbox align-center">
                    <div>
                        <h2> Geometria &mdash; Operazioni su matrici </h2>
                        <span> di Emiliano Maccaferri </span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data(){
        return{
            items: [

            ]
        } // prototyping
    },
    methods: {
        thing(){
            
            return [
                {
                    title: 'Analisi Matematica II',
                    author: 'Emiliano Maccaferri',
                    id: 2213312
                },
                {
                    title: 'Calcolatori Elettronici',
                    author: 'Emiliano Maccaferri',
                    id: 2213316
                },
                {
                    title: 'Elettronica Digitale — CMOS e PMOS',
                    author: 'Emiliano Maccaferri',
                    id: 2213317
                },
                {
                    title: 'Statistica e Probabilità — Introduzione',
                    author: 'Emiliano Maccaferri',
                    id: 2213323
                },
                {
                    title: 'Geometria — Operazioni su matrici',
                    author: 'Emiliano Maccaferri',
                    id: 2213313
                }
            ]
            
        }
    },
    head(){
        return {
            title: 'appunti.me — home'
        }
    }
})
</script>