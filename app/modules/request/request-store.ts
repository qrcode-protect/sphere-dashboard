import {
    fetchAcceptedPaginated,
    fetchAcceptedRequests,
    fetchAllRequests,
    fetchAllRequestsPaginated, fetchDeclinedPaginated,
    fetchDeclinedRequests, fetchDeniedByMemberPaginated,
    fetchDeniedByMemberRequests, fetchPendingPaginated,
    fetchPendingRequests, fetchTerminatedPaginated,
    fetchTerminatedRequests,
    requestRepository,
} from "@app/modules/request/request-repository";
import { Nullable } from "../../../types/nullable";

const fetchAll = ({ commit }: any) => fetchAllRequests()
    .then((requests: any) => commit('SET_REQUESTS', requests.data))

const fetchPending = ({ commit }: any) => fetchPendingRequests()
    .then((requests: any) => commit('SET_REQUESTS', requests))

const fetchAccepted = ({ commit }: any) => fetchAcceptedRequests()
    .then((requests: any) => commit('SET_REQUESTS', requests))

const fetchDeclined = ({ commit }: any) => fetchDeclinedRequests()
    .then((requests: any) => commit('SET_REQUESTS', requests))


interface State {
    requests: any | null,
    request: any | null,
    paginationData: Nullable<any>
}

const state: State = {
    requests      : null,
    request       : null,
    paginationData: null
}

const setPaginated = (data: any, { commit }: any) => {
    commit('SET_PAGINATION', data)
    return commit('SET_REQUESTS', requestRepository.setAttributes(data.data));
}

const actions = {
    fetchAll,
    fetchAccepted,
    fetchPending,
    fetchDeclined,

    fetchAllPaginated: ({ commit }: any, payload: { page?: number }) => fetchAllRequestsPaginated(payload.page)
        .then((requests: any) => setPaginated(requests, { commit })),
    fetchPendingPaginated: ({ commit }: any, payload: { page?: number }) => fetchPendingPaginated(payload.page)
        .then((requests: any) => setPaginated(requests, { commit })),
    fetchDeclinedPaginated: ({ commit }: any, payload: { page?: number }) => fetchDeclinedPaginated(payload.page)
        .then((requests: any) => setPaginated(requests, { commit })),
    fetchAcceptedPaginated: ({ commit }: any, payload: { page?: number }) => fetchAcceptedPaginated(payload.page)
        .then((requests: any) => setPaginated(requests, { commit })),
    fetchTerminatedPaginated: ({ commit }: any, payload: { page?: number }) => fetchTerminatedPaginated(payload.page)
        .then((requests: any) => setPaginated(requests, { commit })),
    fetchDeniedByMemberPaginated: ({ commit }: any, payload: { page?: number }) => fetchDeniedByMemberPaginated(payload.page)
        .then((requests: any) => setPaginated(requests, { commit })),

    fetchDeniedByMember: ({ commit }: any) => fetchDeniedByMemberRequests()
        .then((requests: any) => commit('SET_REQUESTS', requests)),
    fetchTerminated    : ({ commit }: any) => fetchTerminatedRequests()
        .then((requests: any) => commit('SET_REQUESTS', requests)),
}

const getters = {
    requests      : (state: State) => state.requests,
    request       : (state: State) => state.request,
    paginationData: (state: State) => state.paginationData,
}

const mutations = {
    SET_REQUESTS  : (state: State, requests: any) => state.requests = requests,
    SET_PAGINATION: (state: State, pagination: any) => state.paginationData = pagination,
    SET_REQUEST   : (state: State, request: any) => state.request = request
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
