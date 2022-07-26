<template>
    <ssf-container class="pt-4 bg-white rounded-left" name="request">

        <ssf-container container>

            <page-title title="Historique des demandes" black/>

            <ssf-container class="box-item rounded rounded-strong">

                <table-request/>

            </ssf-container>

        </ssf-container>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, onMounted, reactive } from "vue";
    import { useMeta }                              from "vue-meta";
    import { useRequest }                           from "@app/modules/request/request-module";
    import PageTitle                                from "@/components/commons/partials/page-title.vue";
    import TableRequest
                                                    from "@/views/requests/components/includes/table-request/table-request.vue";
    import ModalRequestDetails
                                                    from "@/views/requests/components/includes/modal-request-details.vue";

    export default defineComponent({
        name: "request-index",

        components: { ModalRequestDetails, TableRequest, PageTitle },

        setup() {
            ////////// init
            useMeta({ title: 'Historique des demandes', })


            // const { tableKeys, requests, fetchAllRequestsPaginated: fetchAllRequests } = useRequest()
            //
            // onMounted(async () => await fetchAllRequests())
            //
            // const modals = reactive({
            //     contactUs: {
            //         open : false,
            //         name : 'modal-contact-us',
            //         props: {}
            //     },
            // })
            //
            // return {
            //     //// request module
            //     requests,
            //     tableKeys,
            //
            //     modals,
            // }
        },
    })
</script>

<style lang="scss" scoped>

    .contact-us {
        position: fixed;
        right: 50px;
        bottom: 50px;
    }

</style>
