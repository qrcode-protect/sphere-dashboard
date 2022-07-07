<template>
    <ssf-container name="list-tenders">

        <ssf-container name="list-tenders-container" class="px-4" >

            <ssf-row>

                <ssf-col size="12" md="6" v-for="tender in tenders" >

                    <h1>AJOUTER LE DOCUMENT + MODIFICATIONS</h1>

                    <list-tender-item :key="key(tender)" :tender="tender" class="my-3"/>

                </ssf-col>

            </ssf-row>


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
