"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 24/05/2022 at 09:55
 * File app/commons/activities
 */

import store        from "@app/vue/store";
import { computed } from "@vue/reactivity";

export const activities = computed(() => store.getters['activity/activities'])

export const fetchActivities = () => {
    if (activities.value === null) {
        return store.dispatch('activity/fetchAll');
    }
    return null
}
