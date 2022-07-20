"use strict";

/*
 * partners
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 03/06/2022 at 15:52
 * File src/modules/quote/utils
 */

import { computed } from "vue";
import store        from "@app/vue/store";
import Quote        from "@app/modules/quote/quote";
import { useStore } from "vuex";

export const fetchPendingQuotes = () => store.dispatch('quote/fetchPending')
export const fetchExpiredQuotes = () => store.dispatch('quote/fetchExpired')
export const fetchDeclinedQuotes = () => store.dispatch('quote/fetchDeclined')
export const fetchAcceptedQuotes = () => store.dispatch('quote/fetchAccepted')

export const quotes = computed({
    get: (): Quote[] | null => store.getters['quote/quotes'],
    set: value => store.commit('quote/SET_QUOTES', value),
})

export const quote = computed({
    get: (): Quote | null => store.getters['quote/quote'],
    set: value => store.commit('quote/SET_QUOTE', value),
})

export const selectQuote = (_quote: Quote | null) => quote.value = _quote
export const clearQuotes = () => quotes.value = null


export const useQuote = () => {
    const store = useStore()

    return {
        searchQuote: (query: string) => store.dispatch('quote/search', { query }),
        fetchPendingQuotes
    }
}
