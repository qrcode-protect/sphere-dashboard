"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 05/07/2022 at 11:01
 * File app/modules/tender/tender-module
 */


import { computed, onMounted, reactive, toRefs }  from "vue";
import { useStore }                               from "vuex";
import { Nullable }                               from "../../../types/nullable";
import Tender                                     from "@app/modules/tender/tender";
import { number }                                 from "@app/vue/utils/helpers";
import { fetchAllPremiumMembers, premiumByEmail } from "@app/modules/member/member-repository";
import Member                                     from "@app/modules/member/member";

export const useTenders = () => {

    const store = useStore()

    const state = reactive([])

    const tenders = computed((): Nullable<Tender[]> => store.getters['tender/tenders'])

    return {
        ...toRefs(state),
        tenders,
        hasTenders          : computed(() => tenders.value && tenders.value.length > 0),
        fetchAllTenders     : () => store.dispatch('tender/fetchAll'),
        fetchActiveTenders  : () => store.dispatch('tender/fetchActive'),
        fetchInactiveTenders: () => store.dispatch('tender/fetchInactive'),
    }

}

interface ActionList {
    method: Function,
    label: string,
    icon: string
}

export const useTender = (tender: Tender, dateFormat = 'DD/MM/YYYY') => {

    const state = reactive({
        full   : false,
        actions: [] as ActionList[],
    })

    const actionsList = (): ActionList[] =>
        [
            /*{
                method: openEditModal,
                label : 'Modifier',
                icon  : 'pen',
            },*/
            {
                method: destroy,
                label : 'Supprimer',
                icon  : 'trash-can-list'
            },
            {
                method: toggleActive,
                label : tender.available ? 'Bloquer' : 'Débloquer',
                icon  : tender.available ? 'ban' : 'check-double',
            },
            /*{
                method: forgotPassword,
                label : 'Réinitialiser le mot de passe',
                icon  : 'lock-keyhole',
            },*/
        ]

    const { fetchInactiveTenders, fetchActiveTenders } = useTenders()

    const updateActions = () => state.actions = actionsList()

    const destroy = () => tender.destroy().then(() => tender.active ? fetchActiveTenders() : fetchInactiveTenders())
    const toggleActive = () => (tender.available ? tender.block() : tender.unblock()).then((response: any) => {
        tender.available = response.available
        return updateActions();
    })

    onMounted(() => state.actions = actionsList())


    return {
        ...toRefs(state),

        toggleFull: () => state.full = !state.full,

        accept: () => tender.accept().then(() => fetchInactiveTenders()),
        deny  : () => tender.deny().then(() => fetchInactiveTenders()),

        amount          : computed(() => tender.amount ? `${number.pretty(tender.amount)}€` : 'aucun'),
        publishedAt     : computed(() => tender.publishedAt?.format(dateFormat) ?? 'inconnue'),
        expiresAt       : computed(() => tender.expiresAt?.format(dateFormat) ?? 'aucune'),
        beginAt         : computed(() => tender.beginAt?.format(dateFormat) ?? 'aucune'),
        endAt           : computed(() => tender.endAt?.format(dateFormat) ?? 'aucune'),
        shortDescription: computed(() => tender.description?.substring(0, 200)),
        isActive        : computed(() => tender.active)
    }

}


interface TenderFormState {
    tender: Tender,
    members: Nullable<Member[]>
}

export const useTenderForm = () => {

    const store = useStore()

    const state = reactive<TenderFormState>({
        tender : Tender.create(),
        members: null
    })

    const fetchPremiumMembersByEmail = (email: string) => premiumByEmail(email).then((members: unknown) => state.members = <Member[]>members)
    const fetchPremiumMembers = () => fetchAllPremiumMembers().then((members: unknown) => state.members = <Member[]>members)
    const storeTender = () => store.dispatch('tender/store', { tender: state.tender }).then(() => state.tender = Tender.create())

    return {
        ...toRefs(state),
        fetchPremiumMembersByEmail,
        fetchPremiumMembers,
        storeTender
    }

}
