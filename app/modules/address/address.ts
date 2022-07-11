"use strict";

/*
 * api
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 12/05/2022 at 10:54
 * File src/Address/Address
 */

import AddressAttributes from "./address-attributes";

export default class Address {
    id?: string
    street_number: number | null
    address: string | null
    address2: string | null
    zipcode: string | null
    city: string | null
    country?: string
    lat: number | null
    lng: number | null


    constructor(attributes: AddressAttributes) {
        this.id = attributes.id
        this.street_number = attributes.street_number
        this.address = attributes.address
        this.address2 = attributes.address2
        this.zipcode = attributes.zipcode
        this.city = attributes.city
        this.country = (attributes.country ?? "FRANCE").toUpperCase()
    }

    static create(properties?: AddressAttributes) {
        return new Address({
            street_number: properties?.street_number ?? null,
            address: properties?.address ?? null,
            address2: properties?.address2 ?? null,
            zipcode: properties?.zipcode ?? null,
            city: properties?.city ?? null,
        })
    }

    toJson() {
        return JSON.parse(JSON.stringify(this))
    }
}
