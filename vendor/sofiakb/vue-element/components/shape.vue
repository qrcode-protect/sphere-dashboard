<template>
    <ssf-container :class="{'rounded-circle': circle}" :style="`height: ${size}px; width: ${width ?? size}px`" not-full>
        <slot/>
    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent } from "vue"

    export default defineComponent({
        name: "ssf-shape",

        props: {
            size  : { type: [ String, Number ], required: true },
            width : { type: [ String, Number ], required: false },
            circle: { type: Boolean, required: false, default: false }
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
