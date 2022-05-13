'use strict';

/*
 * vue3-project-default
 *
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:38
 * File app/vue/store/index
 */


import { createStore } from 'vuex'



const state = {
    loading: false, // Le formulaire est envoyé
    preload: true, // La page est en train de charger

    variables: {},
};

const mutations = {
    ...{
        setLoading(state: any, loading: any) {
            state.loading = loading
        },

        setPreload(state: any, preload: any) {
            state.preload = preload
        }
    },
};

const actions = {

    loading(context: any, loading: any) {
        context.commit('setLoading', loading)
    },

    preloading(context: any, preload: any) {
        context.commit('setPreload', preload)
    },
};

const getters = {
    APP_NAME       : () => process.env.APP_NAME,
    APP_MAINTENANCE: () => process.env.APP_MAINTENANCE,
    APP_ENV        : () => process.env.APP_ENV || 'dev', // Environnement de l'application,
    API_SERVER     : () => process.env.API_SERVER || 'http://localhost:4001', // Adresse du serveur de l'API
    TOKEN_NAME     : () => process.env.TOKEN_NAME || 'sphere-dashboard_token', // Nom du cookie pour stocker le token,

    loading  : (state: any) => state.loading,
    preload  : (state: any) => state.preload,
    variables: (state: any) => state.variables,

    storage: (state: any) => {
        return { prefix: `storage:${process.env.APP_NAME}:` }
    },
}

const store = createStore({
    state,
    mutations,
    actions,
    getters
})

const storeWithModules = (store: any) => {
    const requireContext = require.context('./modules', false, /.*\.ts$/)

    let modules: any = {}

    requireContext.keys()
        .filter((file) => file.replace(/(^.\/)|(\.ts$)/g, '') !== 'example')
        .forEach(file => {
                const key = file.replace(/(^.\/)|(\.ts$)/g, '')

            store.registerModule(key, requireContext(file).default)

                // modules[key] = requireContext(file).default
                // modules[key].namespaced = true
            }
        )
    return store
}

export default storeWithModules(store)
