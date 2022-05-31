<template>
    <ssf-container class="py-3">
        <ssf-title center class="text-uppercase" style="font-weight: 500;">
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
