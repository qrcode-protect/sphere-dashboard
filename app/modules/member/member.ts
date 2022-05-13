/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/member/member
 */


import Model from "@sofiakb/vue3-framework/models/model";

import MemberController from "@app/modules/member/member-controller";


export default class Member extends Model {

    id: string | null = null
    firstname?: string
    lastname?: string
    username?: string
    email?: string
    phone?: string
    activityId?: string
    companyName?: string
    certificate?: string
    siret?: string
    active?: boolean
    available?: boolean

    static icon = {
        name: 'test',
        type: 'la'
    }

    attributes = {
        id   : { prop: 'id', comment: "Identifiant" },
        name : { prop: 'name', comment: "Nom court" },
        label: { prop: 'label', comment: "Libéllé" },
    }

    casts = {
        created: 'date',
        updated: 'date'
    }

    constructor(options: any = { controller: MemberController }) {
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }

    findActive(options: any = {}) {
        return this.fetchBy('active')
    }

    findInactive(options: any = {}) {
        return this.fetchBy('inactive')
    }

    validate(options: any = {}) {
        return new Promise((resolve, reject) => {
            this.controller.update(`/${this.table}/validate`, this.__id(this.id), this.__data({ active: true }), options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }
}

