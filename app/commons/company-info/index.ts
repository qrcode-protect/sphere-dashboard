"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 23/05/2022 at 09:39
 * File app/commons/company-info/index
 */



import { UrlPrefix, UrlType } from "@app/commons";

interface CompanyInfoAttributes {
    icon: string,
    key: string,
    isLink?: boolean,
    urlPrefix?: UrlPrefix,
    urlType?: UrlType,
    copyable?: boolean,
    title?: string,
    titleOnly?: boolean,
    onlyFull?: boolean,
}

export default class CompanyInfo {
    icon: string
    key: string
    isLink: boolean
    copyable: boolean
    urlPrefix: UrlPrefix | undefined
    urlType: UrlType | undefined
    title: string | undefined
    titleOnly: boolean
    onlyFull: boolean

    constructor(attributes: CompanyInfoAttributes) {
        this.icon = attributes.icon
        this.key = attributes.key
        this.isLink = attributes.isLink ?? false
        this.urlPrefix = attributes.urlPrefix
        this.urlType = attributes.urlType
        this.title = attributes.title
        this.titleOnly = attributes.titleOnly === true && typeof attributes.title !== "undefined"
        this.copyable = attributes.copyable ?? false
        this.onlyFull = attributes.onlyFull ?? false
    }
}
