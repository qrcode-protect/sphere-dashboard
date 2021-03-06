/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/partner/partner
 */


import Model from "@sofiakb/vue3-framework/models/model";

import PartnerController from "@app/modules/partner/partner-controller";
import Upload            from "@sofiakb/vue3-framework/models/upload";

import configAttributes  from '@config/api';
import { __createError } from "@sofiakb/axios-api";
import { Nullable }      from "../../../types/nullable";

export default class Partner extends Model {

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
    avatar?: string
    description?: string
    activities?: string[]

    static icon = {
        name: 'handshake-angle',
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
        avatar  : { prop: 'avatar' },
        description  : { prop: 'description', comment: "Description" },
        activities  : { prop: 'activities', comment: "Sous-domaines" },
    }

    casts = {
        created: 'firebaseDate',
        updated: 'firebaseDate'
    }

    constructor(options: any = { controller: PartnerController }) {
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }

    findActive(activityId?: Nullable<string>, options: any = {}) {
        return this.fetchBy(`active${activityId ? '/' + activityId : ''}`)
    }

    findInactive(activityId?: Nullable<string>, options: any = {}) {
        return this.fetchBy(`inactive${activityId ? '/' + activityId : ''}`)
    }

    groupByActivity(options: any = {}) {
        return this.fetchBy(`group-by/${this.attributes.activityId.prop}`)
    }

    static send(data: any, options: any = {}) {

        const partner = new Partner()
        const upload = new Upload(data, data, [
            'firstname',
            'lastname',
            'username',
            'email',
            'phone',
            'activityId',
            'companyName',
            'certificate',
            'avatar',
            'description',
            'activities',
            'siret', ])

        return new Promise((resolve, reject) => {
            upload.send(`${partner.table}/from-dashboard`, { controller: { attributes: { server: configAttributes.server } } })
                .then((response) => resolve(response))
                .catch((error) => reject(__createError(error)))
        })
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
        return PartnerController.create(`/auth/password/forgot?app=partner`, { email }, options)
    }
}

