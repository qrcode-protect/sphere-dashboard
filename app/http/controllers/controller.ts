"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 16/05/2022 at 10:21
 * File app/http/controllers/controller
 */

import { __createError, __options } from "@sofiakb/vue3-framework/http/utils";
import BaseController               from "@sofiakb/vue3-framework/http/controllers/controller";
import router                       from "@app/vue/router";
import { MethodsType }              from "@sofiakb/axios-api/lib/types/methods-type";


export default class Controller extends BaseController {
    request(method: MethodsType, path: string, options: any = {}) {
        options = __options(options);
        return new Promise((resolve, reject) => {
            options.loading();
            super.request(method, path, options)
                .then((response: any) => resolve(response))
                .catch((error: any) => {
                    if (error.status === 500) {
                        return reject(router.push({ name: 'error.server' }))
                    } else return reject(__createError(error))
                })
                .finally(() => options.loading(false))
        })
    }
}
