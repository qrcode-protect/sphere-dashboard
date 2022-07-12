"use strict";

/*
 * partners
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 03/06/2022 at 15:52
 * File src/modules/chat/utils/messages
 */

/*import { computed } from "vue";
import store        from "@src/core/store";
import Message      from "@src/modules/chat/message/message";

export const utils = computed({
    get: (): Message[] | null => store.getters['message/messages'],
    set: value => store.commit('message/SET_MESSAGES', value),
})

export const message = computed({
    get: (): Message | null => store.getters['message/message'],
    set: value => store.commit('message/SET_MESSAGE', value),
})

export const selectMessage = (_message: Message) => message.value = _message*/

import { computed, reactive, ref, toRefs } from "vue";
import { userRepository }                  from "@app/modules/firebase/user/user-repository";
import { Nullable }                        from "../../../../types/nullable";
import { memberCount, memberPremiumCount } from "@app/modules/firebase/member/utils";
import { partnerCount }                    from "@app/modules/firebase/partner/utils";

export const useFirebaseUser = () => {
    const state = reactive({
        userCount   : ref<Nullable<number>>(null),
        memberCount : ref<Nullable<number>>(null),
        memberPremiumCount : ref<Nullable<number>>(null),
        partnerCount: ref<Nullable<number>>(null),
    })

    const countUser = async () => state.userCount = await userRepository.count();
    const countMember = async () => state.memberCount = await memberCount();
    const countPremiumMember = async () => state.memberPremiumCount = await memberPremiumCount();
    const countPartner = async () => state.partnerCount = await partnerCount();

    const countAll = async () => {
        await countUser();
        await countMember();
        await countPartner();
        await countPremiumMember();
    }

    const countItems = computed(() => ([
        { count: state.userCount, label: "Utilisateurs inscrits" },
        { count: state.memberCount, label: "Adhérents inscrits" },
        { count: state.memberPremiumCount, label: "Adhérents premiums" },
        { count: state.partnerCount, label: "Fournisseurs inscrits" },
    ]))

    return {
        ...toRefs(state),
        countItems,
        countAll,
    }
}
