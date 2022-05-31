<template>

    <h1 v-if="h1" :class="{'m-0': noMargin, 'text-center': center}" class="ssf__title ssf__title-h1">
        <slot/>
    </h1>
    <h2 v-else-if="h2" :class="{'m-0': noMargin, 'text-center': center}" class="ssf__title ssf__title-h2">
        <slot/>
    </h2>
    <h3 v-else-if="h3" :class="{'m-0': noMargin, 'text-center': center}" class="ssf__title ssf__title-h3">
        <slot/>
    </h3>
    <h5 v-else-if="h5" :class="{'m-0': noMargin, 'text-center': center}" class="ssf__title ssf__title-h5">
        <slot/>
    </h5>
    <h6 v-else-if="h6" :class="{'m-0': noMargin, 'text-center': center}" class="ssf__title ssf__title-h6">
        <slot/>
    </h6>
    <h4 v-else :class="{'m-0': noMargin, 'text-center': center}" class="ssf__title ssf__title-h4">
        <slot/>
    </h4>

</template>

<script lang="ts">
    import { defineComponent } from "vue"

    export default defineComponent({
        name: "ssf-title",

        props: {
            h1      : { type: Boolean, required: false },
            h2      : { type: Boolean, required: false },
            h3      : { type: Boolean, required: false },
            h4      : { type: Boolean, required: false },
            h5      : { type: Boolean, required: false },
            h6      : { type: Boolean, required: false },
            noMargin: { type: Boolean, required: false },
            center: { type: Boolean, required: false },
        }
    })
</script>

<style lang="scss" scoped>

</style>
