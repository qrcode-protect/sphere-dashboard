import { fetchAllNetworks } from "@app/modules/_network/network/network-repository";

const fetchAll = ({ commit }: any) => fetchAllNetworks()
    .then((networks: any) => commit('SET_NETWORKS', networks))

interface State {
    networks: any | null
}

const state: State = {
    networks: null
}

const actions = {
    fetchAll,
}

const getters = {
    networks: (state: State) => state.networks
}

const mutations = {
    SET_NETWORKS: (state: State, networks: any) => state.networks = networks
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
