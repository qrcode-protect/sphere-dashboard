"use strict";

/*
 * vue3-project-default
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 03/06/2022 at 16:56
 * File vendor/sofiakb/vue3-framework/utils
 */

export const defined = (value: any, strict = true): boolean => typeof value !== 'undefined' && (strict ? value !== null : true)
export const filled = (value: any): boolean => defined(value) && typeof value === 'string' && value.trim() !== ''

export const caller = () => {
    try {
        throw new Error();
    } catch (e: any) {
        // matches this function, the caller and the parent
        const allMatches = e.stack.match(/(\w+)@|at (\w+) \(/g);
        // match parent function name
        const parentMatches = allMatches[2].match(/(\w+)@|at (\w+) \(/);
        // return only name
        return parentMatches[1] || parentMatches[2];
    }
}
