/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File src/modules/request/request
 */

import Model          from "@sofiakb/vue3-framework/model";
import ModelAttribute from "@sofiakb/vue3-framework/model-attribute";
import Member         from "@app/modules/member/member";
// import PartnerService from "@app/modules/partner-service/partner-service";
import Partner        from "@app/modules/partner/partner";
import Quote          from "@app/modules/quote/quote";
import { Nullable }   from "../../../types/nullable";

import { Moment } from "moment";

export default class Request extends Model {

    id: string
    memberId: string
    partnerId: string
    serviceId: string
    description: string
    title: string
    status: string

    accepted: boolean
    declined: boolean
    pending: boolean

    member: Member
    partner: Partner

    quote: Nullable<Quote>

    fullName: string

    created: Moment
    updated: Moment


    static icon = {
        name: 'seal-question',
        type: 'la'
    }

    constructor(attributes?: any) {
        super({
            attributes: [
                ModelAttribute.create('id'),
                ModelAttribute.create('memberId'),
                ModelAttribute.create('partnerId'),
                ModelAttribute.create('serviceId'),
                ModelAttribute.create('description'),
                ModelAttribute.create('title'),
                ModelAttribute.create('status'),
                ModelAttribute.create('accepted'),
                ModelAttribute.create('declined'),
                ModelAttribute.create('pending'),
                ModelAttribute.create('member'),
                ModelAttribute.create('partner'),
                ModelAttribute.create('quote'),
                ModelAttribute.create('service'),
                ModelAttribute.create('created', 'createdAt'),
                ModelAttribute.create('updated', 'updatedAt'),
            ],
            casts     : {
                created: 'firebaseDate',
                updated: 'firebaseDate',
                beginAt: 'date',
                endAt  : 'date',
                member : (value: any) => Member.create(value),
                partner: (value: any) => Partner.create(value),
                // service: (value: any) => PartnerService.create(value),
                quote: (value: any) => value ? Quote.create(value) : null
            },
            only      : [
                'all',
                'fetchBy',
                'decline',
                'accept',
                'allPaginated',
                'acceptedPaginated',
                'declinedPaginated',
                'pendingPaginated',
                'terminatedPaginated',
                'deniedByMemberPaginated',
            ]
        });
        this.__setItemAttributes(attributes)

        this.fullName = this.member?.fullName()
    }

    static create(properties?: any) {
        return new Request({
            id         : properties?.id ?? null,
            memberId   : properties?.memberId ?? null,
            partnerId  : properties?.partnerId ?? null,
            serviceId  : properties?.serviceId ?? null,
            description: properties?.description ?? null,
            title      : properties?.title ?? null,
            status     : properties?.status ?? null,
            member     : properties?.member ?? null,
            partner    : properties?.partner ?? null,
            service    : properties?.service ?? null,
            quote      : properties?.quote ?? null,
        })
    }
}
