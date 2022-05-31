<template>

    <article>

        <ssf-container container name="article-container">

            <article-header :article="article"/>

            <article-content :article="article"/>

        </ssf-container>

    </article>

</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import Article             from "@app/modules/_article/article/article";

    import ArticleHeader  from "./header/header.vue";
    import ArticleContent from "./content/content.vue";

    export default defineComponent({
        name: "x-article",

        components: { ArticleContent, ArticleHeader },


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

    .container {
        @media (min-width: 1200px) {
            max-width: 920px;
        }
    }

    :deep(.article-input) {
        border: none !important;
    }

</style>
