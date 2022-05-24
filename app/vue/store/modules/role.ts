import { fetchAllRoles } from "@app/modules/role/role-repository";

const fetchAll = ({ commit }: any) => fetchAllRoles()
    .then((roles: any) => commit('SET_ROLES', roles))

interface State {
    roles: any | null
}

const state: State = {
    roles: null
}

const actions = {
    fetchAll,
}

const getters = {
    roles: (state: State) => state.roles
}

const mutations = {
    SET_ROLES: (state: State, roles: any) => state.roles = roles
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
