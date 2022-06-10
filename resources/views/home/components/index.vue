<template>
    <ssf-container class="full-absolute full-flex flex-column color-1 ahead bg-color-1" name="home">

        <img alt="Animated logo" class="position-absolute img-fluid behind" src="@/assets/img/logo-animated.gif">

        <ssf-container not-full class="bg-white p-3 rounded z-depth-1">

            <ssf-container>
                <logo class="mb-3 home-logo"/>
            </ssf-container>

            <ssf-container class="text-center">
                <ssf-text class="font-weight-light text-uppercase h4-responsive">Dashboard</ssf-text>
            </ssf-container>

        </ssf-container>

    </ssf-container>
</template>

<script>
    import { defineComponent } from "vue";
    import Logo                from "@/components/commons/logo";

    export default defineComponent({
        name: "home-index",

        components: { Logo },

        metaInfo: {
            title: 'Accueil',
        },

    })
</script>

<style lang="scss" scoped>

    .home-logo {
        filter: invert(1);
    }

</style>
