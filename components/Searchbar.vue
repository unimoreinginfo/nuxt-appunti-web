<template>
    <div :id="$props.id" :style="$props.outerStyle">
        <input type="text" :placeholder="$props.placeholder" :class="$props.model" @input="search()" v-model="query">
        <transition-group name="list" tag="ul" class="result-holder">
            <li v-for="result in items" :key="result.id" :class="['result', 'flexbox align-center', $props.resultModel]">
                <div style="text-align: left;">
                    <h2> {{ result.title }} </h2>
                    <span> {{ result.author }} </span>
                </div>
            </li>
        </transition-group>
    </div>
</template>
<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
    name: 'searchbar',
    props: {
        model: String,
        placeholder: String,
        searchAction: Function,
        outerStyle: String,
        resultModel: String,
        disableResults: Boolean
    },
    data(){
        return {
            items: [] as any,
            searchFunction: this.$props.searchAction,
            query: '',
            time: {} as any
        }
    },
    methods: {
        async search(){

            // debounce implementation molto veloce

            clearTimeout(this.time)

            this.time = setTimeout(async() => {
                if(!this.$props.disableResults)
                    this.items = await this.searchFunction();
                else await this.searchFunction();
            }, 500)

        }
    }
})

</script>
<style scoped lang="scss">
    
    @import '@/assets/scss/partials/colors';
    .result-holder{
        padding: 0;
        margin: 0 auto;
        max-height: 400px;
        width: 100%;
        overflow: auto;
        margin-top: 5px;
            &::-webkit-scrollbar {
                width: 5px;
            }
            &::-webkit-scrollbar-thumb {
                background-color: $white;
            }
        .result{
            padding-left: 10px;
            padding-right: 10px;
            cursor: pointer;
            span{
                display: block;
                font-size: .89em;
                font-family: 'IBM Plex Sans', sans-serif;
            }
            &.h100{
                height: 120px;
            }
            h2{
                font-size: 1.2em;
                margin: 0;
                font-weight: lighter;
                font-family: 'DM Sans', sans-serif;
            }
            &.bright{
                color: $white;
                border-bottom: 5px solid rgba(0,0,0,0.07);
            }
        }
    }

</style>