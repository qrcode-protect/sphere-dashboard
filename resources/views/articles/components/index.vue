<template>
    <ssf-container name="articles">

        <ssf-row>

            <ssf-col v-for="article in articles" xs="12" md="5" lg="4" xl="3" class="mx-auto my-2">
                <article-preview :article="article"/>
            </ssf-col>

        </ssf-row>

        <router-link :to="{name: 'articles.create'}" class="btn-create-article">
            <ssf-shape size="75"  circle class="bg-color-2 full-flex text-white z-depth-1">
                <ssf-icon icon="layer-plus" size="2x" light/>
            </ssf-shape>
        </router-link>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from "vue";
    import { useMeta }                    from "vue-meta";
    import XArticle                       from "@/views/articles/components/includes/x-article/x-article.vue";
    import { articles, fetchArticles }    from "@app/modules/_article/utils/articles";
    import ArticlePreview                 from "@/views/articles/components/includes/article-preview.vue";

    export default defineComponent({
        name: "articles-index",

        components: { ArticlePreview, XArticle },

        setup() {
            ////////// init
            useMeta({ title: 'Articles', })

            onMounted(async () => await fetchArticles(true))

            ////////// data


            ////////// computed


            ////////// methods


            return {
                //// data

                //// computed
                articles,

                //// methods
            }
        },
    })
</script>

<style lang="scss" scoped>

    .btn-create-article {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }

</style>
