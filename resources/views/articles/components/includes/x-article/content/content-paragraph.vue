<template>

    <ssf-container name="article-content-paragraph">


        <ssf-container v-for="paragraph in article.paragraphs">

            <ssf-title v-if="paragraph.title" center h5>
                {{ paragraph.title }}
            </ssf-title>

            <blockquote class="article-paragraph">
                <p class="m-0">{{ paragraph.content }}</p>
            </blockquote>

        </ssf-container>

    </ssf-container>

</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import Article             from "@app/modules/_article/article/article";

    export default defineComponent({
        name: "article-content-paragraph",

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

    .ssf__section--article-content-paragraph {
        .ssf__title {
            font-weight: 500;
        }

        /* -- create the quotation marks -- */

        blockquote.article-paragraph {
            position: relative;
            //text-align: center;
            padding: 1rem 1.8rem;
            //width: 80%;  /* create space for the quotes */
            //margin: 1rem auto 2rem;

            /*&:before,
            &:after {
                font-family: "Font Awesome 6 Pro", sans-serif;
                position: absolute;
                font-size: 20px;
            }

            &:before {
                content: "\f10d";
                top: -12px;
                margin-right: -20px;
                right: 100%;
            }

            &:after {
                content: "\f10e";
                margin-left: -20px;
                left: 100%;
                top: auto;
                bottom: -20px;
            }*/

        }


    }

</style>
