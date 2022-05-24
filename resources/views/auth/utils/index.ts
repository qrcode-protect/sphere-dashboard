"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 16/05/2022 at 10:15
 * File resources/views/auth/utils/index
 */

import { navigate as commonNav } from "@app/commons";
import { urlParams }             from "@app/vue/utils";
import Auth                      from "@app/modules/auth/auth";
import { Nullable }              from "../../../../types/nullable";

export interface UserLoginParameter {
    email: Nullable<string>,
    password: Nullable<string>,
    remember: Boolean
}

export interface UserRegisterParameter {
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    company: string,
}

export interface UserPasswordForgotParameter {
    email: string,
}

export interface UserPasswordResetParameter {
    email: string,
    password: string,
    confirmPassword: string,
    passwordResetID: string,
}

export const login = (user: UserLoginParameter) => {
    return Auth.login(user)
}

export const register = (user: UserRegisterParameter) => {
    return Auth.register(user)
}

export const password = {
    forgot: (user: UserPasswordForgotParameter) => {
        return Auth.forgot(user)
    },
    reset : (user: UserPasswordResetParameter) => {
        return Auth.reset(user)
    }
}

export const navigate = {
    login   : (params: any = urlParams()) => commonNav('login', params),
    register: (params: any = urlParams()) => commonNav('register', params),
    password: {
        reset: (params: any = urlParams()) => commonNav('password.reset', params),
    }
}
