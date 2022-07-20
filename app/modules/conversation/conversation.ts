/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/conversation/conversation
 */


import Model from "@sofiakb/vue3-framework/models/model";

import ConversationController from "@app/modules/conversation/conversation-controller";
import Partner                from "@app/modules/partner/partner";
import Member                 from "@app/modules/member/member";
import { Moment }             from "moment";

export default class Conversation extends Model {

    id: string
    partner: Partner
    member: Member
    messages: any[]
    date: Moment

    static icon = {
        name: 'test',
        type: 'la'
    }

    attributes = {
        id      : { prop: 'id', comment: "Identifiant" },
        partner : { prop: 'partner' },
        member  : { prop: 'member' },
        messages: { prop: 'messages' },
        date    : { prop: 'date' },
    }

    casts = {
        created: 'firebaseDate',
        updated: 'firebaseDate',
        partner: (value: any) => (new Partner()).__setItemAttributes(value),
        member : (value: any) => (new Member()).__setItemAttributes(value),
        date   : 'firebaseDate'
    }

    constructor(options: any = { controller: ConversationController }) {
        if (!options.controller)
            options.controller = ConversationController
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }

    history(options: {} = {}): Promise<unknown> {
        return super.fetchBy('history', options);
    }

    historyById(conversationId: string, options: {} = {}): Promise<unknown> {
        return super.fetchBy(`history/${conversationId}`, options);
    }
}

