import {
    editTender,
    fetchActiveTenders,
    fetchAllTenders, fetchById,
    fetchInactiveTenders,
    storeTender
} from "@app/modules/tender/tender-repository";
import Tender from "@app/modules/tender/tender";

const fetchAll = ({ commit }: any) => fetchAllTenders()
    .then((tenders: any) => commit('SET_TENDERS', tenders))

const fetchActive = ({ commit }: any) => fetchActiveTenders()
    .then((tenders: any) => commit('SET_TENDERS', tenders))

const fetchInactive = ({ commit }: any) => fetchInactiveTenders()
    .then((tenders: any) => commit('SET_TENDERS', tenders))

interface State {
    tenders: any | null
}

const state: State = {
    tenders: null
}

const actions = {
    fetchAll,
    fetchActive,
    fetchInactive,

    store: (_: any, payload: { tender: Tender }) => storeTender(payload.tender),
    edit: (_: any, payload: { tender: any }) => editTender(payload.tender),
    fetchById: (_: any, payload: { tenderId: string }) => fetchById(payload.tenderId),
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
