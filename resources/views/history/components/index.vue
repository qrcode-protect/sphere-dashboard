<template>
    <ssf-container name="history" full-flex container>

<!--        <page-title title="historique des conversations"/>-->

        <ssf-row>

            <ssf-col v-for="action in actions" max-width="350" center>

                <router-link :to="{name: action.route}">

                    <ssf-shape center class="box-item flex-column" size="320">

                        <ssf-container full-flex class="mb-4">

                            <ssf-shape center circle class="border border-color-2 color-2" size="150">

                                <ssf-icon :icon="action.icon" size="4x" duotone/>

                            </ssf-shape>


                        </ssf-container>

                        <ssf-container full-flex class="color-1">

                            <ssf-title class="fa-1x5">{{ action.label }}</ssf-title>

                        </ssf-container>


                    </ssf-shape>


                </router-link>

            </ssf-col>

        </ssf-row>

<!--        <ssf-row>

            <ssf-col>

                <h1>DEVIS -> status tabs -> like partners</h1>

            </ssf-col>

            <ssf-col>

                <h1>DEMANDES -> table + action (see city securité)</h1>

            </ssf-col>

        </ssf-row>

        <list-conversations v-if="hasConversations" :conversations="conversations"/>-->

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from "vue";
    import { useMeta }                    from "vue-meta";
    import PageTitle                      from "@/components/commons/partials/page-title.vue";
    import { useConversations }           from "@app/modules/conversation/conversation-module";
    import ListConversations
                                          from "@/views/history/components/includes/list-conversations/list-conversations.vue";

    export default defineComponent({
        name: "example-index",

        components: { ListConversations, PageTitle },

        setup() {
            ////////// init
            useMeta({ title: 'Historique des conversations', })


            const { conversations, hasConversations, fetchAllConversations, } = useConversations()

            onMounted(() => fetchAllConversations())


            return {
                //// conversation module
                conversations,
                hasConversations,
            }
        },

        data: () => ({
            actions: [ {
                label: "Devis",
                route: "history.quotation",
                icon : "file-invoice"
            }, {
                label: "Demandes",
                route: "history.requests",
                icon : "right-left"
            } ]
        })
    })
</script>

<style lang="scss" scoped>

    .history {
        min-height: 100vh;
    }

</style>
