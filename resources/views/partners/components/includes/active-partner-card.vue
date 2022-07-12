<template>

    <ssf-container class="position-relative" not-full>

        <card-company-info :full-data="fullData"
                           :icon="icon"
                           :item="partner"
                           :item-keys="itemKeys"
                           data-type="partner"
                           with-action>

            <template #action-content>

                <ul class="pl-0 mb-0">

                    <template v-for="(action, $idx) in actions">

                        <li v-if="fullData || !action.onlyFull"
                            class="action-item p-2 cursor-pointer rounded"
                            @click.prevent="action.method">
                            <ssf-icon :icon="action.icon" fw light/>

                            <span class="ml-2">{{ action.label }}</span>
                        </li>

                    </template>

                </ul>

            </template>


        </card-company-info>

        <ssf-container v-if="!(partner.available === true)" class="blocked-banner full-absolute px-3 rounded">
            <ssf-container class="blocked-banner-bg bg-danger rounded"/>
            <ssf-container class="blocked-banner-text full-flex full-absolute">
                <ssf-text class="text-white text-uppercase font-weight-bold">bloqué</ssf-text>
            </ssf-container>
        </ssf-container>

    </ssf-container>

</template>

<script lang="ts">
    import { useStore }             from "vuex";
    import { defineComponent, ref } from "vue";

    import Partner                                        from "@app/modules/partner/partner";
    import { MainError, MainSuccess, MainWarning, toast } from "@app/vue/utils/swal";

    import CardCompanyInfo      from "@/components/commons/cards/card-company-info.vue";
    import { SweetAlertResult } from "sweetalert2";
    import { AxiosApiError }    from "@sofiakb/axios-api/lib/tools/api";
    import { useRouter }        from "vue-router";

    export default defineComponent({
        name      : "active-partner-card",
        components: { CardCompanyInfo },

        props: {
            partner : { type: Partner, required: true },
            itemKeys: { type: Array, required: true },
            icon    : { type: String, required: false },
            fullData: { type: Boolean, required: false, default: true },
        },

        emits: [ 'destroyed', 'edit:partner' ],

        setup(props, { emit }) {

            ////////// init
            const store = useStore()
            const router = useRouter()

            ////////// methods
            const destroy = () => MainWarning.fire({
                html             : "<span>Êtes-vous sûr(e) de vouloir supprimer ce partenaire ? <br/><span class='small'>(Cette action est irréversible)</span></span>",
                confirmButtonText: "Oui, j'en suis sûr",
                showCancelButton : true,
                cancelButtonText : "J'hésite encore",
                allowOutsideClick: false,
                customClass      : {
                    cancelButton : "rounded py-3 bg-warning",
                    confirmButton: "rounded py-3 bg-danger",
                }
            }).then((answer: SweetAlertResult) => answer.isConfirmed && answer.value
                ? props.partner.destroy()
                    .then(() => {
                        MainSuccess.fire()
                        return emit('destroyed', props.partner.id);
                    })
                    .catch((error: AxiosApiError) => MainError.fire({ text: error.message }))
                : null)

            const forgotPassword = () => (props.partner.forgotPassword(props.partner.email)).then(() => toast("Le lien a bien été envoyé à au partenaire"))
            const openEditModal = () => emit('edit:partner', props.partner)
            const updateActions = () => actions.value = actionsList()
            const toggleActive = () => (props.partner.available === true ? props.partner.block() : props.partner.unblock()).then(() => updateActions())


            ////////// methods
            const actionsList = () => [
                {
                    method  : openEditModal,
                    label   : 'Modifier',
                    icon    : 'pen',
                    onlyFull: true
                },
                {
                    method  : destroy,
                    label   : 'Supprimer',
                    icon    : 'trash-can-list',
                    onlyFull: true
                },
                {
                    method  : toggleActive,
                    label   : props.partner.available === true ? 'Bloquer' : 'Débloquer',
                    icon    : props.partner.available === true ? 'ban' : 'check-double',
                    onlyFull: true
                },
                {
                    method  : forgotPassword,
                    label   : 'Réinitialiser le mot de passe',
                    icon    : 'lock-keyhole',
                    onlyFull: true
                },
                {
                    method  : () => router.push({
                        name  : 'partners.by-number',
                        params: { partnerNumber: props.partner.partnerNumber }
                    }),
                    label   : 'Afficher les détails',
                    icon    : 'eye',
                    onlyFull: false
                },


            ]

            ////////// data
            const actions = ref(actionsList())


            return {
                //// data
                actions,
            }
        },


    })
</script>

<style lang="scss" scoped>

    ul {
        list-style-type: none !important;

        .action-item {
            &:hover {
                background-color: var(--color-1);
                color: var(--color-2)
            }
        }
    }

    .blocked-banner-text, .blocked-banner-bg, .blocked-banner {
        top: inherit;
        height: 35px;
    }

    .blocked-banner {
        overflow: hidden;
    }

    .blocked-banner-bg {
        opacity: .6;
    }

</style>
