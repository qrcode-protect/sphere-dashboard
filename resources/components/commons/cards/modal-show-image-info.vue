<template>

    <ssf-modal v-model="open"
               :click-to-close="false"
               :esc-to-close="false"
               :name="modalName"
               attach="#app"
               body-classes="p-0 rounded"
               classes="modal-container full-flex modal-edit-partner rounded"
               content-class="modal-content z-depth-0 bg-transparent full-flex rounded"
               drag
               fit-parent
               header-classes="bg-transparent rounded border-0"
               lock-scroll>

        <template #header>
            <ssf-shape circle
                       class="border border-color-1 color-1 mx-auto full-flex cursor-pointer" size="50"
                       @click="$emit('close')">
                <ssf-icon icon="xmark" size="2x" thin/>
            </ssf-shape>
        </template>

        <template #body>

            <img :alt="alt" :src="src" class="img-fluid rounded"/>

        </template>

    </ssf-modal>

</template>

<script lang="ts">
    import { defineComponent } from "vue"

    export default defineComponent({
        name: "modal-show-image-info",

        props: {
            modalName: { type: String, required: false, default: 'modal-show-image-info' },
            open     : { type: Boolean, required: false, default: false },
            src      : { type: String, required: true },
            alt      : { type: String, required: true },
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

    :deep(.vfm__overlay ) {
        background-color: transparent !important;
    }

</style>
