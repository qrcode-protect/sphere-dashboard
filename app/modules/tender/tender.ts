/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/tender/tender
 */


import Model from "@sofiakb/vue3-framework/models/model";

import TenderController from "@app/modules/tender/tender-controller";
import { Moment }       from "moment";
import Address          from "@app/modules/address/address";

export default class Tender extends Model {

    id: string
    title: string
    description: string
    amount: number
    file: string
    beginAt: Moment
    endAt: Moment
    expiresAt?: Moment
    publishedAt?: Moment
    address: Address
    memberId: string
    reporter: string
    available: boolean
    active: boolean

    static icon = {
        name: 'test',
        type: 'la'
    }

    attributes = {
        id         : { prop: 'id', comment: "Identifiant" },
        title      : { prop: 'title' },
        description: { prop: 'description' },
        amount     : { prop: 'amount' },
        file       : { prop: 'file' },
        beginAt    : { prop: 'beginAt' },
        endAt      : { prop: 'endAt' },
        expiresAt  : { prop: 'expiresAt' },
        publishedAt: { prop: 'publishedAt' },
        address    : { prop: 'address' },
        memberId   : { prop: 'memberId' },
        reporter   : { prop: 'reporter' },
        available  : { prop: 'available' },
        active     : { prop: 'active' },
    }

    casts = {
        created    : 'firebaseDate',
        updated    : 'firebaseDate',
        publishedAt: 'firebaseDate',
        beginAt    : 'firebaseDate',
        endAt      : 'firebaseDate',
        expiresAt  : 'firebaseDate',
    }

    constructor(options: any = { controller: TenderController }) {
        if (!options.controller)
            options.controller = TenderController
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
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
        return new Promise((resolve, reject) => {
            this.controller.update(`/${this.table}/unblock`, this.__id(this.id), this.__data({ active: false }), options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }

    block(options: any = {}) {
        return new Promise((resolve, reject) => {
            this.controller.update(`/${this.table}/block`, this.__id(this.id), this.__data({ active: false }), options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }

    findActive(options: any = {}) {
        return this.fetchBy('active')
    }

    findInactive(options: any = {}) {
        return this.fetchBy('inactive')
    }
}

