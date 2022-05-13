/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/example/example
 */


import Model from "@sofiakb/vue3-framework/models/model";

import ExampleController from "@app/modules/example/example-controller";

export default class Example extends Model {

    static icon = {
        name: 'test',
        type: 'la'
    }

    attributes = {
        id: { prop: 'id', comment: "Identifiant" },
    }

    casts = {
        created: 'date',
        updated: 'date'
    }

    constructor(options: any = { controller: ExampleController }) {
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }
}

