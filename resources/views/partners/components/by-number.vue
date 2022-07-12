<template>
    <ssf-container name="partners">

        <ssf-container fluid>

            <page-title :title="pageTitle"/>

            <active-partners by-number/>
        </ssf-container>

    </ssf-container>
</template>

<script>
    import { computed, defineComponent } from "vue";
    import { useMeta }                   from "vue-meta";
    import ActivePartners                 from "@/views/partners/components/includes/active-partners";
    import PageTitle                     from "@/components/commons/partials/page-title";
    import { useRoute }                  from "vue-router";

    export default defineComponent({
        name: "partners-index",

        components: { PageTitle, ActivePartners },

        setup() {
            ////////// init
            useMeta({ title: 'Partenaires' })


            const partnerNumber = computed(() => (useRoute()).params.partnerNumber)

            return {
                pageTitle: computed(() => `Partenaire : n°${partnerNumber.value}`),
            }
        },


    })
</script>

<style lang="scss" scoped>

    .ssf__section--partners {

    }

</style>
