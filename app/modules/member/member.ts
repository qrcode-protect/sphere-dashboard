/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/member/member
 */


import Model from "@sofiakb/vue3-framework/models/model";

import MemberController  from "@app/modules/member/member-controller";
import { Nullable }      from "../../../types/nullable";
import Upload            from "@sofiakb/vue3-framework/models/upload";
import configAttributes  from "@config/api";
import { __createError } from "@sofiakb/axios-api";


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
    memberNumber: string

    static icon = {
        name: 'screen-users',
        type: 'la'
    }

    attributes = {
        id         : { prop: 'id', comment: "Identifiant" },
        firstname  : { prop: 'firstname', comment: "Prénom" },
        lastname   : { prop: 'lastname', comment: "Nom" },
        username   : { prop: 'username', comment: "Nom d'utilisateur" },
        email      : { prop: 'email', comment: "Adresse e-mail" },
        phone      : { prop: 'phone', comment: "Numéro de téléphone" },
        activityId : { prop: 'activityId', comment: "Domaine d'activité" },
        companyName: { prop: 'companyName', comment: "Nom commercial" },
        certificate: { prop: 'certificate', comment: "KBIS" },
        siret      : { prop: 'siret', comment: "SIRET" },
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

    findActiveByNumber(memberNumber: Nullable<string>, options: any = {}) {
        return this.fetchBy(`active/by-number/${memberNumber}`)
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

    premiumByEmail(data: { email: string }, options: any = {}) {
        return this.controller.post(`/${this.table}/search/premium-by-email`, this.__id(this.id), this.__data(data), {
            ...options,
            withLoading: false
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

    static send(data: any, options: any = {}) {

        const member = new Member()
        const upload = new Upload(data, data, [
            'firstname',
            'lastname',
            'username',
            'email',
            'phone',
            'activityId',
            'companyName',
            'certificate',
            'siret', ])

        return new Promise((resolve, reject) => {
            upload.send(`${member.table}/from-dashboard`, { controller: { attributes: { server: configAttributes.server } } })
                .then((response) => resolve(response))
                .catch((error) => reject(__createError(error)))
        })
    }
}

