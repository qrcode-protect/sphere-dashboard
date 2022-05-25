/*
 * (c) Sofiakb <contact.sofiakb@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File vendor/sofiakb/vue3-framework/models/model
 *
 * @author sofiakb
 */

import { namespaces }                           from "@config/app";
import { each, keys, map, pick }                from 'lodash'
import { clone, combine, jsonParse, renameKey } from "@app/vue/utils";
import date                                     from "@app/vue/utils/date";

const pluralize = require('pluralize');

let _cls_: any = {};


export default class Model {

    controller: any;
    table: any;
    model: any;
    attributes: any;
    casts: any;
    appends: any;
    static dateFormat: any = 'DD/MM/YYYY HH:mm:ss';
    columnID: any = 'id'
    __original: any;

    constructor(options: any = { attributes: null, name: null, pluralize: true }) {
        if (options.controller)
            this.controller = options.controller
        else
            this.__resolve.controller(options.name || this.constructor.name, options.controllerPath || namespaces.controller);
        this.__resolve.table(options.name || this.constructor.name, options.pluralize);

        if (options.attributes)
            setTimeout(() => this.__setItemAttributes(options.attributes, true))
    }

    all(options = {}) {
        return new Promise((resolve, reject) => {
            this.controller.fetch(`/${this.table}`, options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }

    fetchBy(parameter: any, options = {}) {
        return new Promise((resolve, reject) => {
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
            this.controller.create(`/${this.table}`, this.__data(data), options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }

    search(payload: any, options = {}) {
        return new Promise((resolve, reject) => {
            this.controller.search(`/${this.table}/search`, payload, options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }

    update(id: any = null, data: any = null, options = {}) {
        return new Promise((resolve, reject) => {
            this.controller.update(`/${this.table}`, this.__id(id), this.__data(data), options)
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        })
    }

    destroy(id = null, options = {}) {
        return this.controller.destroy(`/${this.table}`, this.__id(id), options)
    }

    paginate(page = 1, limit = 18, options = {}) {
        return new Promise((resolve, reject) =>
            this.controller.paginate(`/${this.table}`, page, limit, options)
                .then((data: any) => {
                    let items = data.data, result = data
                    result.data = this.setAttributes(items)
                    return resolve(result)
                })
                .catch((error: any) => reject(error)))
    }

    setAttributes(values: any) {
        return Array.isArray(values) ? values.map(item => this.__setItemAttributes(item)) : this.__setItemAttributes(values);
    }

    __setItemAttributes(item: any, self = false) {
        if (item === null || typeof item === 'undefined')
            return self ? this : new this.model

        const attributes = combine(map(this.attributes, attribute => attribute.prop || attribute), keys(this.attributes)),
            itemKeys = Object.keys(item)
        let result = self ? this : new this.model
        result.__original = item
        itemKeys.forEach(key => {
            let modelKey = attributes[key] || key
            if (this.casts && this.casts[modelKey]) {
                let castTo = this.casts[modelKey]
                if (typeof castTo === 'function')
                    result[modelKey] = castTo(item[key])
                else
                    switch (castTo) {
                        case 'date': {
                            result[modelKey] = date.momentSql(item[key]).format(this.model.dateFormat)
                            break
                        }
                        case 'int': {
                            result[modelKey] = parseInt(item[key])
                            break
                        }
                        case 'boolean': {
                            result[modelKey] = item[key] === 'true' || item[key] === true
                            break
                        }
                        case 'json': {
                            result[modelKey] = jsonParse(item[key])
                            break
                        }
                        default:
                            break
                    }
            } else result[modelKey] = item[key]
            if (self) {
                // @ts-ignore
                this[modelKey] = result[modelKey]
            }
        })

        if (this.appends) {
            each(this.appends, (method, key) => result[key] = result[method]())
        }

        return result
    }

    __resolve = {
        controller: (name: any, controllerPath: string) => {
            if (!name || name === '' || !(typeof name === 'string'))
                throw new Error(`Please verifiy CLASS name : ${name || 'undefined'}.`);

            try {
                const controllerName = `${name.toLowerCase()}-controller`;
                this.controller = require(`${controllerPath}/${controllerName}`).default
            } catch (e: any) {
                throw new Error(e);
            }
        },

        table: (name: any, plural = true) => this.table = plural ? pluralize(name, 2).toLowerCase() : name.toLowerCase(),

        model(name: any) {
            if (!_cls_[name]) {
                // cache is not ready, fill it up
                if (name.match(/^[a-zA-Z0-9_]+$/)) {
                    // proceed only if the name is a single word string
                    _cls_[name] = name;
                } else {
                    // arbitrary code is detected
                    throw new Error("Who let the dogs out?");
                }
            }
            return _cls_[name];
        },
    }

    __id(id: any) {
        // @ts-ignore
        return id || this[this.columnID]
    }

    __data(data: any) {
        if ((data && data.__original) || !data) {
            const original = (data || this).__original
            data = clone(data || pick(this, keys(this.attributes)))
            each(keys(data), key => {
                if (this.casts[key] === 'date')
                    data[key] = date.moment(data[key])

                const originalKey = this.attributes[key].prop || this.attributes[key]

                if (typeof original[originalKey] === 'undefined')
                    delete data[key]
                else
                    data = renameKey(data, key, this.attributes[key].prop || this.attributes[key])
            })
        }
        return data

    }
}
