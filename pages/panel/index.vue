<template>
    <section id="main" class="full flexbox justify-center">
      <div class="container" style="margin-top:100px;margin-bottom:50px;color:white">
          <h1> Benvenuto/a! </h1>
      </div>
    </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { methods } from '@/lib/api';

export default Vue.extend({
    data(){
        return {
            
            items: []

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