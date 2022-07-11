<template>
    <ssf-container name="form-prev-button" not-full @click="$emit('prev')">

        <ssf-row>

            <ssf-col class="text-left" size="12">

                <button class="btn color-2 pl-0" type="button">
                    <ssf-icon icon="arrow-to-left" light/>
                    Précedent
                </button>

            </ssf-col>

        </ssf-row>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent } from "vue"

    export default defineComponent({
        name: "form-prev-button",

        emits: [ 'prev' ],

        setup() {
            ////////// init

            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>
