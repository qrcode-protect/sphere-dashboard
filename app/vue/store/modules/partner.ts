import {
    fetchActiveMembersByNumber,
    fetchAllActivePartners,
    fetchAllInactivePartners,
    fetchAllPartners
} from "@app/modules/partner/partner-repository";

const fetchAll = ({ commit }: any) => fetchAllPartners()
    .then((partners: any) => commit('SET_PARTNERS', partners))

const fetchActive = ({ commit }: any, payload: { activityId?: string }) => fetchAllActivePartners(payload?.activityId)
    .then((partners: any) => commit('SET_ACTIVE_PARTNERS', partners))

const fetchInactive = ({ commit }: any) => fetchAllInactivePartners()
    .then((partners: any) => commit('SET_INACTIVE_PARTNERS', partners))

interface State {
    partners: any | null,
    activePartners: any | null,
    inactivePartners: any | null,
    counts: {
        inactive: number
    }
}

const state: State = {
    partners        : null,
    activePartners  : null,
    inactivePartners: null,
    counts          : {
        inactive: 0
    }
}

const actions = {
    fetchAll,
    fetchActive,
    fetchInactive,
    fetchActiveByNumber: ({ commit }: any, payload: { partnerNumber: string }) => fetchActiveMembersByNumber(payload.partnerNumber)
        .then((partners: any) => commit('SET_ACTIVE_PARTNERS', partners))
}

const getters = {
    partners        : (state: State) => state.partners,
    activePartners  : (state: State) => state.activePartners,
    inactivePartners: (state: State) => state.inactivePartners,
    counts         : (state: State) => state.counts,
}

const mutations = {
    SET_PARTNERS         : (state: State, partners: any) => state.partners = partners,
    SET_ACTIVE_PARTNERS  : (state: State, partners: any) => state.activePartners = partners,
    SET_INACTIVE_PARTNERS: (state: State, partners: any) => state.inactivePartners = partners,

    SET_COUNT_PARTNER_INACTIVE: (state: State, count: any) => state.counts.inactive = count,
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
