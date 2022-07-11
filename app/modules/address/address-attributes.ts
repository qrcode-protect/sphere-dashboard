"use strict";

/*
 * api
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 09/05/2022 at 11:38
 * File src/Partner/PartnerAttributes
 */

export default interface AddressAttributes {
    id?: string
    street_number: number | null
    address: string | null
    address2: string | null
    zipcode: string | null
    city: string | null
    country?: string
}
