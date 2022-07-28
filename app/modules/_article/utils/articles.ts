"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 24/05/2022 at 09:55
 * File app/modules/_article/utils/articles
 */

import store              from "@app/vue/store";
import { computed }       from "@vue/reactivity";
import Article            from "@app/modules/_article/article/article";
import { destroyArticle } from "@app/modules/_article/article/article-repository";

export const articlesGetter = 'article/articles'
export const articleGetter = 'article/article'
export const articles = computed(() => store.getters[articlesGetter])
export const currentArticle = computed(() => store.getters[articleGetter])

export const fetchArticles = (force= false) => {
    if (force === true || articles.value === null) {
        return store.dispatch('article/fetchAll');
    }
    return null
}


export const useArticle = () => {


    return {
        destroy: (article: Article) => destroyArticle(article)
    }

}
