<template>
    <ssf-container name="list-tenders">

        <ssf-container name="list-tenders-container" class="px-4" container>

            <list-tender-item v-for="tender in tenders" :key="key(tender)" :tender="tender" class="my-3"/>

        </ssf-container>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, PropType } from "vue"
    import Tender                        from "@app/modules/tender/tender";
    import ListTenderItem                from "@/views/tenders/components/includes/list-tenders/list-tender-item.vue";
    import { key }                       from "@app/vue/utils";

    export default defineComponent({
        name      : "list-tenders",
        components: { ListTenderItem },
        props     : {
            tenders: { type: Array as PropType<Tender[]>, required: true }
        },

        setup() {
            ////////// init

            return {
                key: (tender: Tender) => key({ id: tender.id, name: tender.memberId })
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>
