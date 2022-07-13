"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 12/07/2022 at 17:45
 * File app/modules/firebase/partner/firebase-partner-module
 */

import { partnerRepository } from "@app/modules/firebase/partner/partner-repository";
import { useStore }         from "vuex";
import { size }             from "lodash";
import { computed }         from "vue";

export const useFirebasePartner = () => {

    const store = useStore()


    const countInactive = () => partnerRepository.whereSnapshot('active', false).snapshots((results: any) => store.commit('partner/SET_COUNT_PARTNER_INACTIVE', size(results)))

    const counts = computed(() => store.getters['partner/counts'])

    return {
        countInactive,
        inactivePartnersCount: computed(() => counts.value.inactive),
    }

}
