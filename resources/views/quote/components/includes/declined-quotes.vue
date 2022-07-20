<template>
    <ssf-container name="declined-quotes">

        <quotes-page :quotes="quotes"/>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from "vue"
    import { fetchDeclinedQuotes, quotes } from "@app/modules/quote/utils";
    import QuoteFileItem                  from "@/views/quote/components/includes/quote-file-item.vue";
    import QuotesPage                     from "@/views/quote/components/includes/quote-page.vue";

    export default defineComponent({
        name: "declined-quotes",
        components: { QuotesPage, QuoteFileItem },
        setup() {
            ////////// init

            ////////// data

            ////////// computed

            onMounted(() => fetchDeclinedQuotes())


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
