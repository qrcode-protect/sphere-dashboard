/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/article/article
 */


import Model from "@sofiakb/vue3-framework/models/model";

import ArticleController from "@app/modules/_article/article/article-controller";
import { Moment }        from "moment";
import ArticleParagraph  from "@app/modules/_article/article-paragraph/article-paragraph";
import { map }           from "lodash";

export default class Article extends Model {

    id: string | null = null
    writer: string | null = null
    image: string | null = null
    themes: string[] | null = null
    title: string | null = null
    paragraphs: ArticleParagraph[] | null = null
    networks: string[] | null = null
    created: Moment | null = null
    updated: Moment | null = null

    static icon = {
        name: 'test',
        type: 'la'
    }

    attributes = {
        id        : { prop: 'id', comment: "Identifiant" },
        writer    : { prop: 'writer' },
        image     : { prop: 'image' },
        themes    : { prop: 'themes' },
        title     : { prop: 'title' },
        paragraphs: { prop: 'paragraphs' },
        networks  : { prop: 'networks' },
        created   : { prop: 'createdAt' },
        updated   : { prop: 'updatedAt' },
    }

    casts = {
        created   : 'firebaseDate',
        updated   : 'firebaseDate',
        paragraphs: this.castParagraph
    }

    castParagraph(value: any) {
        return map(value, item => (new ArticleParagraph()).__setItemAttributes({
                content: item.content,
                title  : item.title,
                id     : item.id
            })
        )
    }

    constructor(options: any = { controller: ArticleController }) {
        if (!options.controller)
            options.controller = ArticleController
        super(options);
        this.model = eval(this.__resolve.model(options.name || this.constructor.name))
    }
}

