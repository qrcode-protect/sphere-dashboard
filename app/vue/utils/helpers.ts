/**
 * File app/js:*
 * Ce fichier contient les outils utiles
 * au bon fonctionnement de l'app
 *
 * @author sofianeakbly
 **/

import { jsonParse } from "./index";

import { filter } from 'lodash'

interface HelpersMethods {
    clone: any,
    equals: any,
    loading: any,
    number: any,
    window: any
}


const helpers: HelpersMethods = {
    clone: (object: any) => jsonParse(JSON.stringify(object)),

    equals: (obj1: any, obj2: any) => Object.keys(obj1).length === Object.keys(obj2).length && filter(Object.keys(obj2).map((key) => obj1[key] === obj2[key]), (value: any) => !value).length === 0,

    loading: (loading = true) => (require('@app/vue/store').default).dispatch('loading', loading),

    number: {
        twoDigits: (number: string | number) => typeof number === 'string' ? (parseInt(number) < 10 ? `0${parseInt(number)}` : parseInt(number)) : (number < 10 ? `0${number}` : number),
        pretty   : (x?: string | number, separator = ' ') => x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator) : '?'
    },

    window: {
        isSmall: (size = 767) => window.innerWidth < size,
        width  : () => window.innerWidth,
        height : () => window.innerHeight
    },
};

export const clone = helpers.clone
export const loading = helpers.loading
export const equals = helpers.equals
export const number = helpers.number
export const xWindow = helpers.window


export default helpers

