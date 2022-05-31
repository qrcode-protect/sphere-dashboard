import { fetchAllArticles } from "@app/modules/_article/article/article-repository";

const fetchAll = ({ commit }: any) => fetchAllArticles()
    .then((articles: any) => commit('SET_ARTICLES', articles))

interface State {
    articles: any | null,
    article: any |null
}

const state: State = {
    articles: null,
    article: null,
}

const actions = {
    fetchAll,
}

const getters = {
    articles: (state: State) => state.articles,
    article: (state: State) => state.article,
}

const mutations = {
    SET_ARTICLES: (state: State, articles: any) => state.articles = articles,
    SET_ARTICLE: (state: State, article: any) => state.article = article
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
