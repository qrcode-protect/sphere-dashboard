<template>
    <vue-pdf
        v-if="isPdf"
        :enable-annotations="false"
        :enable-text-selection="false"
        :src="src"
        class="rounded"/>
    <img v-else :alt="src" :src="src" class="img-fluid rounded"/>
</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import { VuePdf }          from "vue3-pdfjs";

    export default defineComponent({
        name: "file-preview",

        props: {
            src: { type: String, required: true },
            isPdf  : { type: Boolean, required: false, default: false },
        },


        components: { VuePdf },

        setup() {
            ////////// init

            ////////// data

            ////////// computed

            ////////// methods
        }

    })
</script>

<style lang="scss" scoped>

    :deep(.vue-pdf__wrapper) {
        canvas {
            border-radius: var(--border-radius);
        }
    }

</style>
