"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 05/07/2022 at 12:20
 * File vendor/sofiakb/vue3-framework/utils
 */

export const defined = (value: any, strict = true): boolean => typeof value !== 'undefined' && (strict ? value !== null : true)
export const filled = (value: any): boolean => defined(value) && typeof value === 'string' && value.trim() !== ''
