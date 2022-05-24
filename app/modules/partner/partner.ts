/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/partner/partner
 */


import Model from "@sofiakb/vue3-framework/models/model";

import ExampleController from "@app/modules/partner/partner-controller";
import Upload            from "@sofiakb/vue3-framework/models/upload";

import configAttributes  from '@config/api';
import { __createError } from "@sofiakb/axios-api";

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
    }

    casts = {
        created: 'date',
        updated: 'date'
    }

    constructor(options: any = { controller: ExampleController }) {
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
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
            'siret', ])

        return new Promise((resolve, reject) => {
            upload.send(`${partner.table}/from-dashboard`, { controller: { attributes: { server: configAttributes.server } } })
                .then((response) => resolve(response))
                .catch((error) => reject(__createError(error)))
        })
    }
}

