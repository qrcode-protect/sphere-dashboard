<template>
    <ssf-container name="article-content">

        <ssf-row>
            <article-content-title :article="article"/>

            <article-content-paragraph :article="article"/>

        </ssf-row>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import Article             from "@app/modules/_article/article/article";

    import ArticleContentTitle     from "./content-title.vue";
    import ArticleContentParagraph from "./content-paragraph.vue";

    export default defineComponent({
        name      : "article-content",
        components: { ArticleContentParagraph, ArticleContentTitle },

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

</style>
