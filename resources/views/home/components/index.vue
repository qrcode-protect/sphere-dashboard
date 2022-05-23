<template>
    <ssf-container class="full-absolute full-flex bg-color-1 flex-column text-white" name="home">

        <logo class="mb-3"/>
        <ssf-text class="font-weight-light text-uppercase h4-responsive">Dashboard</ssf-text>

    </ssf-container>
</template>

<script>
    import { defineComponent } from "vue";
    import Logo                from "@/components/commons/logo";

    export default defineComponent({
        name      : "home-index",
        components: { Logo },
        metaInfo  : {
            title: 'Accueil',
        },

        data() {
            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>
