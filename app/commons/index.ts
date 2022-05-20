'use strict';

/*
 * vue3-project-default
 *
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 16/11/2021 at 10:01
 * File app/commons/index
 */

import router                  from "@app/vue/router"
import { urlParams }           from "@app/vue/utils";
import { roleLabel, RoleType } from "@app/modules/role/role-type";
import { Nullable }            from "../../types/nullable";

export const src = (path: string) => {
    try {
        return require(`@/assets/img/${path}`)
    } catch (e) {
        throw e
    }
}

export const routeExists = (name: string) => router.hasRoute(name)

export const fetchIP = () => fetch('https://api.ipify.org?format=json')
    .then(x => x.json())
    .then(({ ip }) => {
        return ip;
    })

export const navigate = (name: string, query: any = urlParams()) => router.push({ name, query })

export const roles = () => {
    const roles: { key: string, value: RoleType, label: any }[] = []
    for (let roleType in RoleType) {
        roles.push({
            key: roleType,
            // @ts-ignore
            value: RoleType[roleType],
            // @ts-ignore
            label: roleLabel(RoleType[roleType])
        })
    }
    roles.sort((a, b) => {
        return a.label.localeCompare(b.label);
    })

    return roles
}

export const filled = (value: Nullable<string>) => value && value.trim() !== ''
