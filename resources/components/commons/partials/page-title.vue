<template>
    <ssf-container class="text-center py-3">
        <ssf-title class="text-center">
            {{ title }}
        </ssf-title>
    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent } from "vue"

    export default defineComponent({
        name: "page-title",

        props: {
            title: { type: String, required: true }
        },

        setup() {
            ////////// init

            ////////// data

            ////////// computed

            ////////// methods
        }

    })
</script>

<style lang="scss" scoped>

</style>
