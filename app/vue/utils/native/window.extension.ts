"use strict";

/*
 * sphere-partners
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 09/06/2022 at 11:05
 * File src/core/types/window.extension
 */


interface Window {
    listenResize(callback: any) : void,
    stopResize(callback: any) : void,
}


Window.prototype.listenResize = function (callback: any) {
    window.addEventListener('resize', callback)
}


Window.prototype.stopResize = function (callback: any) {
    window.removeEventListener('resize', callback)
}
