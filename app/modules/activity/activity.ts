/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/activity/activity
 */


import Model from "@sofiakb/vue3-framework/models/model";

import ActivityController from "@app/modules/activity/activity-controller";

export default class Activity extends Model {

    id?: string
    name?: string
    label?: string

    static icon = {
        name: 'test',
        type: 'la'
    }

    attributes = {
        id: { prop: 'id', comment: "Identifiant" },
        name: { prop: 'name', comment: "Nom court" },
        label: { prop: 'label', comment: "Libéllé" },
    }

    casts = {
        created: 'date',
        updated: 'date'
    }

    constructor(options: any = { controller: ActivityController }) {
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }
}

