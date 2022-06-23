<template>
    <ssf-row>

        <ssf-col class="text-right" size="12">

            <button class="btn color-2 text-white px-0" type="button" @click="next">
                suivant
                <ssf-icon icon="arrow-to-right" light/>
            </button>

        </ssf-col>

    </ssf-row>
</template>

<script lang="ts">
    import { defineComponent } from "vue"

    export default defineComponent({
        name: "next-button",

        emits: [ 'next:step' ],

        setup(props, { emit }) {
            const next = () => emit('next:step')

            return {
                next
            }
        }

    })
</script>

<style lang="scss" scoped>

</style>
