<template>
    <ssf-container name="pending-quotes">

        <quotes-page :quotes="quotes"/>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from "vue"
    import { fetchPendingQuotes, quotes } from "@app/modules/quote/utils";
    import QuoteFileItem                  from "@/views/quote/components/includes/quote-file-item.vue";
    import QuotesPage                     from "@/views/quote/components/includes/quote-page.vue";

    export default defineComponent({
        name: "pending-quotes",
        components: { QuotesPage, QuoteFileItem },
        setup() {
            ////////// init

            ////////// data

            ////////// computed

            onMounted(() => fetchPendingQuotes())


            ////////// methods

            return {
                //// computed
                quotes
            }
        }

    })
</script>

<style lang="scss" scoped>

</style>
