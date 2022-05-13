'use strict';

/*
 * exudatain-manager-app
 *
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 13/12/2021 at 09:46
 * File vendor/sofiakb/vue3-framework/models/upload
 */

import { each }         from "lodash";
import configAttributes from '@config/api';
import UploadController from "@sofiakb/vue3-framework/http/controllers/upload-controller";

class Upload {

    data;
    object;

    constructor(data: any, object: any, keys: string[]) {
        this.object = object
        this.data = new FormData()
        each(keys || [], key => this.prepare(key))
        this.data.append('upload', JSON.stringify(this.object))
    }

    prepare(field: string) {
        if (!(typeof this.object[field] == 'undefined'))
            this.data.append(field, this.object[field])
    }

    send(url: string, options: any = {}) {
        const controller = new UploadController({ ...configAttributes, ...options.controller?.attributes })
        return controller.post(url, this.data, options)
    }
}

export default Upload