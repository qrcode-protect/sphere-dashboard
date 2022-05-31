<template>

    <ssf-container name="article-content-title">

        <ssf-title h2 center>{{ article.title }}</ssf-title>

    </ssf-container>

</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import Article             from "@app/modules/_article/article/article";

    export default defineComponent({
        name: "article-content-title",

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

    .ssf__section--article-content-title {
        .ssf__title {
            font-weight: 500;
        }
    }

</style>
