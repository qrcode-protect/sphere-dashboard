/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/user/user
 */


import Model from "@sofiakb/vue3-framework/models/model";

import UserController from "@app/modules/user/user-controller";
import { RoleType }   from "@app/modules/role/role-type";
import { Nullable }   from "../../../types/nullable";
import Role           from "@app/modules/role/role";

export default class User extends Model {

    id?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
    phone: Nullable<string>;
    active?: boolean;
    uid?: string;
    roleType?: RoleType;
    role: Role | null = null

    static icon = {
        name: 'test',
        type: 'la'
    }

    attributes = {
        id: { prop: 'id', comment: "Identifiant" },
    }

    casts = {
        created: 'firebaseDate',
        updated: 'firebaseDate'
    }

    constructor(options: any = { controller: UserController }) {
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }

    enable() {
        return this.controller.update(`/${this.table}/enable`, this.__id(this.id), this.__data({ active: true }))
    }

    disable() {
        return this.controller.update(`/${this.table}/disable`, this.__id(this.id), this.__data({ active: false }))
    }

    static current(): Promise<any> {
        return UserController.fetch(`/auth/user/current`)
    }

    dashboard(options = {}) {
        return this.fetchBy('dashboard', options)
    }

    forgotPassword(email: string | undefined, options = {}) {
        return UserController.create(`/auth/password/forgot`, { email }, options)
    }
}

