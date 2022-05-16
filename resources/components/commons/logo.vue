<template>
    <img src="@/assets/img/logo.png" alt="Logo" :height="height" :width="width" v-if="height && width"/>
    <img src="@/assets/img/logo.png" alt="Logo" :height="height" v-else-if="height"/>
    <img src="@/assets/img/logo.png" alt="Logo" :width="width" v-else-if="width"/>
    <img src="@/assets/img/logo.png" alt="Logo" v-else/>
</template>

<script>

    import {defineComponent} from "vue";

    export default defineComponent({
        name: "logo",

        props: {
            height: { type: [String, Number], required: false },
            width : { type: [String, Number], required: false }
        }
    })
</script>

<style scoped>

</style>
