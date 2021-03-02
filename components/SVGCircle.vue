<template>
    <div>
        <svg
                    class="progress-ring"
                    width="250"
                    height="250">
                <circle
                    class="progress-ring"
                    :id="$props.id"
                    :stroke="$props.fill || '#fefefe'"
                    :stroke-width="$props.strokeWidth || 1"
                    fill="transparent"
                    :r="$props.radius || 100"
                    cy="50%"
                    cx="50%" 
                    :style="{'opacity': loaded}"
                />
                <text v-if="loaded" x="50%" y="52.5%" :fill="$props.fill || '#fefefe'" text-anchor="middle" 
                    style="font-family: 'IBM Plex Sans', sans-serif; transform: rotate(-45deg); font-size: 2em; transform-origin: 50% 50%;"
                >
                    {{ value }}%
                </text>
                </svg>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data(){
        return {
            el: {} as any,
            len: 2 * Math.PI * parseFloat(this.$props.radius),
            loaded: 0,
            value: parseFloat(this.$props.initialValue)
        }
    },
    props: {
        initialValue: Number,
        id: String,
        radius: Number,
        fill: String,
        strokeWidth: Number
    },
    mounted(){        

        if(isNaN(this.$props.initialValue))
            this.value = 100;
        
        this.el = document.getElementById(this.$props.id);        
        (this.el as HTMLElement).style.strokeDasharray = `${this.len} ${this.len}`
        this.progress(this.value);
        this.loaded = 1;
    },
    methods: {
        progress(percentage: number){
            console.log(`setting percentage ${percentage}`);
            this.value = parseFloat(percentage.toFixed(2));
            this.el!.style.strokeDashoffset = (this.len - percentage / 100 * this.len).toString();
        }
    }
})
</script>
<style lang="scss" scoped>
    .progress-ring{
        transition: 0.5s stroke-dashoffset ease-in-out;
        transform: rotate(45deg);
        transform-origin: 50% 50%;
    }
</style>