"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 20/07/2022 at 12:30
 * File app/modules/search-module
 */


import { computed, reactive, toRefs } from "vue";
import { Nullable }                   from "../../types/nullable";
import { debounce }         from "lodash";

export const useSearch = (callback: CallableFunction, emptyInputCallback: CallableFunction) => {

    const state = reactive({
        searchInput: null as Nullable<string>,
        isTyping   : false as Boolean,
    })

    const onSearchInputUpdateValue = (value: string) => {
        state.isTyping = true
        state.searchInput = value
    }

    const onSearchInput = debounce(async () => {
        state.isTyping = false
        if (state.searchInput && state.searchInput.trim() !== '')
            await callback(state.searchInput)
        else await emptyInputCallback()
    }, 500)

    return {
        ...toRefs(state),

        isSearchInputEmpty: computed(() => !(state.searchInput && state.searchInput.trim() !== '')),

        onSearchInputUpdateValue,
        onSearchInput,
    }
}
