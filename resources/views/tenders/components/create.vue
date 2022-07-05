<template>

    <ssf-container name="tender-create">

        <ssf-row class="pt-5">

            <ssf-col class="text-center" size="12">

                <page-title title="Ajouter une affaire"/>

            </ssf-col>

        </ssf-row>

        <form-tender/>

    </ssf-container>

</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import { useMeta }         from "vue-meta";

    import FormTender from "@/views/tenders/components/includes/form-tender/form-tender.vue";
    import PageTitle         from "@/components/commons/partials/page-title.vue";

    export default defineComponent({
        name      : "create",
        components: { PageTitle, FormTender },
        setup() {
            ////////// init
            useMeta({ title: 'Affaires - Ajouter', })

            ////////// data

            ////////// computed

            ////////// methods
        }

    })
</script>

<style lang="scss" scoped>

</style>
