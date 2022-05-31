/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/member/member
 */


import Model from "@sofiakb/vue3-framework/models/model";

import MemberController from "@app/modules/member/member-controller";
import { Nullable }     from "../../../types/nullable";


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
        name: 'screen-users',
        type: 'la'
    }

    attributes = {
        id         : { prop: 'id', comment: "Identifiant" },
        firstname  : { prop: 'firstname' },
        lastname   : { prop: 'lastname' },
        username   : { prop: 'username' },
        email      : { prop: 'email' },
        phone      : { prop: 'phone' },
        activityId : { prop: 'activityId' },
        companyName: { prop: 'companyName' },
        certificate: { prop: 'certificate' },
        siret      : { prop: 'siret' },
        active     : { prop: 'active' },
        available  : { prop: 'available' },
    }

    casts = {
        created: 'firebaseDate',
        updated: 'firebaseDate'
    }

    constructor(options: any = { controller: MemberController }) {
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }

    findActive(activityId?: Nullable<string>, options: any = {}) {
        return this.fetchBy(`active${activityId ? '/' + activityId : ''}`)
    }

    findPremium(activityId?: Nullable<string>, options: any = {}) {
        return this.fetchBy(`premium${activityId ? '/' + activityId : ''}`)
    }

    findInactive(options: any = {}) {
        return this.fetchBy('inactive')
    }

    accept(options: any = {}) {
        return new Promise((resolve, reject) => {
            this.controller.update(`/${this.table}/validate`, this.__id(this.id), this.__data({ active: true }), options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }

    deny(options: any = {}) {
        return new Promise((resolve, reject) => {
            this.controller.update(`/${this.table}/deny`, this.__id(this.id), this.__data({ active: false }), options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }

    unblock(options: any = {}) {
        this.available = true
        return this.update()
    }

    block(options: any = {}) {
        this.available = false
        return this.update()
    }

    forgotPassword(email: string | undefined, options = {}) {
        return MemberController.create(`/auth/password/forgot?app=website`, { email }, options)
    }
}

