<template>
    <div :id="$props.id" :style="$props.outerStyle" style="position: relative;">
        <input type="text" :placeholder="$props.placeholder" :class="$props.model" @input="search()" v-model="query">
        <ul class="result-holder" :class=[$props.resultHolderModel]>
            <li v-for="result in items" :key="result.id" :class="['result', $props.resultModel]">
                <a class='flexbox align-center' :href="result.url" style="color: inherit; text-decoration: none; width: 100%; height: 100%;">
                    <div style="text-align: left; ">
                        <h2> {{ result.title }} </h2>
                        <span v-if="!result.hide_author"> di <a class="normal" :href="`/author/${result.author_id}`">{{ result.name }} {{result.surname}}</a> </span>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">

import Vue from 'vue'
import subjects from '~/lib/api/subjects'

export default Vue.extend({
    name: 'searchbar',
    props: {
        model: String,
        placeholder: String,
        searchAction: Function,
        outerStyle: String,
        resultModel: String,
        disableResults: Boolean,
        resultHolderModel: String,
        timeout: Boolean,
        disableMore: Boolean,
        searchPageUrlGen: Function
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
            if(this.query == '')
                this.items = []

            clearTimeout(this.time)
            console.log(this.$props.disableTimeout);
            

            this.time = setTimeout(async() => {
                if(!this.$props.disableResults){
                    this.items = await this.searchFunction();
                    
                    if(!this.items.length)
                        return this.items.push({ title: 'Nessun risultato trovato :(', hide_author: true })

                    this.items.forEach((item: any) => {
                        item["url"] = `/item/${item.subject_id}/${item.id}`;
                    })

                    if(!this.disableMore)
                        this.items.push({ title: 'Clicca per visualizzare altri risultati', url: this.searchPageUrlGen(), hide_author: true })
                    
                }
                else await this.searchFunction();
                
            }, (this.$props.timeout) ? 500 : 1)

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
        background: $blue;
        &.absolute{
            position: absolute;
            z-index: 20;
            box-shadow: 0 14px 28px rgba(0,0,0,0.05), 0 10px 10px rgba(0,0,0,0.07);
        }
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

    @media screen and (max-width: 768px){
        .result-holder{
            max-height: 200px;
            .result{
                h2{
                    font-size: 1.05em;
                }
                span{
                    font-size: .8em;
                }
            }
        }
    }

</style>