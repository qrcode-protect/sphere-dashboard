import {
    fetchAllActiveMembers,
    fetchAllInactiveMembers,
    fetchAllMembers,
    fetchAllPremiumMembers
} from "@app/modules/member/member-repository";

const fetchAll = ({ commit }: any) => fetchAllMembers()
    .then((members: any) => commit('SET_MEMBERS', members))

const fetchActive = ({ commit }: any, payload: { activityId?: string }) => fetchAllActiveMembers(payload?.activityId)
    .then((members: any) => commit('SET_ACTIVE_MEMBERS', members))

const fetchPremium = ({ commit }: any, payload: { activityId?: string }) => fetchAllPremiumMembers(payload?.activityId)
    .then((members: any) => commit('SET_PREMIUM_MEMBERS', members))

const fetchInactive = ({ commit }: any) => fetchAllInactiveMembers()
    .then((members: any) => commit('SET_INACTIVE_MEMBERS', members))

interface State {
    members: any | null,
    activeMembers: any | null,
    inactiveMembers: any | null,
    premiumMembers: any | null,
}

const state: State = {
    members: null,
    activeMembers: null,
    inactiveMembers: null,
    premiumMembers: null,
}

const actions = {
    fetchAll,
    fetchActive,
    fetchInactive,
    fetchPremium
}

const getters = {
    members: (state: State) => state.members,
    activeMembers: (state: State) => state.activeMembers,
    inactiveMembers: (state: State) => state.inactiveMembers,
    premiumMembers: (state: State) => state.premiumMembers,
}

const mutations = {
    SET_MEMBERS: (state: State, members: any) => state.members = members,
    SET_ACTIVE_MEMBERS: (state: State, members: any) => state.activeMembers = members,
    SET_INACTIVE_MEMBERS: (state: State, members: any) => state.inactiveMembers = members,
    SET_PREMIUM_MEMBERS: (state: State, members: any) => state.premiumMembers = members,
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
