<template>

    <ssf-container name="article-date" not-full>

        <ssf-row>

            <ssf-col class="ml-auto col table-container small" no-padding>

                <ssf-row v-for="(item, $idx) in data"
                         :class="{'border-top rounded-top': $idx === 0, 'rounded-bottom': $idx === data.length - 1 }"
                         class="border-bottom border-left border-right p-1 p-md-2">

                    <ssf-col class="align-flex" no-padding size="7">
                        <ssf-title class="mb-0" h6>
                            <span class="small"><span class="small">{{ item.title }}</span></span>
                        </ssf-title>
                    </ssf-col>

                    <ssf-col class="text-right text-uppercase grey-text small align-flex justify-content-end" size="5">
                        <ssf-text>{{ item.value }}</ssf-text>
                    </ssf-col>

                </ssf-row>

            </ssf-col>

        </ssf-row>


    </ssf-container>

</template>

<script lang="ts">
    import { computed, defineComponent, inject } from "vue"
    import Article                               from "@app/modules/_article/article/article";

    export default defineComponent({
        name: "article-header-date",

        props: {
            article: { type: Article, required: true, },
        },

        setup(props) {
            ////////// init
            const $date: any = inject('$date')

            ////////// data

            ////////// computed
            const updatedAt = computed((): string => ($date.moment(props.article.updated ?? null, Article.dateFormat)).format("DD MMMM YYYY"))
            const writer = computed((): string => props.article.writer ?? 'réseau sphère')
            const data = computed(() => [
                {
                    title: "Dernière modification",
                    value: updatedAt.value
                },
                {
                    title: "Auteur",
                    value: writer.value
                }
            ])

            ////////// methods

            return {
                //// computed
                data
            }
        }

    })
</script>

<style lang="scss" scoped>

    .ssf__section--article-date {

        --articleDateTableContainerWidth: 100%;
        --articleDateHeight: 70px;

        @media screen and (min-width: 992px) {
            --articleDateHeight: 90px;
            --articleDateTableContainerWidth: 300px;
        }

        height: var(--articleDateHeight);
        padding: 8px 0;

        .table-container {
            flex: 0 0 var(--articleDateTableContainerWidth) !important;
            max-width: var(--articleDateTableContainerWidth) !important;

            .ssf__title {
                span {
                    font-weight: 600 !important;
                    text-transform: uppercase;
                }
            }
        }
    }

</style>
