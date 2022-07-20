"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 30/06/2022 at 16:15
 * File app/modules/activity/activity-module
 */

import { reactive, toRefs }                                            from "vue";
import { fetchActivityById as xFetchActivityById, fetchAllActivities } from "@app/modules/activity/activity-repository";
import { Nullable }                                                    from "../../../types/nullable";
import Activity                                    from "@app/modules/activity/activity";

interface ActivityState {
    activity: Nullable<Activity>
}

export const useActivity = () => {
    const state = reactive<ActivityState>({
        activity: null
    })

    const fetchActivityById = (activityId: string): Promise<Nullable<Activity>> => xFetchActivityById(activityId)

    return {
        ...toRefs(state),
        fetchActivityById,
        fetchAllActivities
    }
}
