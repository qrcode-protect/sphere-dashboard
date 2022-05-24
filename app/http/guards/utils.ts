"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 19/05/2022 at 12:03
 * File app/http/guards/utils
 */

import { authorized, roles } from "@app/commons/auth";
import { RoleType }          from "@app/modules/role/role-type";
import store                 from "@app/vue/store";
import { find }              from "lodash";
import cookie                from "@sofiakb/cookie";

export const handle = async (roleName: RoleType, resolve: any, reject: any, {
    from,
    to
}: any, redirectTo: string = 'login') => {
    const token = cookie.get(store.getters.TOKEN_NAME)

    if (token === null || token.trim() === '')
        return reject({ name: 'login' });


    let _roles = roles()

    if (_roles === null) {
        await store.dispatch('role/fetchAll')
        _roles = roles()
    }

    return _roles && await authorized((find(_roles, role => role.name === roleName) || { level: -1 }).level)
        ? resolve()
        : reject({ name: redirectTo });
}
