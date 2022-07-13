<template>
    <ssf-container container name="list-conversations">

        <ssf-row v-for="_conversation in conversations" class="cursor-pointer"
                 @click="selectConversation(_conversation)">

            <ssf-col class="box-item" size="12">

                <ssf-container relative>

                    <img v-if="_conversation.partner?.avatar && _conversation.partner?.avatar.trim() !== ''"
                         :src="_conversation.partner?.avatar"
                         alt=""
                         class="left-absolute">

                    <img v-if="_conversation.member?.avatar && _conversation.member?.avatar.trim() !== ''"
                         :src="_conversation.member?.avatar"
                         alt=""
                         class="left-absolute">

                    <ssf-row>

                        <ssf-col class="company-container full-flex flex-column" size="5">

                            {{ _conversation.partner?.companyName }}

                        </ssf-col>

                        <ssf-col class="full-flex flex-column" size="2">
                            <ssf-icon class="my-2" icon="right-left"/>
                            {{ _conversation.date.format('DD/MM/YYYY') }}
                        </ssf-col>

                        <ssf-col class="company-container full-flex flex-column" size="5">

                            {{ _conversation.member?.companyName }}

                        </ssf-col>

                    </ssf-row>

                </ssf-container>

            </ssf-col>

        </ssf-row>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, PropType } from "vue"
    import Conversation                  from "@app/modules/conversation/conversation";
    import { key }                       from "@app/vue/utils";
    import { useConversations }          from "@app/modules/conversation/conversation-module";
    import { useRouter }                 from "vue-router";

    export default defineComponent({
        name: "list-conversations",

        props: {
            conversations: { type: Array as PropType<Conversation[]>, required: true }
        },

        setup() {
            ////////// init

            const router = useRouter()

            const { selectConversation, conversation } = useConversations()

            return {
                key: (conversation: Conversation) => key({ id: conversation.id, name: conversation.id }),

                //// conversation module
                selectConversation: (conversation: Conversation) => router.push({
                    name  : 'history.messages',
                    params: { id: conversation.id }
                }),
                conversation
            }
        }
    })
</script>

<style lang="scss" scoped>

    .list-conversations {
        .company-container {
            text-align: center;
            text-transform: uppercase;
            padding: 1em 0;
        }
    }

</style>
