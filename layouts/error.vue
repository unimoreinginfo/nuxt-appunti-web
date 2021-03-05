<template>
  <div> 
    <section id="main" class="full flexbox justify-center align-center">
      <div class="container">
        <div class="flexbox align-center justify-center">
            <div style="text-align: center;">
                <h1 class="main" v-if="error.statusCode === 404">Pagina non trovata!</h1>
                <h1 class="main" v-if="error.statusCode === 500">Errore nel backend :\</h1>
                <h1 class="main" v-if="error.statusCode === 401">Non sei autorizzato a vedere questo contenuto</h1>
                <h1 class="main" v-if="error.statusCode === 403">Non sei autorizzato a vedere questo contenuto</h1>
                <h2 class="main"> <a href="/" class="normal"> torna alla homepage </a> </h2>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    props: ['error'],
    layout: 'error' 
  }
</script>