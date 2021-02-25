<template>
    <div>
        <div class="row">
            <fa :icon="left_icon" />
                <input type="text" style="cursor: pointer;" autocomplete="none" :placeholder="place" readonly class="fancy" v-model="selected_text" @click="toggle()">
            <fa :icon="right_icon" class="right" />
        </div>
        <div class="desktop-selector-holder" :id="item_id">  
            <ul>
                <input class="fancy" type="text" v-if="filter" autocomplete="none" :placeholder="input_placeholder" style="text-indent: 20px;" v-model="search" :id="`${item_id}_input`">
                <li v-for="(item, i) in filteredList" :key="i" @click="selected_value = item.id; selected_text = `${item.name.trim().substring(0, 19)}${(item.name.length > 19) ? '...' : ''}`; toggle(); onClick()">
                    {{ item.name }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">

    import Vue from 'vue'
    import gsap, { Power2, TimelineMax, CSSPlugin } from 'gsap'
    // import { Property } from '@/lib/types';

    gsap.registerPlugin(CSSPlugin)

    const backup = () => { return; };

    export default Vue.extend({
        props: {
            "left-icon": String,
            "right-icon": String,
            placeholder: String,
            title: String,
            items: {},
            dataId: String,
            filtering: {},
            "input-placeholder": String,
            clicked: Function
        },
        data(){
            return {
                left_icon: this.$props["leftIcon"] || "",
                right_icon: this.$props["rightIcon"] || "", 
                place: this.$props["placeholder"] || "",
                item_id: this.$props["dataId"] || "",
                toggled: false,
                sel_title: this.$props["title"],
                list: this.$props["items"],
                items_list: [] as Array<any>,
                selected_value: null,
                filter: this.$props["filtering"],
                selected_text: '',
                timeline: new TimelineMax({ paused: true }),
                input_placeholder: this.$props["inputPlaceholder"],
                search: '',
                onClick: this.$props["clicked"] || backup
            }   
        },
        methods: {
            async toggle(){
                
                if(!this.toggled)
                    await this.timeline.play()
                    else await this.timeline.reverse();

                this.search = '';
                this.toggled = !this.toggled;
            }
        },
        computed: {
            filteredList(){

                let items = new Array();
                this.items_list.filter(item => {

                    if(item.name.toLowerCase().match(this.search.toLowerCase())) items.push(item)

                })
                return items;
                
            }
        },
        async mounted(){
        
            console.log(`loading ${this.title}`);

            this.timeline.to(`.desktop-selector-holder#${this.item_id}`, {
                        opacity: 1,
                        transform: 'translateY(0)',
                        pointerEvents: 'all',
                        ease: Power2.easeInOut,
                        duration: .4
                    })
            
            if(!this.item_id)
                throw new Error('must supply item id')

            console.log(this.$props.filtering);
            

            if(typeof this.list == 'object'){
                if(Array.isArray(this.list))
                    this.items_list = this.list;
                else throw new Error('list object must be an array')
            }
            else if(typeof this.list == 'function')
                this.items_list = await this.list();
            else throw new Error('invalid list object')
        }
    })
</script>
<style lang="scss">

    @import '@/assets/scss/partials/colors';
    .row{
        position: relative;
        svg{
            position: absolute;
            right: 10px;
            top: 50%;
            color: $white;
        }
    }
    .desktop-selector-holder{
        position: relative;
        background: white;
        width: 100%;
        margin: 0;
        z-index: 100 !important;
        opacity: 0;
        transform: translateY(-15px);
        pointer-events: none;
        ul{ 
            max-height: 250px;
            overflow-y: auto;
            overflow-x: hidden;
            
            cursor: pointer;
            box-shadow: 0 3px 5px rgba(0,0,0,0.05), 0 3px 6px rgba(0,0,0,0.003);
            border-bottom: 5px solid rgba(0,0,0,0.07);
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            width: 100%;
            padding: 0;
            list-style: none;
            background: $white;
            text-align: left;
            margin-top: 5px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            font-family: 'DM Sans', sans-serif;
            font-size: .9em;

            li{
                padding: 20px;
                &:hover{
                    background: rgba(0,0,0,0.05);
                }
            }
        }
    }

</style>