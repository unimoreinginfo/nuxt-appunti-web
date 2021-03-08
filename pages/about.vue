<template>
  <section class="full flexbox align-center justify-center">
        <div class="container" style="margin: 0 auto; text-align: justify;">
            <div style="position: sticky; top: 80px; background: #5352ed; z-index: 2;">
                <h1 class="main" id="title"> About </h1>
                <p style="font-size: 1.2em;"> 
                    Per utilizzare il sito è necessario essere iscritti regolarmente ad Unimore e dunque possedere un indirizzo email utilizzabile al quale recapitare eventuali comunicazioni/mail di conferma account. Senza un account Unimore sarà possibile registrarsi, ma non si potranno caricare file.<br>
                    Non diffondiamo alcun dato che raccogliamo e li teniamo al sicuro sul nostro server tramite crittografia AES-256.<br>
                    Gli appunti che vengono caricati sono controllati periodicamente e gli amministratori del sito si prendono la libertà di rimuovere determinati file in caso non vengano ritenuti consoni al sito.
                    <br>
                    Il nostro è un progetto completamente open source, vienici a trovare su <a class="normal" href="https://github.com/unimoreinginfo/">GitHub!</a>
                </p>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    head(){
        return {
            title: 'appunti.me — about',
            meta: [
                {
                    hid: 'theme-color',
                    name: 'theme-color',
                    content: '#5352ed'
                },
                {
                    hid: 'title',
                    name: 'title',
                    content: 'appunti.me — about'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'la piattaforma di appunti completamente open source!'
                },
                {
                    hid: 'og:type',
                    property: 'og:type',
                    content: 'website'
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: `${process.env.URI}${this.$route.fullPath}`
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: `appunti.me — about`
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: 'la piattaforma di appunti completamente open source!'
                }, 
                {
                    hid: 'twitter:card',
                    property: 'twitter:card',
                    content: 'summary_large_image'
                },
                {
                    hid: 'twitter:url',
                    property: 'twitter:url',
                    content: `${process.env.URI}${this.$route.fullPath}`
                },
                {
                    hid: 'twitter:title',
                    property: 'og:title',
                    content: `appunti.me — about`
                },
                {
                    hid: 'twitter:description',
                    property: 'og:description',
                    content: 'la piattaforma di appunti completamente open source!'
                }                               
            ]
        }
    }
})
</script>