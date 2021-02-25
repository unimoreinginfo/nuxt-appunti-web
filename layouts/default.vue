<template>
  <div>
    <div id="navbar" class="flexbox justify-between" style="background: #5352ed;">
      <span id="logo" class="bright">
        <a href="/" style="text-decoration: none; color: inherit;">appunti.me</a>
      </span>
      <div id="desktop">
        <a href="/"><nav class="bright">home</nav></a>
        <a href="/subjects"><nav class="bright">materie disponibili</nav></a>
        <a href="/login"><nav class="bright"><b>login</b></nav></a>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<style lang="scss">

    @import '@/assets/scss/style.scss';

</style>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted(){

    console.log(this.$route.path);
    

  }
})
</script>