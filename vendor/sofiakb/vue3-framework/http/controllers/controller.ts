/*
 * (c) Sofiakb <contact.sofiakb@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File vendor/sofiakb/vue3-framework/http/controllers/controller
 *
 * @author sofiakb
 */

import { __createError, __options } from '@sofiakb/vue3-framework/http/utils';
import { Tools }                    from '@app/packages/ssf';
import configAttributes             from '@config/api';
import { MethodsType }              from "@sofiakb/axios-api/lib/types/methods-type";

export default class Controller extends Tools.Api {
    constructor(attributes: any = configAttributes) {
        super(attributes);
    }

    request(method: MethodsType, path: string, options: any = {}) {
        options = __options(options);
        return new Promise((resolve, reject) => {
            options.loading();
            super.request(method, path, options)
                .then((response: any) => resolve(response))
                .catch((error: any) => reject(__createError(error)))
                .finally(() => options.loading(false))
        })
    }

    fetch(url: string, options: any = {}) {
        return this.request('GET', url, options)
    }

    fetchBy(url: string, parameter: any, options: any = {}) {
        return this.fetch(`${url}/${parameter}`, options)
    }

    create(url: string, data: any, options: any = {}) {
        return this.post(url, data, options)
    }

    update(url: any, id: string | number, data: any, options: any = {}) {
        return this.put(url, id, data, options)
    }

    destroy(url: any, id: string | number, options: any = {}) {
        return this.delete(url, id, options)
    }

    search(url: any, data: any, options: any = {}) {
        return this.request('POST', url, { ...options, ...{ data } })
    }

    paginate(url: any, page = 0, limit = 18, options: any = {}) {
        return this.request('GET', `${url}/page/${page}?limit=${limit}`, options)
    }

    post(url: string, data: any, options: any = {}) {
        return this.request('POST', url, { ...options, ...{ data } })
    }

    put(url: any, id: string | number, data: any, options: any = {}) {
        return this.request('PUT', `${url}/${id}`, { ...options, ...{ id, data } })
    }

    delete(url: any, id: string | number, options: any = {}) {
        return this.request('DELETE', `${url}/${id}`, { ...options, ...{ id } })
    }
}
