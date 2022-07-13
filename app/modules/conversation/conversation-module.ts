"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 05/07/2022 at 11:01
 * File app/modules/conversation/conversation-module
 */


import { computed, reactive, toRefs } from "vue";
import { useStore }                   from "vuex";
import { Nullable }                   from "../../../types/nullable";
import Conversation                   from "@app/modules/conversation/conversation";

export const useConversations = () => {

    const store = useStore()

    const state = reactive([])

    const conversations = computed((): Nullable<Conversation[]> => store.getters['conversation/conversations'])

    return {
        ...toRefs(state),
        conversations,
        conversation         : computed((): Nullable<Conversation[]> => store.getters['conversation/conversation']),
        hasConversations     : computed(() => conversations.value && conversations.value.length > 0),
        fetchAllConversations: () => store.dispatch('conversation/fetchAll'),
        selectConversation   : (conversation: Conversation) => store.commit('conversation/SET_CONVERSATION', conversation)
    }

}

interface ActionList {
    method: Function,
    label: string,
    icon: string
}

export const useConversation = (conversation: Conversation, dateFormat = 'DD/MM/YYYY') => {

    // const router = useRouter()
    //
    // const state = reactive({
    //     full   : false,
    //     actions: [] as ActionList[],
    // })
    //
    // const actionsList = (): ActionList[] =>
    //     [
    //         {
    //             method: () => router.push({ name: 'conversations.edit', params: { id: conversation.id } }),
    //             label : 'Modifier',
    //             icon  : 'pen',
    //         },
    //         {
    //             method: () => conversation.file && typeof conversation.file === 'string' && conversation.file.trim() !== '' ? window.open(conversation.file, '_blank') : null,
    //             label : 'Ouvrir le document',
    //             icon  : 'file-pdf'
    //         },
    //         {
    //             method: destroy,
    //             label : 'Supprimer',
    //             icon  : 'trash-can-list'
    //         },
    //         {
    //             method: toggleActive,
    //             label : conversation.available ? 'Bloquer' : 'Débloquer',
    //             icon  : conversation.available ? 'ban' : 'check-double',
    //         },
    //         /*{
    //             method: forgotPassword,
    //             label : 'Réinitialiser le mot de passe',
    //             icon  : 'lock-keyhole',
    //         },*/
    //     ]
    //
    // const { fetchInactiveConversations, fetchActiveConversations } = useConversations()
    //
    // const updateActions = () => state.actions = actionsList()
    //
    // const destroy = () => conversation.destroy().then(() => conversation.active ? fetchActiveConversations() : fetchInactiveConversations())
    // const toggleActive = () => (conversation.available ? conversation.block() : conversation.unblock()).then((response: any) => {
    //     conversation.available = response.available
    //     return updateActions();
    // })
    //
    // onMounted(() => state.actions = actionsList())
    //
    //
    // return {
    //     ...toRefs(state),
    //
    //     toggleFull: () => state.full = !state.full,
    //
    //     accept: () => conversation.accept().then(() => fetchInactiveConversations()),
    //     deny  : () => conversation.deny().then(() => fetchInactiveConversations()),
    //
    //     amount          : computed(() => conversation.amount ? `${number.pretty(conversation.amount)}€` : 'aucun'),
    //     publishedAt     : computed(() => conversation.publishedAt?.format(dateFormat) ?? 'inconnue'),
    //     expiresAt       : computed(() => conversation.expiresAt?.format(dateFormat) ?? 'aucune'),
    //     beginAt         : computed(() => conversation.beginAt?.format(dateFormat) ?? 'aucune'),
    //     endAt           : computed(() => conversation.endAt?.format(dateFormat) ?? 'aucune'),
    //     shortDescription: computed(() => conversation.description?.substring(0, 200)),
    //     isActive        : computed(() => conversation.active)
    // }

}
