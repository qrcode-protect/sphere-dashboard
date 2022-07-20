"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 30/06/2022 at 16:15
 * File app/modules/activity/activity-module
 */

import { computed, reactive, toRefs }                                  from "vue";
import { fetchActivityById as xFetchActivityById, fetchAllActivities } from "@app/modules/activity/activity-repository";
import { Nullable }                                                    from "../../../types/nullable";
import Activity                                                        from "@app/modules/activity/activity";
import Quote                                                           from "@app/modules/activity/activity";
import store                                                           from "@app/vue/store";
import { useStore }                                                    from "vuex";

interface ActivityState {
    activity: Nullable<Activity>
}



export const useActivity = () => {
    const store = useStore()


    const state = reactive<ActivityState>({
        activity: null,
    })

    const fetchActivityById = (activityId: string): Promise<Nullable<Activity>> => xFetchActivityById(activityId)

    const activities = computed({
        get: (): Quote[] | null => store.getters['activity/activities'],
        set: value => store.commit('activity/SET_ACTIVITIES', value),
    })

    return {
        ...toRefs(state),

        activities,

        fetchActivityById,
        fetchAllActivities: () => store.dispatch('activity/fetchAll')
    }
}
