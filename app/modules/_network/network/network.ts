/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/network/network
 */


import Model from "@sofiakb/vue3-framework/models/model";

import NetworkController from "@app/modules/_network/network/network-controller";
import Department        from "@app/modules/_network/department/department";
import { map }           from "lodash";

export default class Network extends Model {

    id: string | null = null
    name: string | null = null
    departments: Department[] | null = null

    static icon = {
        name: 'test',
        type: 'la'
    }

    attributes = {
        id         : { prop: 'id', comment: "Identifiant" },
        name       : { prop: 'name' },
        departments: { prop: 'departments' },
    }

    casts = {
        created    : 'date',
        updated    : 'date',
        departments: this.castDepartment
    }

    castDepartment(value: any) {
        return map(value, item => (new Department({
                attributes: {
                    code: item.code,
                    name: item.name
                }
            }))
        )
    }

    constructor(options: any = { controller: NetworkController }) {
        if (!options.controller)
            options.controller = NetworkController
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }
}

