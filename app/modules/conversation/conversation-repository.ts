/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/conversation/conversation-repository
 */

import Conversation from './conversation'

const conversation = new Conversation()

const fetchAllConversation = () => conversation.history()

export const fetchConversationById = (id: string) => conversation.historyById(id)

export {
    fetchAllConversation,
}
