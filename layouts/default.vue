<template>
  <div>
    <div id="navbar" v-if="$route.path != '/'">
      <span id="logo">
        appunti.me
      </span>
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