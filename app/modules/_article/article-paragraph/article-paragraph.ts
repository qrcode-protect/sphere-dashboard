/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/article/article
 */


import Model from "@sofiakb/vue3-framework/models/model";

import ArticleController from "@app/modules/_article/article/article-controller";

export default class ArticleParagraph extends Model {

    id: string | null = null
    title: string | null = null
    content: string | null = null
    rank: number | null = null

    static icon = {
        name: 'test',
        type: 'la'
    }

    attributes = {
        id     : { prop: 'id', comment: "Identifiant" },
        title  : { prop: 'title' },
        content: { prop: 'content' },
        rank   : { prop: 'rank' },
    }

    casts = {
        created: 'firebaseDate',
        updated: 'firebaseDate'
    }

    constructor(options: any = { controller: ArticleController }) {
        if (!options.controller)
            options.controller = ArticleController
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }
}

