<template>

    <ssf-container :data-initial="content[0]" class="initial-item" not-full>
        {{ content }}
    </ssf-container>

</template>

<script lang="ts">

    import { defineComponent } from "@vue/runtime-core";

    import './assets/css/ssf-initial.min.css'

    export default defineComponent({
        name: "ssf-initial",

        props: {
            content: { type: String, required: true }
        }

    })
</script>
