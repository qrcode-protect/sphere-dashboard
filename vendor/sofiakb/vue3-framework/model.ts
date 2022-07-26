"use strict";

/*
 * vue3-project-default
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 03/06/2022 at 16:51
 * File vendor/sofiakb/vue3-framework/model
 */

import { each, filter, includes, map, uniq } from "lodash";
import { AxiosApiError }                     from "@sofiakb/axios-api/lib/tools/api";
import { defined }                           from "@sofiakb/vue3-framework/utils";
import date                                  from "@app/vue/utils/date";
import moment                                from "moment";
import { jsonParse }                         from "@app/vue/utils";
import ModelAttribute                        from "@sofiakb/vue3-framework/model-attribute";


const pluralize = require('pluralize');

interface ModelAttributes {
    table?: string,
    pluralize?: boolean,
    appends?: any;
    casts?: any;
    columnID?: any,
    dateFormat?: any,

    except?: string[],
    only?: string[],
    fillable?: string[],
    attributes: ModelAttribute[],

    __original?: any,
}

export default class Model {

    readonly #appends: any;
    readonly #casts?: any;
    readonly #columnID: any = 'id'
    readonly #dateFormat: any = 'DD/MM/YYYY HH:mm:ss';

    readonly #except?: string[];
    readonly #only?: string[];
    readonly #fillable: string[] = []
    readonly #attributes: ModelAttribute[]

    #__original?: any;

    readonly #table: string

    constructor(options: ModelAttributes) {
        this.#table = this.#__resolve.table(options.table ?? this.constructor.name, !(options.pluralize === false))

        this.#appends = options.appends
        this.#attributes = options.attributes
        this.#casts = options.casts
        this.#columnID = options.columnID ?? 'id'
        this.#dateFormat = options.dateFormat ?? 'DD/MM/YYYY HH:mm:ss'
        this.#except = options.except
        this.#only = options.only

        this.#fillable = uniq(
            filter(this.#attributes, attribute => attribute.isFillable())
                .map(attribute => attribute.getKey())
                .concat(map(this.#attributes, attribute => attribute.getProp()))
        )
    }


    isFillable(field: string) {
        return includes(this.#fillable, field)
    }

    isMethodAllowed(methodName: string): boolean {
        const _only = this._only(),
            _except = this._except()

        return defined(_only)
            ? includes(_only, methodName)
            : _except.length > 0
                ? !includes(_except, methodName)
                : true;
    }

    notAllowedMethodError(methodName: string) {
        return <AxiosApiError>{ message: `Method [${methodName}] not allowed`, status: 400 }
    }

    _only() {
        return defined(this.#only) ? uniq(this.#only) : null
    }

    _except() {
        return defined(this.#except) ? uniq(this.#except) : []
    }

    _setAttribute(attribute: string, value: any) {
        // @ts-ignore
        this[attribute] = value
    }

    __setItemAttributes(item: any) {
        if (!defined(item))
            return item

        const itemKeys = Object.keys(item)

        this.#__original = item

        itemKeys.forEach((key: any) => {
            let modelKey: string | null = ModelAttribute.findByProp(this.#attributes, key)?.getKey() ?? null

            if (modelKey && this.isFillable(modelKey)) {
                if (this.#casts && this.#casts[modelKey]) {
                    let castTo = this.#casts[modelKey]

                    if (typeof castTo === 'function')
                        this._setAttribute(modelKey, castTo(item[key]))
                    else
                        switch (castTo) {
                            case 'date': {
                                this._setAttribute(modelKey, defined(item[key]) ? date.momentSql(item[key]) : item[key])
                                break
                            }
                            case 'firebaseDate': {
                                this._setAttribute(modelKey, defined(item[key]) ? moment.unix(item[key]?._seconds ?? item[key]?.seconds ?? null) : item[key])
                                break
                            }
                            case 'int': {
                                this._setAttribute(modelKey, defined(item[key]) ? parseInt(item[key]) : item[key])
                                break
                            }
                            case 'decimal': {
                                this._setAttribute(modelKey, defined(item[key]) ? parseFloat(item[key]) : item[key])
                                break
                            }
                            case 'boolean':
                            case 'bool': {
                                this._setAttribute(modelKey, defined(item[key]) ? item[key] === 'true' || item[key] === true : item[key])
                                break
                            }
                            case 'json': {
                                this._setAttribute(modelKey, defined(item[key]) ? jsonParse(item[key]) : item[key])
                                break
                            }
                            default:
                                break
                        }
                } else this._setAttribute(modelKey, item[key])
            }
        })

        if (this.#appends) {
            // @ts-ignore
            each(this.#appends, (method, key) => this._setAttribute(key, this[method]()))
        }
    }

    #__resolve = {
        table: (name: any, plural = true) => plural ? pluralize(name, 2).toLowerCase() : name.toLowerCase(),
    }

    get __original(): any {
        return this.#__original;
    }

    get attributes(): any {
        return this.#attributes;
    }

    get fillable(): any {
        return this.#fillable;
    }

    get appends(): any {
        return this.#appends;
    }

    get casts(): any {
        return this.#casts
    }

    get columnID(): any {
        return this.#columnID
    }

    get dateFormat(): any {
        return this.#dateFormat
    }

    get except(): string[] | undefined {
        return this.#except
    }

    get only(): string[] | undefined {
        return this.#only
    }

    get table(): string {
        return this.#table
    }
}
