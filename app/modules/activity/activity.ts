/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/activity/activity
 */


import Model from "@sofiakb/vue3-framework/models/model";

import ActivityController from "@app/modules/activity/activity-controller";
import { map }            from "lodash";

export default class Activity extends Model {

    id?: string | null
    name?: string
    label?: string
    activities?: Activity[]

    static icon = {
        name: 'chart-network',
        type: 'la'
    }

    attributes = {
        id: { prop: 'id', comment: "Identifiant" },
        name: { prop: 'name', comment: "Nom court" },
        label: { prop: 'label', comment: "Libéllé" },
        activities: { prop: 'activities', comment: "Sous-domaines" },
    }

    casts = {
        created: 'firebaseDate',
        updated: 'firebaseDate',
        activities: (value: any) => map(value, item => (new Activity()).__setItemAttributes(item))
    }

    constructor(options: any = { controller: ActivityController }) {
        if (!options.controller)
            options.controller = ActivityController
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }
}

