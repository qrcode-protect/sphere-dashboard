<template>
    <ssf-row>

        <ssf-col class="text-left" size="12">

            <button class="btn color-1 text-white px-0" type="button" @click="previous">
                <ssf-icon icon="arrow-to-left" light/>
                précédent
            </button>

        </ssf-col>

    </ssf-row>
</template>

<script lang="ts">
    import { defineComponent } from "vue"

    export default defineComponent({
        name: "previous-button",

        emits: [ 'previous:step' ],

        setup(props, { emit }) {
            const previous = () => emit('previous:step')

            return {
                previous
            }
        }

    })
</script>

<style lang="scss" scoped>

</style>
