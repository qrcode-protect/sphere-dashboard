/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/network/network
 */


import Model from "@sofiakb/vue3-framework/models/model";

import DepartmentController from "@app/modules/_network/department/department-controller";

export default class Department extends Model {

    id: string | null = null
    code: string | null = null
    name: string | null = null

    static icon = {
        name: 'test',
        type: 'la'
    }

    attributes = {
        id  : { prop: 'id', comment: "Identifiant" },
        code: { prop: 'code' },
        name: { prop: 'name' },
    }

    casts = {
        created: 'firebaseDate',
        updated: 'firebaseDate'
    }

    constructor(options: any = { controller: DepartmentController }) {
        if (!options.controller)
            options.controller = DepartmentController
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }
}

