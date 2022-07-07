<template>

    <ssf-container name="tender-create">

        <ssf-row class="pt-5">

            <ssf-col class="text-center" size="12">

                <page-title title="Modifier une affaire"/>

            </ssf-col>

        </ssf-row>

        <form-tender is-edition :tender-id="tenderId"/>

    </ssf-container>

</template>

<script lang="ts">
    import { defineComponent, ref, watch } from "vue"
    import { useMeta }                     from "vue-meta";

    import FormTender   from "@/views/tenders/components/includes/form-tender/form-tender.vue";
    import PageTitle    from "@/components/commons/partials/page-title.vue";
    import { useRoute } from "vue-router";
    import { Nullable } from "../../../../types/nullable";

    export default defineComponent({
        name      : "create",
        components: { PageTitle, FormTender },
        setup() {
            ////////// init
            useMeta({ title: 'Affaires - Modifier', })

            const route = useRoute()
            const tenderId = ref<Nullable<string>>(route.params.id as string)

            watch(() => route.params, () => tenderId.value = route.params.id as string, { immediate: true })

            return {
                tenderId
            }
        }

    })
</script>

<style lang="scss" scoped>

</style>
