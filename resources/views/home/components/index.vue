<template>
    <ssf-container class="color-1 bg-color-1" name="home">

        <ssf-container class="py-3">
            <img id="animatedLogo" alt="Animated logo"
                 class="img-fluid mx-auto d-block"
                 src="@/assets/img/logo-animated.gif">
        </ssf-container>


        <ssf-container class="bg-white p-3 rounded z-depth-1" not-full>

            <ssf-container class="full-flex">
                <logo class="mb-3 home-logo"/>
            </ssf-container>

            <ssf-container class="text-center">
                <ssf-text class="font-weight-light text-uppercase h4-responsive">Dashboard</ssf-text>
            </ssf-container>

        </ssf-container>

        <ssf-row>

            <ssf-col v-for="countItem in countItems" lg="3" xs="12" md="4">

                <count-item :count="countItem.count" :label="countItem.label"/>

            </ssf-col>

        </ssf-row>

        <!--        <count-item :count="userCount" label="Utilisateurs inscrits"/>

                <count-item :count="userCount" label="Adhérents inscrits"/>

                <ssf-container class="bg-white p-3 rounded z-depth-1 mt-3" not-full>

                    <ssf-container class="text-center">
                        <ssf-text class="font-weight-light text-uppercase h4-responsive">XXX</ssf-text>
                    </ssf-container>

                    <ssf-container class="text-center">
                        <ssf-text class="font-weight-light text-uppercase h4-responsive">Utilisateurs connectés</ssf-text>
                    </ssf-container>

                </ssf-container>

                <ssf-container class="bg-white p-3 rounded z-depth-1 mt-3" not-full>

                    <ssf-container class="text-center">
                        <ssf-text class="font-weight-light text-uppercase h4-responsive">XXX</ssf-text>
                    </ssf-container>

                    <ssf-container class="text-center">
                        <ssf-text class="font-weight-light text-uppercase h4-responsive">Adhérents inscrits</ssf-text>
                    </ssf-container>

                </ssf-container>

                <ssf-container class="bg-white p-3 rounded z-depth-1 mt-3" not-full>

                    <ssf-container class="text-center">
                        <ssf-text class="font-weight-light text-uppercase h4-responsive">XXX</ssf-text>
                    </ssf-container>

                    <ssf-container class="text-center">
                        <ssf-text class="font-weight-light text-uppercase h4-responsive">Adhérents premiums</ssf-text>
                    </ssf-container>

                </ssf-container>

                <ssf-container class="bg-white p-3 rounded z-depth-1 mt-3" not-full>

                    <ssf-container class="text-center">
                        <ssf-text class="font-weight-light text-uppercase h4-responsive">XXX</ssf-text>
                    </ssf-container>

                    <ssf-container class="text-center">
                        <ssf-text class="font-weight-light text-uppercase h4-responsive">fournisseurs inscrits</ssf-text>
                    </ssf-container>

                </ssf-container>-->

    </ssf-container>
</template>

<script>
    import { defineComponent, onMounted } from "vue";
    import Logo                           from "@/components/commons/logo";
    import { useFirebaseUser }            from "@app/modules/firebase/user/utils";
    import CountItem                      from "@/views/home/components/includes/count-item";

    export default defineComponent({
        name: "home-index",

        components: { CountItem, Logo },

        metaInfo: {
            title: 'Accueil',
        },

        setup() {
            const { countItems, countAll } = useFirebaseUser()

            onMounted(async () => await countAll())

            return {
                countItems
            }
        }

    })
</script>

<style lang="scss" scoped>

    .ssf__section--home {
        min-height: 100vh;

        .home-logo {
            filter: invert(1);
        }

        #animatedLogo {
            width: 200px;
            max-width: 100%;
        }
    }

</style>
