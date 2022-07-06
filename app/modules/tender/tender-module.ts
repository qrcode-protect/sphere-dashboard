"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 05/07/2022 at 11:01
 * File app/modules/tender/tender-module
 */


import { computed, onMounted, reactive, toRef, toRefs } from "vue";
import { useStore }                                     from "vuex";
import { Nullable }                              from "../../../types/nullable";
import Tender                                    from "@app/modules/tender/tender";
import { number }                                from "@app/vue/utils/helpers";

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

    const updateActions = () => state.actions = actionsList()

    const destroy = () => tender.destroy()
    const toggleActive = () => (tender.available ? tender.block() : tender.unblock()).then((response: any) => {
        tender.available = response.available
        return updateActions();
    })

    onMounted(() => state.actions = actionsList())

    const { fetchInactiveTenders } = useTenders()

    return {
        ...toRefs(state),

        toggleFull: () => state.full = !state.full,

        accept: () => tender.accept().then(() => fetchInactiveTenders()),
        deny  : () => tender.deny().then(() => fetchInactiveTenders()),

        amount          : computed(() => tender.amount ? `${number.pretty(tender.amount)}€` : 'aucun'),
        publishedAt     : computed(() => tender.publishedAt?.format(dateFormat) ?? 'inconnue'),
        expiresAt       : computed(() => tender.expiresAt?.format(dateFormat) ?? 'aucune'),
        beginAt         : computed(() => tender.beginAt?.format(dateFormat) ?? 'inconnue'),
        endAt           : computed(() => tender.endAt?.format(dateFormat) ?? 'inconnue'),
        shortDescription: computed(() => tender.description?.substring(0, 200)),
        isActive        : computed(() => tender.active)
    }

}
