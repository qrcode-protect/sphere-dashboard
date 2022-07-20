<template>
    <ssf-container name="expired-quotes">

        <quotes-page :quotes="quotes"/>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from "vue"
    import { fetchExpiredQuotes, quotes } from "@app/modules/quote/utils";
    import QuoteFileItem                  from "@/views/quote/components/includes/quote-file-item.vue";
    import QuotesPage                     from "@/views/quote/components/includes/quote-page.vue";

    export default defineComponent({
        name      : "expired-quotes",
        components: { QuotesPage, QuoteFileItem },
        setup() {
            ////////// init

            ////////// data

            ////////// computed

            onMounted(() => fetchExpiredQuotes())


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
