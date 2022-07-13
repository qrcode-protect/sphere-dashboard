"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 12/07/2022 at 17:45
 * File app/modules/firebase/member/firebase-member-module
 */

import { memberRepository } from "@app/modules/firebase/member/member-repository";
import { useStore }         from "vuex";
import { size }             from "lodash";
import { computed }         from "vue";

export const useFirebaseMember = () => {

    const store = useStore()


    const countInactive = () => memberRepository.whereSnapshot('active', false).snapshots((results: any) => store.commit('member/SET_COUNT_MEMBER_INACTIVE', size(results)))

    const counts = computed(() => store.getters['member/counts'])

    return {
        countInactive,
        inactiveMembersCount : computed(() => counts.value.inactive),
    }

}
