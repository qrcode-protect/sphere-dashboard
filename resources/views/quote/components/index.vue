<template>
    <ssf-container name="quotes">

        <page-title v-if="withTitle" title="Historique des devis"/>

        <ssf-container container>

            <ssf-container class="quote-nav-tabs box-item">

                <ssf-row class="px-3">

                    <ssf-col v-for="tab in tabs"
                             :class="{'border-bottom border-strong border-color-2': tab.tabIndex === currentTab}"
                             class="quote-nav-tab-item py-4 cursor-pointer text-center"
                             @click="onTabChange(tab.tabIndex)">
                        <span>{{ tab.title }}</span>
                    </ssf-col>

                </ssf-row>

            </ssf-container>

        </ssf-container>

        <ssf-container container no-padding>

            <ssf-container class="mt-3" fluid no-padding>
                <accepted-quotes v-if="isActive(1)"/>
                <declined-quotes v-if="isActive(2)"/>
                <expired-quotes v-if="isActive(3)"/>
                <pending-quotes v-if="isActive(4)"/>
            </ssf-container>

        </ssf-container>


    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, ref }     from "vue";
    import { useMeta }                  from "vue-meta";
    import PendingQuotes                from "@/views/quote/components/includes/pending-quotes.vue";
    import { isActiveTab }              from "@app/commons";
    import AcceptedQuotes               from "@/views/quote/components/includes/accepted-quotes.vue";
    import DeclinedQuotes               from "@/views/quote/components/includes/declined-quotes.vue";
    import ExpiredQuotes                from "@/views/quote/components/includes/expired-quotes.vue";
    import { clearQuotes, selectQuote } from "@app/modules/quote/utils";
    import PageTitle                    from "@/components/commons/partials/page-title.vue";

    export default defineComponent({
        name: "quote-index",

        components: { PageTitle, ExpiredQuotes, DeclinedQuotes, AcceptedQuotes, PendingQuotes },

        props: {
            withTitle: { type: Boolean, required: false, default: true }
        },

        setup() {
            ////////// init
            useMeta({ title: 'Devis', })

            ////////// data
            const currentTab = ref(4)


            ////////// computed


            ////////// methods
            const onTabChange = (tabItem: number) => {
                selectQuote(null)
                clearQuotes()
                return currentTab.value = tabItem;
            }
            const isActive = (tabIndex: number) => isActiveTab(currentTab.value, tabIndex)


            return {
                //// data
                currentTab,

                //// computed

                //// methods
                onTabChange,
                isActive,
            }
        },

        data: () => ({
            tabs: [ {
                title   : "Devis validés",
                tabIndex: 1
            }, {
                title   : "Devis refusés",
                tabIndex: 2
            }, {
                title   : "Devis expirés",
                tabIndex: 3
            }, {
                title   : "Devis en attente",
                tabIndex: 4
            } ]
        })
    })
</script>

<style lang="scss" scoped>

    .ssf__section--quotes {

        .quote-nav-tabs {
            //max-width: 500px !important;
        }

    }

</style>
