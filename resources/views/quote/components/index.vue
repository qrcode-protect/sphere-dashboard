<template>
    <ssf-container name="quotes">

        <page-title v-if="withTitle" title="Historique des devis"/>

        <ssf-container container>

            <ssf-row class="mb-4">

                <ssf-col>

                    <ssf-container class="box-item py-3" no-padding>

                        <qrcp-input :errors="errors"
                                    :value="searchInput"
                                    form-group-class="mb-0"
                                    icon="magnifying-glass"
                                    input-class="members-search"
                                    label="Rechercher avec : E-mail ou siret du fournisseur/membre"
                                    name="searchPremiumMember"
                                    row
                                    @input="onSearchInput"
                                    @update:value="onSearchInputUpdateValue"/>

                    </ssf-container>

                </ssf-col>

            </ssf-row>

            <ssf-row>

                <ssf-col>

                    <ssf-container v-if="isSearchInputEmpty" class="quote-nav-tabs box-item">

                        <ssf-row class="px-3">

                            <ssf-col v-for="tab in tabs"
                                     :class="{'border-bottom border-strong border-color-2': tab.tabIndex === currentTab}"
                                     class="quote-nav-tab-item py-4 cursor-pointer text-center"
                                     @click="onTabChange(tab.tabIndex)">
                                <span>{{ tab.title }}</span>
                            </ssf-col>

                        </ssf-row>

                    </ssf-container>

                </ssf-col>

            </ssf-row>

            <ssf-container container no-padding>

                <ssf-container class="mt-3" fluid no-padding>
                    <accepted-quotes v-if="isActive(1)"/>
                    <declined-quotes v-if="isActive(2)"/>
                    <expired-quotes v-if="isActive(3)"/>
                    <pending-quotes v-if="isActive(4)"/>
                </ssf-container>

            </ssf-container>

        </ssf-container>


    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, ref }               from "vue";
    import { useMeta }                            from "vue-meta";
    import PendingQuotes                          from "@/views/quote/components/includes/pending-quotes.vue";
    import { isActiveTab }                        from "@app/commons";
    import AcceptedQuotes                         from "@/views/quote/components/includes/accepted-quotes.vue";
    import DeclinedQuotes                         from "@/views/quote/components/includes/declined-quotes.vue";
    import ExpiredQuotes                          from "@/views/quote/components/includes/expired-quotes.vue";
    import { clearQuotes, selectQuote, useQuote } from "@app/modules/quote/utils";
    import PageTitle                              from "@/components/commons/partials/page-title.vue";
    import QrcpInput                              from "@/components/commons/qrcp-input.vue";
    import { useSearch }                          from "@app/modules/search-module";
    import { useForm }                            from "@app/commons/form";

    export default defineComponent({
        name: "quote-index",

        components: { QrcpInput, PageTitle, ExpiredQuotes, DeclinedQuotes, AcceptedQuotes, PendingQuotes },

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

            const { searchQuote, fetchPendingQuotes } = useQuote()

            const {
                searchInput,
                onSearchInputUpdateValue,
                onSearchInput,
                isSearchInputEmpty
            } = useSearch(searchQuote, async () => {
                currentTab.value = 4
                await fetchPendingQuotes()
            })
            const { errors } = useForm()


            return {
                //// data
                currentTab,

                //// computed

                //// methods
                onTabChange,
                isActive,

                //// search
                onSearchInputUpdateValue,
                onSearchInput,
                searchInput,
                isSearchInputEmpty,

                errors
                // Member
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
