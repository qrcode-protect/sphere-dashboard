import { fetchAllConversation, fetchConversationById } from "@app/modules/conversation/conversation-repository";

const fetchAll = ({ commit }: any) => fetchAllConversation()
    .then((conversations: any) => commit('SET_CONVERSATIONS', conversations))

interface State {
    conversations: any | null,
    conversation: any | null,
}

const state: State = {
    conversations: null,
    conversation: null,
}

const actions = {
    fetchAll,
    fetchById: ({ commit }: any, payload: {id: string}) => fetchConversationById(payload.id)
        .then((conversation: any) => commit('SET_CONVERSATION', conversation))
}

const getters = {
    conversations: (state: State) => state.conversations,
    conversation: (state: State) => state.conversation,
}

const mutations = {
    SET_CONVERSATIONS: (state: State, conversations: any) => state.conversations = conversations,
    SET_CONVERSATION: (state: State, conversation: any) => state.conversation = conversation,
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
