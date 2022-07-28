<template>
    <ssf-container class="rounded cursor-pointer position-relative full-flex" name="article-preview"
                   @click="showEditForm">

        <img :src="article.image" alt="Image article" class="img-fluid rounded"/>

        <ssf-container class="full-absolute bg-color-1" style="z-index: 1; opacity: .5"/>

        <ssf-container class="full-absolute text-white full-flex" style="z-index: 2">
            <ssf-title center>{{ article.title }}</ssf-title>
        </ssf-container>

        <ssf-container class="full-absolute justify-flex align-items-end py-3" style="z-index: 15">

            <ssf-shape center circle class="delete-icon bg-white" size="40" @click.stop.prevent="destroyArticle">

                <ssf-icon icon="trash-alt" light size="1x5"/>

            </ssf-shape>


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
    import { computed, defineComponent } from "vue"
    import Article                       from "@app/modules/_article/article/article";
    import { map }                       from "lodash";
    import { useStore }                  from "vuex";
    import { useRouter }                 from "vue-router";
    import { MainQuestion }              from "@app/vue/utils/swal";
    import { useArticle }                from "@app/modules/_article/utils/articles";

    export default defineComponent({
        name: "article-preview",

        props: {
            article: { type: Article, required: true }
        },

        emits: [ 'deleted' ],

        setup(props, { emit }) {
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

            const { destroy } = useArticle()

            return {
                //// computed
                preview: computed(() => map(props.article.paragraphs, item => item.content).join(' ').substring(0, 500)),

                //// methods
                showEditForm,
                destroyArticle: () => MainQuestion.fire({ html: 'Êtes-vous sûr(e) de vouloir supprimer cet article ? <span class="secondary-item-small">(Cette action est irreversible)</span>' })
                    .then((answer: any) => answer.value ? destroy(props.article).then(() => emit('deleted')) : false)
            }
        }

    })
</script>

<style lang="scss" scoped>

    .article-preview {
        height: 200px;
        overflow: hidden;

        .delete-icon:hover {
            background: var(--color-danger) !important;
            color: white
        }

        &:hover {
            background-color: #ddd;
        }
    }

</style>
