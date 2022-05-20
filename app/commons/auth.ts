"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 19/05/2022 at 12:03
 * File app/commons/auth
 */

import store  from "@app/vue/store";
import router from "@app/vue/router"
import User   from "@app/modules/user/user";
import Role   from "@app/modules/role/role";

export const user = async (): Promise<User | null> => {
    let user = store.getters['user/current']
    if (user === null) {
        await store.dispatch('user/fetchCurrent')
        user = store.getters['user/current']
    }
    return user;
}

export const authorized = async (level: number | null): Promise<boolean> => {
    const _user = await user()
    return (_user !== null && _user.role !== null && _user.role?.level !== null && level !== null) && ((_user.role.level >= 0 && level >= 0) && _user.role.level <= level);
}


export const roles = (): Role[] | null => store.getters['role/roles']

// export const roles = () => filter(xRoles(), role => [ RoleType.marketing, RoleType.admin ].includes(role.value)).filter(role => role.label = role.label.capitalize())


export const redirect = {
    login: {
        view: (name: string = 'login.redirect') => router.currentRoute?.value?.name === name ? null : router.replace({ name })
        // view: (url: string) => location.href = url
    }
}
