<template>

    <ssf-container name="article-themes" not-full>

        <ssf-row>

            <ssf-col class="ml-auto table-container small" no-padding size="12">

                <ssf-row v-for="(item, $idx) in themes" class="border-bottom p-1 p-md-2">

                    <ssf-col class="align-flex" no-padding size="7">
                        <ssf-title class="mb-0" h6>
                            <span class="small"><span class="small">{{ item }}</span></span>
                        </ssf-title>
                    </ssf-col>

                </ssf-row>

            </ssf-col>

        </ssf-row>


    </ssf-container>

</template>

<script lang="ts">
    import { computed, defineComponent } from "vue"
    import Article                       from "@app/modules/_article/article/article";

    export default defineComponent({
        name: "article-header-themes",

        props: {
            article: { type: Article, required: true, },
        },

        setup(props) {
            ////////// init

            ////////// data

            ////////// computed
            const themes = computed((): string[] => {
                const _themes = (props.article.themes ?? []).filter(item => item && item.trim() !== '')
                return _themes.length ? _themes : [ 'Thème non défini' ];
            })


            ////////// methods

            return {
                //// computed
                themes
            }
        }

    })
</script>

<style lang="scss" scoped>

    .ssf__section--article-themes {
        padding: 8px 0;

        .table-container {
            .ssf__title {
                span {
                    font-weight: 600 !important;
                    text-transform: uppercase;
                }
            }
        }
    }

</style>
