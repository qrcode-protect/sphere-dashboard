/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/tender/tender
 */


import Model from "@sofiakb/vue3-framework/models/model";

import TenderController  from "@app/modules/tender/tender-controller";
import { Moment }        from "moment";
import Address           from "@app/modules/address/address";
import Upload            from "@sofiakb/vue3-framework/models/upload";
import configAttributes  from "@config/api";
import { __createError } from "@sofiakb/axios-api";
import DateJs            from "@app/vue/utils/date";
import { Nullable }      from "../../../types/nullable";

export default class Tender extends Model {

    id: string
    title: string
    description: string
    amount: number
    file: string | File
    beginAt: Nullable<Moment | string>
    endAt: Nullable<Moment | string>
    expiresAt?: Nullable<Moment | string>
    publishedAt?: Nullable<Moment | string>
    address: Address
    memberId: string | null
    reporter: string
    available: boolean
    active: boolean
    activityId?: string
    activities?: string[]

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
        activityId : { prop: 'activityId', comment: "Domaine d'activité" },
        activities  : { prop: 'activities', comment: "Sous-domaines" },
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

    static create(properties?: any) {
        return (new Tender()).__setItemAttributes({
            id         : properties?.id ?? null,
            title      : properties?.title ?? null,
            description: properties?.description ?? null,
            amount     : properties?.amount ?? null,
            file       : properties?.file ?? null,
            beginAt    : properties?.beginAt ?? null,
            endAt      : properties?.endAt ?? null,
            expiresAt  : properties?.expiresAt ?? null,
            publishedAt: properties?.publishedAt ?? null,
            address    : properties?.address ?? Address.create(),
            memberId   : properties?.memberId ?? null,
            reporter   : properties?.reporter ?? null,
            available  : properties?.available ?? false,
            active     : properties?.active ?? false,
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

    static send(data: any, id?: string) {
        const tender = new Tender()

        data.expiresAt = data.expiresAt ? DateJs.moment(data.expiresAt).valueOf() : null
        data.beginAt = data.beginAt ? DateJs.moment(data.beginAt).valueOf() : null
        data.endAt = data.endAt ? DateJs.moment(data.endAt).valueOf() : null

        data.address = JSON.stringify(data.address)

        delete data.file

        const upload = new Upload(data, data, [
            'title',
            'description',
            'amount',
            'file',
            'beginAt',
            'endAt',
            'expiresAt',
            'publishedAt',
            'address',
            'memberId',
            'reporter',
            'activities',
            'activityId',
        ])

        return new Promise((resolve, reject) => {
            upload.send(`${tender.table}/from-dashboard${id ? '/' + id : ''}`, { controller: { attributes: { server: configAttributes.server } } })
                .then((response) => resolve(response))
                .catch((error) => reject(__createError(error)))
        })
    }
}

