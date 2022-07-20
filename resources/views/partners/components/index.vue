<template>
    <ssf-container name="partners">

        <page-title title="Fournisseurs"/>

        <ssf-container class="partner-nav-tabs" not-full>

            <ssf-row class="px-3">

                <ssf-col v-for="tab in tabs"
                         :class="{'border-bottom border-strong border-color-1': tab.tabIndex === currentTab}"
                         class="member-nav-tab-item py-3 cursor-pointer"
                         @click="onTabChange(tab.tabIndex)">

                    <ssf-row>

                        <ssf-col no-padding>

                            <span class="d-inline-block">{{ tab.title }}</span>

                        </ssf-col>

                        <ssf-col v-if="tab.count && tab.count !== 0" max-width="20" no-padding>

                            <ssf-shape center
                                       circle
                                       class="small bg-danger text-white d-inline-block"
                                       size="20">
                                {{ tab.count }}
                            </ssf-shape>

                        </ssf-col>

                    </ssf-row>

                </ssf-col>

            </ssf-row>

        </ssf-container>

        <ssf-container fluid>
            <active-partners v-if="currentTab === 1"/>
            <inactive-partners v-if="currentTab === 2"/>
        </ssf-container>


        <router-link :to="{name: 'partners.create'}" class="btn-create-partner">
            <ssf-shape circle class="bg-color-2 full-flex text-white z-depth-1" size="75">
                <ssf-icon icon="layer-plus" light size="2x"/>
            </ssf-shape>
        </router-link>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent }    from "vue";
    import { useMeta }            from "vue-meta";
    import ActivePartners         from "@/views/partners/components/includes/active-partners.vue";
    import InactivePartners       from "@/views/partners/components/includes/inactive-partners.vue";
    import PageTitle              from "@/components/commons/partials/page-title.vue";
    import { useFirebasePartner } from "@app/modules/firebase/partner/firebase-partner-module";

    export default defineComponent({
        name: "partners-index",

        components: { PageTitle, InactivePartners, ActivePartners },

        setup() {
            ////////// init
            useMeta({ title: 'Fournisseurs', })


            ////////// data


            ////////// computed


            ////////// methods

            const { inactivePartnersCount } = useFirebasePartner()


            return {
                //// data
                tabs: [ {
                    title   : "Fournisseurs actifs",
                    tabIndex: 1,
                    count   : null
                }, {
                    title   : "En attente de validation",
                    tabIndex: 2,
                    count   : inactivePartnersCount
                } ]

                //// computed

                //// methods
            }
        },

        data: () => ({
            currentTab: 1,
        }),

        methods: {
            onTabChange(tabItem: number) {
                this.currentTab = tabItem
            }
        }
    })
</script>

<style lang="scss" scoped>
    .ssf__section--partners {

        .partner-nav-tabs {
            width: 480px;
            max-width: 100%;
        }

        .btn-create-partner {
            position: fixed;
            right: 20px;
            bottom: 20px;
        }

    }

</style>
