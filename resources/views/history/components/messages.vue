<template>
    <ssf-container name="history-messages">

        <under-construction/>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from "vue";
    import { useMeta }                    from "vue-meta";
    import PageTitle                      from "@/components/commons/partials/page-title.vue";
    import { useConversations }           from "@app/modules/conversation/conversation-module";
    import ListConversations
                                          from "@/views/history/components/includes/list-conversations/list-conversations.vue";
    import UnderConstruction              from "@/components/commons/under-construction.vue";
    import { useRoute, useRouter }        from "vue-router";

    export default defineComponent({
        name: "history-messages-index",

        components: { UnderConstruction, ListConversations, PageTitle },

        setup() {
            ////////// init
            useMeta({ title: 'Messages | Historique des conversations', })
            const route = useRoute()
            const router = useRouter()


            const { conversations, hasConversations, fetchConversationById, } = useConversations()

            onMounted(() => !route.params.id ? router.push({ name: 'history.index' }) : fetchConversationById(route.params.id as string))


            return {
                //// conversation module
                conversations,
                hasConversations
            }
        },
    })
</script>

<style lang="scss" scoped>

</style>
