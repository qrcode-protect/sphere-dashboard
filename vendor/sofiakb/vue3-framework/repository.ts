/*
 * (c) Sofiakb <contact.sofiakb@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File vendor/sofiakb/vue3-framework/repository
 *
 * @author sofiakb
 */

import { ClassConstructor } from "@app/core/types/class-constructor";
import { AxiosApiError }    from "@sofiakb/axios-api/lib/tools/api";
import { each, keys }       from "lodash";
import { clone, renameKey } from "@app/vue/utils";
import date                 from "@app/vue/utils/date";
import ModelAttribute       from "@sofiakb/vue3-framework/model-attribute";
import { defined }          from "@sofiakb/vue3-framework/utils";

export interface RepositoryAttributes {
    controller: ClassConstructor<any>,
    model: ClassConstructor<any>,
}

interface GenericModelAttributes {
    table: string,
    isMethodAllowed: Function,
    __original?: any,
    casts?: any,
    attributes: ModelAttribute[],
    columnID: string,
}

export class Repository<T extends GenericModelAttributes> {
    model: ClassConstructor<T>
    controller: any
    modelObject: T
    table: string

    constructor(attributes: RepositoryAttributes) {
        this.controller = new attributes.controller()
        this.model = attributes.model
        this.modelObject = (new this.model())
        this.table = this.modelObject.table
    }

    casting(data: any): T | null {
        return this.model && data ? /*this.__setItemAttributes(data)*/new this.model(data) : null;
    }

    all(options = {}): Promise<(T | null)[] | T | null | AxiosApiError> {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('all'))
                return reject(<AxiosApiError>{ message: "Method [all] not allowed", status: 400 })

            this.controller.fetch(`/${this.table}`, options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }

    fetchBy(parameter: any, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('fetchBy'))
                return reject(<AxiosApiError>{ message: "Method [fetchBy] not allowed", status: 400 })

            this.controller.fetchBy(`/${this.table}`, parameter, options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }

    mine(options = {}) {
        return this.fetchBy('mine', options)
    }

    store(data: any = null, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('store'))
                return reject(<AxiosApiError>{ message: "Method [store] not allowed", status: 400 })

            this.controller.create(`/${this.table}`, this.__data(data), options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }

    search(payload: any, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('search'))
                return reject(<AxiosApiError>{ message: "Method [search] not allowed", status: 400 })

            this.controller.search(`/${this.table}/search`, payload, options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }

    update(id: any = null, data: any = null, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('update'))
                return reject(<AxiosApiError>{ message: "Method [update] not allowed", status: 400 })

            this.controller.update(`/${this.table}`, this.__id(id), this.__data(data), options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }

    destroy(id: any = null, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('destroy'))
                return reject(<AxiosApiError>{ message: "Method [destroy] not allowed", status: 400 })

            this.controller.destroy(`/${this.table}`, this.__id(id), options)
                .then((data: any) => resolve(data))
                .catch((error: any) => reject(error))
        })
    }

    paginate(page = 1, limit = 18, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('paginate'))
                return reject(<AxiosApiError>{ message: "Method [paginate] not allowed", status: 400 })

            this.controller.paginate(`/${this.table}`, page, limit, options)
                .then((data: any) => {
                    let items = data.data, result = data
                    result.data = this.setAttributes(items)
                    return resolve(result)
                })
                .catch((error: any) => reject(error))
        })
    }

    setAttributes(values: any): (T | null)[] | (T | null) {
        return Array.isArray(values) ? values.map(item => this.casting(item)) : this.casting(values);
    }

    __data(data: T) {
        if ((data && data.__original) || !data) {
            const original = data.__original,
                dataParameter = data

            data = clone(data)

            each(keys(data), key => {

                if (defined(data.casts) && defined(data.casts[key]) && data.casts[key] === 'date') {
                    // @ts-ignore
                    data[key] = date.moment(data[key])
                }

                if (typeof original[key] === 'undefined') { // @ts-ignore
                    delete data[key]
                } else {
                    const modelAttribute = ModelAttribute.findByProp(dataParameter.attributes, key)

                    if (modelAttribute === null || !modelAttribute.isFillable()) {
                        // @ts-ignore
                        delete data[key]
                    } else
                        data = renameKey(data, key, modelAttribute.getProp())
                }
            })
        }
        return data
    }

    __id(id: any) {
        // @ts-ignore
        return id || this[this.modelObject.columnID]
    }
}
