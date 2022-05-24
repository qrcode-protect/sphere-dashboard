/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/example/example
 */


import Model from "@sofiakb/vue3-framework/models/model";

import AuthController from "@app/modules/auth/auth-controller";
import {
    UserLoginParameter,
    UserPasswordForgotParameter,
    UserPasswordResetParameter,
    UserRegisterParameter
}                     from "@/views/auth/utils";

export default class Auth extends Model {

    static icon = {
        name: 'test',
        type: 'la'
    }

    static PREFIX = '/auth'

    attributes = {
        id: { prop: 'id', comment: "Identifiant" },
    }

    casts = {
        created: 'date',
        updated: 'date'
    }

    constructor(options: any = { controller: AuthController }) {
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }

    static login(user: UserLoginParameter): Promise<any> {
        return new Promise((resolve, reject) => {
            AuthController.post(`${this.PREFIX}/login`, {
                ...user,
            }, { redirectIfNotLogged: false })
                .then((response: any) => resolve(response))
                .catch((error) => reject(error))
        })
    }

    static register(user: UserRegisterParameter) {
        return new Promise((resolve, reject) => {
            AuthController.post(`${this.PREFIX}/register`, user, { redirectIfNotLogged: false })
                .then((response: any) => resolve(response))
                .catch((error) => reject(error))
        })
    }

    static forgot(user: UserPasswordForgotParameter) {
        return new Promise((resolve, reject) => {
            AuthController.post(`${this.PREFIX}/password/forgot`, user, { redirectIfNotLogged: false })
                .then((response: any) => resolve(response))
                .catch((error) => reject(error))
        })
    }

    static reset(user: UserPasswordResetParameter) {
        return new Promise((resolve, reject) => {
            AuthController.post(`${this.PREFIX}/password/reset`, user, { redirectIfNotLogged: false })
                .then((response: any) => resolve(response))
                .catch((error) => reject(error))
        })
    }
}

