<template>
    <ssf-container name="articles-edit">

        <page-title title="modifier un article"/>

        <article-form v-if="article"
                      :article="article"
                      :error="error"
                      :errors="errors"
                      edition
                      @has-error="event => error = event"/>

        <!--        <ssf-row>

                    <ssf-col size="6">

                        <ssf-row v-if="error" class="mb-3">

                            <ssf-col class="form-fallback-container align-flex text-danger"
                                     size="12">

                                <ssf-icon class="mr-2"
                                          icon="times-circle"
                                          light
                                          size="1x5"/>

                                <span v-html="error"></span>
                            </ssf-col>

                        </ssf-row>

                        <form id="formCreateArticle" novalidate @submit.prevent="save">

                            <ssf-container class="py-3">

                                <ssf-title center h6>Informations concernant l'article</ssf-title>


                                <ssf-row>
                                    <qrcp-input :errors="errors"
                                                :option-items="networks"
                                                :value="article.networks"
                                                form-group-class="mb-0"
                                                icon="network-wired"
                                                label="Réseau"
                                                multiple
                                                name="networks"
                                                option-field="id"
                                                option-label="name"
                                                row
                                                select
                                                @update:value="(event) => article.networks = event"/>

                                    <ssf-row class="mb-3">
                                        <ssf-col size="12">
                                            <ssf-text class="secondary-item-small">Par défaut, il sera disponible pour tous les
                                                réseaux
                                            </ssf-text>
                                        </ssf-col>
                                    </ssf-row>
                                </ssf-row>

                                <ssf-row>

                                    <qrcp-input :errors="errors"
                                                :value="article.writer"
                                                form-group-class="mb-0"
                                                icon="user"
                                                label="Auteur"
                                                name="writer"
                                                row
                                                @update:value="(event) => article.writer = event"/>
                                    <ssf-row class="mb-3">
                                        <ssf-col size="12">
                                            <ssf-text class="secondary-item-small">Par défaut, ce sera "Réseau Sphère"
                                            </ssf-text>
                                        </ssf-col>
                                    </ssf-row>
                                </ssf-row>

                                <qrcp-input :errors="errors"
                                            :value="article.image"
                                            icon="file-image"
                                            label="Image de l'article"
                                            mimes="jpg, jpeg, png, gif"
                                            name="articleImage"
                                            required
                                            row
                                            type="file"
                                            @change="onFileChange"/>

                                <qrcp-input :errors="errors"
                                            :value="article.title"
                                            icon="font"
                                            label="Titre de l'article"
                                            name="title"
                                            required
                                            row
                                            @update:value="(event) => article.title = event"/>

                            </ssf-container>

                            <hr class="w-50 bg-color-2 border-strong my-3">

                            <ssf-container class="py-3">

                                <ssf-title center h6>Thèmes de l'article</ssf-title>

                                <ssf-row>

                                    <qrcp-input v-for="(theme, $idx) in article.themes"
                                                :errors="errors"
                                                :label="`Thème n°${$idx + 1}`"
                                                :name="`article-theme-${$idx}`"
                                                :value="article.themes[$idx]"
                                                icon="affiliatetheme"
                                                row
                                                @update:value="(event) => article.themes[$idx] = event"/>

                                    <ssf-row v-if="article.themes?.length < 6">

                                        <ssf-col class="text-center" size="12" @click="addTheme">
                                            <ssf-icon icon="plus-circle"/>
                                        </ssf-col>

                                    </ssf-row>

                                </ssf-row>


                            </ssf-container>

                            <hr class="w-50 bg-color-2 border-strong my-3">

                            <ssf-container class="py-3">

                                <ssf-title center h6>Paragraphes</ssf-title>

                                <ssf-row v-for="(paragraph, $idx) in article.paragraphs">

                                    <qrcp-input
                                        :errors="errors"
                                        :label="`Titre du paragraphe n°${$idx + 1}`"
                                        :name="`article-paragraph-title-${$idx}`"
                                        :value="paragraph.title"
                                        icon="heading"
                                        row
                                        @update:value="(event) => paragraph.title = event"/>


                                    <qrcp-input
                                        :errors="errors"
                                        :name="`article-paragraph-content-${$idx}`"
                                        :placeholder="`Paragraphe n°${$idx + 1}`"
                                        :value="paragraph.content"
                                        icon="heading"
                                        row
                                        textarea
                                        @update:value="(event) => paragraph.content = event"/>


                                </ssf-row>

                                <ssf-row>

                                    <ssf-col class="text-center" size="12" @click="addParagraph">
                                        <ssf-icon icon="plus-circle"/>
                                    </ssf-col>

                                </ssf-row>

                            </ssf-container>

                            <ssf-row>

                                <ssf-col class="text-center" size="12">

                                    <button class="btn bg-color-2">
                                        Enregistrer
                                        <ssf-icon icon="floppy-disk"/>
                                    </button>

                                </ssf-col>

                            </ssf-row>

                        </form>

                    </ssf-col>

                    <ssf-col size="6">

                        <x-article :article="article"/>

                    </ssf-col>

                </ssf-row>-->

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from "vue";
    import { useMeta }                         from "vue-meta";
    import XArticle                            from "./includes/x-article/x-article.vue";
    import Article                             from "@app/modules/_article/article/article";
    import QrcpInput                           from "@/components/commons/qrcp-input.vue";
    import PageTitle                           from "@/components/commons/partials/page-title.vue";
    import ArticleForm                         from "@/views/articles/components/article-form.vue";
    import { useRouter }                       from "vue-router";
    import { useStore }                        from "vuex";
    import { articleGetter }                   from "@app/modules/_article/utils/articles";

    export default defineComponent({
        name: "articles-edit",

        components: { ArticleForm, PageTitle, QrcpInput, XArticle },

        setup() {
            ////////// init
            useMeta({ title: 'Articles - Modifier', })
            const router = useRouter()
            const store = useStore()


            ////////// data
            const article = ref<Article | null>(null)
            const errors = ref(null)


            onMounted(() => {

                const currentArticle = store.getters[articleGetter]

                if (currentArticle === null) {
                    return router.back()
                }

                article.value = currentArticle
            })

            ////////// computed

            return {
                //// data
                article,
                errors,
            }
        },

        data: () => ({
            loading: false,
            error  : <string | null>null
        }),

        methods: {
            /*onFileChange(e: any) {
                let event = (e || window.event);
                const reader = new FileReader()
                reader.readAsDataURL(event.target.files[0])
                // @ts-ignore
                reader.onload = () => this.article.image = reader.result;
            },

            valid() {
                return filled(this.article.title) && filled(this.article.image)
            },

            save() {

                if (this.loading)
                    return false

                this.loading = true
                this.error = null

                // @ts-ignore
                this.article.themes = filter(this.article.themes, item => item && item.trim() !== '')
                // @ts-ignore
                this.article.paragraphs = filter(this.article.paragraphs, item => item && filled(item.title) && filled(item.content))


                if (!this.valid()) {
                    this.error = "Merci de remplir les champs marqués d'un *"
                    return true
                }

                if (!filled(this.article.writer))
                    this.article.writer = "réseau sphère"

                const method = (this.currentArticle ? this.article.update(this.currentArticle.id) : this.article.store())

                console.log(this.currentArticle)

                method.then(() => {
                    MainSuccess.fire({ text: `L'article a bien été ${this.currentArticle ? "modifié" : "ajouté"}` });
                    if (this.currentArticle) {
                        // @ts-ignore
                        this.$store.commit('article/SET_ARTICLE', null)
                        this.$router.push({ name: 'articles.index' })
                    }
                })
                    .catch((error) => {
                        this.error = error.message
                    })
                    .finally(() => {
                        if (this.article.themes?.length === 0)
                            this.article.themes = [ '' ]
                        if (this.article.paragraphs?.length === 0)
                            this.article.paragraphs = [ new ArticleParagraph() ]
                        return this.loading = false;
                    })
            }*/
        }
    })
</script>

<style lang="scss" scoped>

    :deep(.ssf-value-item.selected) {
        background: var(--color-2) !important;
        color: var(--color-1) !important;
    }

</style>
