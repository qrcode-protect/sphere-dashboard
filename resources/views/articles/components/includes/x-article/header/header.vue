<template>

    <ssf-container class="position-relative" name="article-header">

        <article-header-author :writer="article.writer"
                               class="position-absolute article-header-writer-container d-none d-md-block"/>
        <article-header-date :article="article" class="d-none d-md-block"/>

        <article-header-image :article="article"/>

        <ssf-container class="full-absolute article-header-theme-container my-auto align-items-end d-none d-md-flex"
                       not-full>
            <ssf-container class="theme-content p-2 p-md-4 my-2 mt-md-0 mx-auto mr-md-0" not-full>
                <article-header-themes :article="article"/>
            </ssf-container>
        </ssf-container>

    </ssf-container>

</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import Article             from "@app/modules/_article/article/article";

    import ArticleHeaderImage  from "./header-image.vue";
    import ArticleHeaderAuthor from "./header-author.vue";
    import ArticleHeaderDate   from "./header-date.vue";
    import ArticleHeaderThemes from "./header-themes.vue";

    export default defineComponent({
        name: "article-header",

        components: { ArticleHeaderThemes, ArticleHeaderDate, ArticleHeaderAuthor, ArticleHeaderImage },

        props: {
            article: { type: Article, required: true }
        },

        setup() {
            ////////// init

            ////////// data

            ////////// computed

            ////////// methods
        }

    })
</script>

<style lang="scss" scoped>

    .ssf__section--article-header {

        --articleHeaderHeight: auto;
        --articleHeaderThemeContainer: 50px;
        --articleHeaderWriterContainer: 50px;
        --articleThemeContentMarginBottom: 0 !important;
        --articleThemeContentWidth: 100% !important;
        --articleThemeContentBackground: transparent;
        --articleThemeContentColor: var(--color-1);
        --leftAbsolutePosition: 0 !important;
        --articleHeaderThemeContainerPosition: absolute !important;


        @media screen and (min-width: 992px) {
            --articleHeaderHeight: 470px;
            --articleHeaderThemeContainer: 90px;
            --articleHeaderWriterContainer: 48px;
            --articleThemeContentMarginBottom: 60px !important;
            --articleThemeContentWidth: 400px !important;
            --leftAbsolutePosition: 30px !important;
            --articleHeaderThemeContainerPosition: absolute !important;
            --articleThemeContentBackground: rgba(0, 0, 0, .5);
            --articleThemeContentColor: white;
        }


        height: var(--articleHeaderHeight) !important;
        overflow: hidden;


        .article-header-writer-container {
            top: var(--articleHeaderWriterContainer) !important;
            left: var(--leftAbsolutePosition) !important;
            z-index: 1050;
        }

        .article-header-theme-container {
            position: var(--articleHeaderThemeContainerPosition) !important;
            z-index: 1050;

            .theme-content {
                margin-left: var(--leftAbsolutePosition) !important;
                margin-bottom: var(--articleThemeContentMarginBottom) !important;
                width: var(--articleThemeContentWidth) !important;
                color: var(--articleThemeContentColor) !important;
                background: var(--articleThemeContentBackground) !important;
            }
        }
    }

</style>
