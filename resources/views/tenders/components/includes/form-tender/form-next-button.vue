<template>
    <ssf-container name="form-next-button" not-full @click="$emit('next')">

        <ssf-row>

            <ssf-col class="text-right" size="12">

                <button class="btn color-2 pr-0" type="button">
                    {{ text }}
                    <ssf-icon icon="arrow-to-right" light/>
                </button>

            </ssf-col>

        </ssf-row>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent } from "vue"

    export default defineComponent({
        name: "form-next-button",

        emits: [ 'next' ],

        props: {
            text: { type: String, required: false, default: 'Suivant' }
        },

        setup() {
            ////////// init

            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>
