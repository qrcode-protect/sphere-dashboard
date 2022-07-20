import {
    fetchAcceptedQuotes,
    fetchDeclinedQuotes, fetchExpiredQuotes,
    fetchPendingQuotes, searchQuotation,
} from "@app/modules/quote/quote-repository";

const fetchAccepted = ({ commit }: any) => fetchAcceptedQuotes()
    .then((quotes: any) => commit('SET_QUOTES', quotes))

const fetchDeclined = ({ commit }: any) => fetchDeclinedQuotes()
    .then((quotes: any) => commit('SET_QUOTES', quotes))

const fetchPending = ({ commit }: any) => fetchPendingQuotes()
    .then((quotes: any) => commit('SET_QUOTES', quotes))

const fetchExpired = ({ commit }: any) => fetchExpiredQuotes()
    .then((quotes: any) => commit('SET_QUOTES', quotes))

interface State {
    quote: any | null,
    quotes: any | null,
}

const state: State = {
    quote: null,
    quotes: null,
}

const actions = {
    fetchAccepted,
    fetchDeclined,
    fetchPending,
    fetchExpired,

    search: ({ commit }: any, payload: {query: string}) => searchQuotation(payload.query)
        .then((quotes: any) => commit('SET_QUOTES', quotes))
}

const getters = {
    quote: (state: State) => state.quote,
    quotes: (state: State) => state.quotes,
}

const mutations = {
    SET_QUOTE: (state: State, quote: any) => state.quote = quote,
    SET_QUOTES: (state: State, quotes: any) => state.quotes = quotes,
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
