<template>

    <ssf-container name="partner-create">

        <ssf-row class="pt-5">

            <ssf-col size="12" class="text-center">

                <h3>Ajouter un nouveau fournisseur</h3>

            </ssf-col>

        </ssf-row>

        <form-create-partner/>

    </ssf-container>

</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import FormCreatePartner   from "@/views/partners/components/includes/form-create/form-create-partner.vue";
    import { useMeta }         from "vue-meta";

    export default defineComponent({
        name      : "create",
        components: { FormCreatePartner },
        setup() {
            ////////// init
            useMeta({ title: 'Fournisseurs - Ajouter', })

            ////////// data

            ////////// computed

            ////////// methods
        }

    })
</script>

<style lang="scss" scoped>

</style>
