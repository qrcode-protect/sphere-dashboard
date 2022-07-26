<template>
    <ssf-container name="table-request">

        <ssf-container class="table-responsive" not-full>

            <ssf-container>

                <ssf-title center h5 class="pt-3 pb-2">{{ title }}</ssf-title>

            </ssf-container>

            <table class="table">

                <table-request-head/>

                <tbody v-if="loading">
                    <tr>
                        <td class="text-center color-2" colspan="100%">
                            <ssf-icon class="fa-spin" icon="spinner-third" light size="3x"/>
                        </td>
                    </tr>
                </tbody>

                <table-request-body v-else-if="requests && requests.length"
                                    :requests="requests"
                                    @details="onShowRequestDetail"
                                    @show-quotation="onShowQuote"/>

                <ssf-title v-if="!requests || requests.length === 0" class="secondary-item p-3" h6>
                    Aucune donnée
                </ssf-title>

            </table>

            <ssf-row v-if="paginationData && requests && requests.length">
                <pagination :count="paginationData.latest" @navigate="onPaginationNavigate" class="mx-auto"/>
            </ssf-row>

        </ssf-container>


        <modal-request-details v-if="modals.requestDetails.open"
                               :modal-name="modals.requestDetails.name"
                               :open="modals.requestDetails.open"
                               :request="modals.requestDetails.props.request"
                               @close="onCloseRequestDetail"
                               @show-quotation="onShowQuote"/>


        <modal-quotation v-if="modals.quotation.open && modals.quotation.props.quotation"
                         :modal-name="modals.quotation.name"
                         :open="modals.quotation.open"
                         :quotation="modals.quotation.props.quotation"
                         @close="modals.quotation.open = false"/>


    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref, toRefs, watch } from "vue"
    import Request                                           from "@app/modules/request/request";
    import TableRequestBody                                  from "./table-request-body.vue";
    import TableRequestHead                                  from "./table-request-head.vue";
    import ModalQuote                                        from "@/views/requests/components/modal-quotation.vue";
    import ModalQuotation                                    from "@/views/requests/components/modal-quotation.vue";
    import Quote                                             from "@app/modules/quote/quote";
    import ModalRequestDetails
                                                             from "@/views/requests/components/includes/modal-request-details.vue";
    import { useRequest }                                    from "@app/modules/request/request-module";
    import { Nullable }                                      from "types/nullable";
    import Pagination                                        from "@/components/commons/partials/pagination.vue";
    import { useRoute }                                      from "vue-router";

    const usePagination = (callback: Nullable<CallableFunction>) => {

        const state = reactive({
            page    : 1,
            callback: callback as Nullable<CallableFunction>,
            loading : false
        })

        const onPaginationNavigate = async (pageNumber: number) => {
            state.page = pageNumber
            if (state.callback) {
                state.loading = true
                await state.callback(state.page)
                state.loading = false
            }
        }

        const setCallback = (callback: CallableFunction) => state.callback = callback

        return {
            ...toRefs(state),
            onPaginationNavigate,
            setCallback
        }

    }

    export default defineComponent({
        name: "table-request",

        components: { Pagination, ModalQuotation, ModalRequestDetails, ModalQuote, TableRequestHead, TableRequestBody },

        emits: [ 'details' ],

        setup() {
            ////////// init

            const modals = reactive({
                quotation     : {
                    open : false,
                    name : 'modal-quotation',
                    props: {
                        quotation: null as Nullable<Quote>
                    }
                },
                requestDetails: {
                    open : false,
                    name : 'modal-request-details',
                    props: {
                        request: null as Nullable<Request>
                    }
                }
            })

            const {
                fetchAllRequestsPaginated: fetchAllRequests,
                fetchAcceptedPaginated: fetchAccepted,
                fetchDeclinedPaginated: fetchDeclined,
                fetchPendingPaginated: fetchPending,
                fetchTerminatedPaginated: fetchTerminated,
                fetchDeniedByMemberPaginated: fetchDeniedByMember,
                paginationData,
                requests
            } = useRequest()

            const route = useRoute()
            // @ts-ignore
            const method = ref(() => null)
            const title = ref<Nullable<string>>(null)
            const methods = {
                'history.requests.accepted'        : { method: fetchAccepted, title: 'Acceptées par vos soins' },
                'history.requests.declined'        : { method: fetchDeclined, title: 'Refusées par vous' },
                'history.requests.pending'         : { method: fetchPending, title: 'En attente' },
                'history.requests.terminated'      : { method: fetchTerminated, title: 'Terminées' },
                'history.requests.denied-by-member': { method: fetchDeniedByMember, title: 'Refusées par le client' },
            }

            const { onPaginationNavigate, setCallback, loading } = usePagination(method.value)

            // @ts-ignore
            watch(() => route.name, () => method.value = (methods[route.name] ?? { method: fetchAllRequests }).method, { immediate: true })
            // @ts-ignore
            watch(() => route.name, () => title.value = (methods[route.name] ?? { title: 'Toutes les demandes' }).title, { immediate: true })

            watch(() => method.value, () => {
                method.value()
                return setCallback(method.value);
            }, { immediate: true })

            return {
                requests,
                paginationData,
                onPaginationNavigate,
                loading,

                title,

                //// modal module
                modals,
                onShowQuote: (quotation: Nullable<Quote>) => {
                    modals.quotation.props.quotation = quotation
                    modals.quotation.open = !(quotation === null)
                },

                onShowRequestDetail: (request: Request) => {
                    modals.requestDetails.props.request = request
                    modals.requestDetails.open = true
                },

                onCloseRequestDetail: async () => {
                    modals.requestDetails.props.request = null
                    modals.requestDetails.open = false
                    await fetchAllRequests()
                }
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>
