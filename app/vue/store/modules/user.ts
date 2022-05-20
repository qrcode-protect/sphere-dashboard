import { fetchAllDashboard, fetchAllUsers, fetchCurrentUser } from "@app/modules/user/user-repository";

const fetchCurrent = ({ commit }: any) => {
    return fetchCurrentUser()
        .then((data: any) => {
            return commit('SET_USER', data.user);
        });
}

const fetchAll = ({ commit }: any) => fetchAllUsers()
    .then((users: any) => commit('SET_USERS', users))

const fetchDashboard = ({ commit }: any) => fetchAllDashboard()
    .then((users: any) => commit('SET_USERS', users))

interface State {
    users: any | null,
    user: any | null,
}

const state: State = {
    users: null,
    user: null
}

const actions = {
    fetchCurrent,
    fetchAll,
    fetchDashboard
}

const getters = {
    users: (state: State) => state.users,
    current: (state: State) => state.user,
}

const mutations = {
    SET_USERS: (state: State, users: any) => state.users = users,
    SET_USER: (state: State, user: any) => state.user = user,
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
