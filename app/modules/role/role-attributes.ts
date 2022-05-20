"use strict";

/*
 * api
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 09/05/2022 at 11:38
 * File src/User/UserAttributes
 */

import { Nullable } from "../../../types/nullable";

export default interface RoleAttributes {
    id?: string,
    firstname: string,
    lastname: string,
    username?: string,
    email: string,
    password?: string,
    phone: Nullable<string>,
    active?: boolean,
    uid?: string
}
