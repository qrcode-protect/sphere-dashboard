'use strict';

/*
 * vue3-project-default
 *
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 16/11/2021 at 10:01
 * File app/commons/index
 */

import router  from "@app/vue/router"

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