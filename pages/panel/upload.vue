<template>
    <section id="main">
        <h1 style="margin: 0;"> Carica qualcosa </h1>
        <div class="flexbox align-top" style="width: 100%;">
            <p> 
                Puoi caricare un massimo di <b> 20 </b> file alla volta con dimensione massima dell'upload di <b>20MB</b>.
            </p>
        </div>
    </section>
</template>
<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
    layout: 'panel'
})

</script>