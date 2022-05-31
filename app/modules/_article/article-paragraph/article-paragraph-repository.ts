/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/article/article-repository
 */

import ArticleParagraph from './article-paragraph'

const article = new ArticleParagraph()

const fetchAllArticles = () => article.all()

export {
    fetchAllArticles,
}
