<template>
    <ssf-container class="rounded cursor-pointer position-relative full-flex" name="article-preview" @click="showEditForm">

        <img :src="article.image" alt="Image article" class="img-fluid rounded"/>

        <ssf-container  style="z-index: 1; opacity: .5" class="full-absolute bg-color-1"/>

        <ssf-container  style="z-index: 2" class="full-absolute text-white full-flex">
            <ssf-title center>{{ article.title }}</ssf-title>
        </ssf-container>

<!--        <ssf-row class="py-3 h-100">

            <ssf-col class="h-100" size="3">
                <img :src="article.image" alt="Image article" class="img-fluid rounded"/>
            </ssf-col>


            <ssf-col class="h-100" size="9">

                <ssf-container>
                    <ssf-title center>{{ article.title }}</ssf-title>
                </ssf-container>

                <ssf-container>
                    <p class="grey-text">{{ preview }} (...)</p>
                </ssf-container>

            </ssf-col>

        </ssf-row>-->



    </ssf-container>


</template>

<script lang="ts">
    import { computed, defineComponent, ref } from "vue"
    import Article        from "@app/modules/_article/article/article";
    import { clone, map } from "lodash";
    import { useStore }   from "vuex";
    import { useRouter }                 from "vue-router";

    export default defineComponent({
        name: "article-preview",

        props: {
            article: { type: Article, required: true }
        },

        setup(props) {
            ////////// init
            const store = useStore()
            const router = useRouter()

            ////////// data

            ////////// computed

            ////////// methods
            const showEditForm = () => {
                store.commit('article/SET_ARTICLE', props.article)
                router.push({ name: 'articles.edit' })
            }

            return {
                //// computed
                preview: computed(() => map(props.article.paragraphs, item => item.content).join(' ').substring(0, 500)),

                //// methods
                showEditForm
            }
        }

    })
</script>

<style lang="scss" scoped>

    .article-preview {
        height: 200px;
        overflow: hidden;

        :hover {
            background-color: #ddd;
        }
    }

</style>
