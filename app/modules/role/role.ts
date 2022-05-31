/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/role/role
 */


import Model from "@sofiakb/vue3-framework/models/model";

import RoleController from "@app/modules/role/role-controller";

export default class Role extends Model {

    label: string | null = null;
    name: string | null = null;
    level: number | null = null;

    static icon = {
        name: 'test',
        type: 'la'
    }

    attributes = {
        label: { prop: 'label' },
        name : { prop: 'name' },
        level: { prop: 'level' },
    }

    casts = {
        created: 'firebaseDate',
        updated: 'firebaseDate'
    }

    constructor(options: any = { controller: RoleController }) {
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }

    all() {
        return RoleController.fetch('/auth/roles/dashboard')
    }
}

