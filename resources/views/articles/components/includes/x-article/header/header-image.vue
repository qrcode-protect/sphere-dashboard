<template>

    <ssf-container class="position-relative" name="article-header-image" not-full>

        <img :src="article.image ?? 'https://picsum.photos/600/500'"
             alt="Article image"
             class="article-img full-absolute m-auto"/>

    </ssf-container>

</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import Article             from "@app/modules/_article/article/article";

    export default defineComponent({
        name: "article-header-image",

        props: {
            article: { type: Article, required: true, },
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

    .ssf__section--article-header-image {
        @media screen and (min-width: 992px) {
            height: 360px;
        }
        height: 200px;
        overflow: hidden;

        .article-img {
            width: 100% !important;
            height: auto !important;
            z-index: 1 !important;
        }
    }

</style>
