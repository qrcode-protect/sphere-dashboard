/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/article/article-repository
 */

import Article from './article'

const article = new Article()

const fetchAllArticles = () => article.all()
export const destroyArticle = (article: Article) => article.destroy(article.id)

export {
    fetchAllArticles,
}
