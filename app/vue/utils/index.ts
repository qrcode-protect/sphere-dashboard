interface ScrollOption {
    speed?: number,
    offset: number,
    animate?: boolean,
    value?: any,
    to?: any,
}

export const scroll = (options: ScrollOption = { speed: 1000, offset: 0, animate: true }) => {
    if (options.animate && options.to) {
        const top = ($(options.to)?.position()?.top || 0) - (40 + (options.offset) || 0)
        $('html, body').animate({
            scrollTop: top
        }, options.speed || 1000);
    } else $(window).scrollTop(options.value ? options.to : ($(options.to).offset() || { top: 0 }).top - (40 + options.offset))
};

export const phone = {
    format(value: string, separator: string = '.', country?: string) {
        if (value === null) return value

        if (country)
            value = value.replace(country, 'COUNTRY')
        value = value.replace(/[^0-9\s]/gi, '')

        if (value[0] !== "0")
            value = `0${value}`

        value = value.substr(0, 10).replace(/(.{2})(?!$)/g, `$1${separator}`);
        return !!country ? `${country}${value.substr(1)}` : value
    }
}

export const jsonParse = (text: any) => {

    if ((Array.isArray(text) || text instanceof Object) && !(text instanceof String))
        return text

    try {
        return (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) ? JSON.parse(text) : null
    } catch (e) {
        return null
    }
};

export const combine = (keys: string[], values: any) => {
    let new_array: any = {}, keyCount = keys.length, i;
    // input sanitation
    if (!keys || !values || keys.constructor !== Array || values.constructor !== Array) {
        return false;
    }
    // number of elements does not match
    if (keyCount !== values.length) {
        return false;
    }
    for (i = 0; i < keyCount; i++) {
        new_array[keys[i]] = values[i];
    }
    return new_array;
}


export const renameKey = function (object: any, old: string, key: string) {
    if (old !== key) {
        Object.defineProperty(object, key, Object.getOwnPropertyDescriptor(object, old) || '');
        delete object[old];
    }
    return object
}

export const clone = (object: any) => jsonParse(JSON.stringify(object))

export const key = (item: any) => btoa(encodeURI(`${item.name || item || 'name'}-${item.id || -1}`))