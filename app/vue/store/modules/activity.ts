import { fetchAllActivity } from "@app/modules/activity/activity-repository";

const fetchAll = ({ commit }: any) => fetchAllActivity()
    .then((activities: any) => commit('SET_ACTIVITIES', activities))

interface State {
    activities: any | null
}

const state: State = {
    activities: null
}

const actions = {
    fetchAll,
}

const getters = {
    activities: (state: State) => state.activities
}

const mutations = {
    SET_ACTIVITIES: (state: State, activities: any) => state.activities = activities
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
