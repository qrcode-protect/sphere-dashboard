"use strict";

/*
 * partners
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 03/06/2022 at 15:37
 * File src/types/class-constructor
 */

export interface ClassConstructor<T> {
    new(attributes?: any): T;
}
