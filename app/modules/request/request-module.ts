"use strict";

/*
 * partners
 *
 * (c) Sofiane Akbly <contact.sofiakb@gmail.com>
 *
 * Created by WebStorm on 03/06/2022 at 15:52
 * File src/modules/request/utils
 */

import { computed, reactive, toRefs } from "vue";
import store                          from "@app/vue/store";
import Request                        from "@app/modules/request/request";
import { useStore }                   from "vuex";
import { Moment }                     from "moment";
import { Nullable }                   from "../../../types/nullable";

export const requests = computed({
    get: (): Request[] | null => store.getters['request/requests'],
    set: value => store.commit('request/SET_REQUESTS', value),
})

export const paginationData = computed((): Request[] | null => store.getters['request/paginationData'])

interface RequestState {
    request: Nullable<Request>,
    tableKeys: any
}

export const useRequest = (request?: Request) => {

    const store = useStore()

    const state = reactive<RequestState>({
        request  : Request.create(),
        tableKeys: [
            /*{
                icon : 'hashtag',
                prop : 'id',
                label: "#",
            },*/
            {
                icon : 'user-cowboy',
                prop : 'member.companyName',
                label: "Société",
                casts: () => request?.member.companyName?.capitalize() ?? 'N/D'
            },
            {
                icon : 'user-cowboy',
                prop : 'partner.companyName',
                label: "Fournisseur",
                casts: () => request?.partner.companyName?.capitalize() ?? 'N/D'
            },
            {
                icon : 'user-cowboy',
                prop : 'created',
                label: "Date demande",
                casts: () => `${request?.created.format('DD/MM/YYYY')} <span class="secondary-item-small">à ${request?.created.format('HH:mm')}</span>`
            },
            {
                icon : 'user-cowboy',
                prop : 'created',
                label: "Date réponse",
                casts: () => request?.quote === null ? "<i class='fal fa-times text-danger'/>" : `${request?.updated.format('DD/MM/YYYY')} <span class="secondary-item-small">à ${request?.updated.format('HH:mm')}</span>`
            },
            /*{
                icon : 'user-cowboy',
                prop : 'service.label',
                label: "Service",
                casts: () => request?.service.label.capitalize() ?? 'N/D'
            },*/
        ]
    })

    const storeRequest = () => store.dispatch('request/store', { request: Request.create(state.request) })


    return {
        ...toRefs(state),
        storeRequest,

        declineRequest: () => request ? store.dispatch('request/decline', { request })/*.then(() => requests.value = filter(requests.value, item => item.id !== request.id))*/ : null,
        acceptRequest : (quotation: any, data: { amount: number, expiresAt: Nullable<Moment> }) => request && quotation ? store.dispatch('request/accept', {
            data: {
                id       : request.id,
                quotation: quotation.data,
                memberId : request.memberId,
                amount   : data.amount,
                expiresAt: data.expiresAt
            }
        }) : null,

        fetchAllRequests   : () => store.dispatch('request/fetchAll'),
        fetchPending       : () => store.dispatch('request/fetchPending'),
        fetchAccepted      : () => store.dispatch('request/fetchAccepted'),
        fetchDeclined      : () => store.dispatch('request/fetchDeclined'),
        fetchTerminated    : () => store.dispatch('request/fetchTerminated'),
        fetchDeniedByMember: () => store.dispatch('request/fetchDeniedByMember'),

        fetchAllRequestsPaginated: (page?: number) => store.dispatch('request/fetchAllPaginated', { page }),
        fetchPendingPaginated    : (page?: number) => store.dispatch('request/fetchPendingPaginated', { page }),
        fetchAcceptedPaginated   : (page?: number) => store.dispatch('request/fetchAcceptedPaginated', { page }),
        fetchDeclinedPaginated   : (page?: number) => store.dispatch('request/fetchDeclinedPaginated', { page }),
        fetchTerminatedPaginated   : (page?: number) => store.dispatch('request/fetchTerminatedPaginated', { page }),
        fetchDeniedByMemberPaginated   : (page?: number) => store.dispatch('request/fetchDeniedByMemberPaginated', { page }),

        requests: computed(() => store.getters['request/requests']),

        paginationData,

        setRequest     : (request: Nullable<Request>) => state.request = request,
        quotationStatus: computed(() => request?.quote?.isPending() ? 'En attente' : request?.quote?.isAccepted() ? 'Accepté' : 'Refusé')
    }
}
