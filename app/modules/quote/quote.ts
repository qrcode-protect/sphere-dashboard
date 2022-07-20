/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/quote/quote
 */


import Model from "@sofiakb/vue3-framework/models/model";

import QuoteController   from "@app/modules/quote/quote-controller";
import { Moment }        from "moment";
import Member            from "@app/modules/member/member";
import DateJs            from "@app/vue/utils/date";
import Partner           from "@app/modules/partner/partner";
import { includes }      from "lodash";
import { AxiosApiError } from "@sofiakb/axios-api/lib/tools/api";

export default class Quote extends Model {

    id: string
    transmitter: string
    customer: string
    amount: number
    accepted: boolean = false
    declined: boolean = false
    acceptedAt: Moment
    declinedAt: Moment
    expiresAt: any
    expiration: Moment
    created: Moment
    file: string
    member: Member
    partner: Partner
    conversationId: string

    static icon = {
        name: 'test',
        type: 'la'
    }

    attributes = {
        id            : { prop: 'id', comment: "Identifiant" },
        transmitter   : { prop: 'transmitter' },
        customer      : { prop: 'customer' },
        amount        : { prop: 'amount' },
        accepted      : { prop: 'accepted' },
        declined      : { prop: 'declined' },
        acceptedAt    : { prop: 'acceptedAt' },
        declinedAt    : { prop: 'declinedAt' },
        expiresAt     : { prop: 'expiresAt' },
        created       : { prop: 'createdAt' },
        file          : { prop: 'file' },
        member        : { prop: 'member' },
        conversationId: { prop: 'conversationId' },
    }

    casts = {
        created: 'firebaseDate',
        updated: 'firebaseDate',
        acceptedAt: 'firebaseDate',
        declinedAt: 'firebaseDate',
        member    : (value: any) => (new Member()).__setItemAttributes(value),
        partner    : (value: any) => (new Partner()).__setItemAttributes(value),
    }

    constructor(options: any = { controller: QuoteController }) {
        if (!options.controller)
            options.controller = QuoteController
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }

    isAccepted() {
        return this.accepted
    }

    isDeclined() {
        return this.declined
    }

    isPending() {
        return !this.accepted && !this.declined
    }

    isExpired() {
        return this.expiresAt && this.expiration < DateJs.moment()
    }

    search(query: string, options = {}) {
        return new Promise((resolve, reject) => {
            if ((this.only && !includes(this.only, 'search')) || (this.except && includes(this.except, 'search')))
                return reject(<AxiosApiError>{ message: "Method [search] not allowed", status: 400 })

            this.controller.create(`/${this.table}/search/by-partner`, { query }, options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }
}

