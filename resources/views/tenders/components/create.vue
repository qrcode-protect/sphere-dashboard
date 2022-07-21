<template>

    <ssf-container name="tender-create">

        <ssf-row class="pt-5">

            <ssf-col class="text-center" size="12">

                <page-title title="Ajouter une affaire"/>

            </ssf-col>

        </ssf-row>

        <form-tender :is-public="isPublicTender"/>

    </ssf-container>

</template>

<script lang="ts">
    import { computed, defineComponent, onMounted, ref, watch } from "vue"
    import { useMeta }                                          from "vue-meta";

    import FormTender   from "@/views/tenders/components/includes/form-tender/form-tender.vue";
    import PageTitle    from "@/components/commons/partials/page-title.vue";
    import { useRoute } from "vue-router";

    export default defineComponent({
        name      : "create",
        components: { PageTitle, FormTender },
        setup() {
            ////////// init
            useMeta({ title: 'Affaires - Ajouter', })
            const route = useRoute()
            const isPublicTender = ref<Boolean>(false)

            watch(() => route.name, () => isPublicTender.value = route.name === 'tenders.create.public', {immediate: true})

            return {
                isPublicTender//: computed(() => route.name === 'tenders.create.public')
            }
        }

    })
</script>

<style lang="scss" scoped>

</style>
