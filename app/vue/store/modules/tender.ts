import { fetchAllTenders } from "@app/modules/tender/tender-repository";

const fetchAll = ({ commit }: any) => fetchAllTenders()
    .then((tenders: any) => commit('SET_TENDERS', tenders))

interface State {
    tenders: any | null
}

const state: State = {
    tenders: null
}

const actions = {
    fetchAll,
}

const getters = {
    tenders: (state: State) => state.tenders
}

const mutations = {
    SET_TENDERS: (state: State, tenders: any) => state.tenders = tenders
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
