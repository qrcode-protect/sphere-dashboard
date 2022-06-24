// import { fetchUserById, fetchUserWhereIdIn } from "@app/modules/firebase/user/user-repository";
//
// const fetchById = ({ commit }: any, payload: any) => fetchUserById(payload.id)
//     .then((users: any) => commit('SET_USERS', users))
//
// const fetchWhereIdIn = ({ commit }: any, payload: any) => fetchUserWhereIdIn(payload.id)
//     .then((users: any) => commit('SET_USERS', users))
//
// interface State {
//     users: any | null,
//     user: any | null,
// }
//
// const state: State = {
//     users: null,
//     user: null
// }
//
// const actions = {
//     fetchById,
//     fetchWhereIdIn
// }
//
// const getters = {
//     users: (state: State) => state.users,
//     user: (state: State) => state.user,
// }
//
// const mutations = {
//     SET_USERS: (state: State, users: any) => state.users = users,
//     SET_USER: (state: State, user: any) => state.user = user,
// }
//
// export default {
//     namespaced: true,
//     state,
//     actions,
//     getters,
//     mutations
// }
