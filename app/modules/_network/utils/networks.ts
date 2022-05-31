"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 24/05/2022 at 09:55
 * File app/modules/_network/utils/networks
 */

import store        from "@app/vue/store";
import { computed } from "@vue/reactivity";

export const networksGetter = 'network/networks'
export const networks = computed(() => store.getters[networksGetter])

export const fetchNetworks = (force= false) => {
    if (force === true || networks.value === null) {
        return store.dispatch('network/fetchAll');
    }
    return null
}
