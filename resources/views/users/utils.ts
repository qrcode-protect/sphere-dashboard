"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 17/05/2022 at 17:54
 * File resources/views/users/utils
 */

import User         from "@app/modules/user/user";
import { RoleType } from "@app/modules/role/role-type";


export interface UserCreateParameter {
    lastname: string,
    firstname: string,
    email: string,
    roleType: RoleType
}

export const create = (data: UserCreateParameter) => {
    const user = (new User()).setAttributes(data)
    return user.store(data)
}
