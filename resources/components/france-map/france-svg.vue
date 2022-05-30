<template>
    <svg id="map" baseProfile="tiny" class="d-block mx-auto full-flex" height="700" stroke-linecap="round" stroke-linejoin="round"
         version="1.2" viewBox="1825 0 700 700" width="700"
         xmlns="http://www.w3.org/2000/svg">
        <g id="regions">

            <path v-for="path in paths" :d="path.d" :data-region="path.region" @click="$emit('selected', path.region)"/>

        </g>
    </svg>

</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import paths               from "@/components/france-map/utils/paths";

    export default defineComponent({
        name: "france-svg",

        emits: [ 'selected' ],

        setup() {
            ////////// init

            ////////// data

            ////////// computed

            ////////// methods

            return {
                paths
            }
        }

    })
</script>

<style lang="scss" scoped>

</style>
