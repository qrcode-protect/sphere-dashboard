<template>
    <ssf-container class="box-ite" name="quotes-page" no-padding>

        <ssf-row v-if="quotes && quotes.length">

            <ssf-col no-padding>

                <ssf-row>

                    <ssf-col v-for="quote in quotes" class="py-3" max-width="305">

                        <quote-file-item v-if="quote" :quote="quote" @select-quote="(_quote) => selectQuote(_quote ?? quote)"/>

                    </ssf-col>

                </ssf-row>

            </ssf-col>

            <ssf-col max-width="300" class="py-3 quote-item-box" v-if="quote">

                <ssf-container full-flex  not-full class="position-sticky h-auto" style="right: 20px; top: 0; bottom: 0">

                    <quote-file-detail :quote="quote" @close="selectQuote(null)"/>

                </ssf-container>

            </ssf-col>

        </ssf-row>

        <ssf-container v-else class="py-3" full-flex>
            <ssf-title class="secondary-item" h5>
                Aucune donnée...
            </ssf-title>
        </ssf-container>

    </ssf-container>
</template>

<script lang="ts">
    import { computed, defineComponent, PropType, watch } from "vue"
    import QuoteFileItem                                  from "@/views/quote/components/includes/quote-file-item.vue";
    import Quote                                          from "@app/modules/quote/quote";
    import QuoteFileDetail                                from "@/views/quote/components/includes/quote-file-detail.vue";
    import { quote, selectQuote }                         from "@app/modules/quote/utils";
    import { defined }                                    from "@sofiakb/vue3-framework/utils";
    import { Nullable }                                   from "../../../../../types/nullable";

    export default defineComponent({
        name: "quotes-page",

        components: { QuoteFileDetail, QuoteFileItem },

        props: {
            quotes: { type: [ Array, null ] as PropType<Nullable<Quote[]>>, required: true }
        },

        setup(props) {
            // watch(() => props.quotes, () => props.quotes ? selectQuote(props.quotes[0]) : null)

            const hasQuote = computed(() => quote.value && defined(quote.value))

            return {
                //// quote
                selectQuote,
                quote,
                hasQuote,
            }

        }
    })
</script>

<style lang="scss" scoped>

    @media screen and (max-width: 767px) {
        .quote-item-box {
            position: absolute !important;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            flex: 0 0 100% !important;
            max-width: 100% !important;
            width: 100% !important;
            background-color: rgba(0, 0, 0, .6);
        }
    }

</style>
