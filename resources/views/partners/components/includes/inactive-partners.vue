<template>

    <ssf-container class="position-relative" name="inactive-partners">

        <ssf-container v-if="partners && partners.length > 0" class="inactive-partners-container">

            <ssf-row>

                <card-company-info v-for="partner in partners"
                                   :icon="Partner.icon.name"
                                   :item="partner"
                                   :item-keys="itemKeys"
                                   data-type="partner"
                                   footer-class="bg-white border-0">

                    <template #footer>

                        <ssf-container class="text-right">

                            <button
                                class="btn text-danger rounded text-white border border-danger inactive-partner-action-button d-inline-block mr-3"
                                @click="deny(partner)">
                                <ssf-icon icon="ban" size="1x5" thin/>
                            </button>

                            <button
                                class="btn text-success rounded text-white border border-success inactive-partner-action-button d-inline-block ml-2"
                                @click="accept(partner)">
                                <ssf-icon icon="check" size="1x5" thin/>
                            </button>

                        </ssf-container>

                    </template>

                </card-company-info>

            </ssf-row>

        </ssf-container>

        <ssf-container v-else class="full-absolute full-flex">
			<span class="secondary-item">
				Aucune demande en attente de validation
			</span>
        </ssf-container>

    </ssf-container>

</template>

<script lang="ts">
    import { useStore }            from "vuex";
    import { computed, onMounted } from "vue";
    import Partner                 from "@app/modules/partner/partner";
    import CompanyInfo             from "@app/commons/company-info";
    import { UrlPrefix, UrlType }  from "@app/commons";

    // @ts-ignore
    import MainWarning from "@app/vue/utils/swal/warning/main-warning";
    // @ts-ignore
    import MainSuccess from "@app/vue/utils/swal/success/main-success";

    import CardCompanyInfo      from "@/components/commons/cards/card-company-info.vue";
    import { SweetAlertResult } from "sweetalert2";
    import { MainError }        from "@app/vue/utils/swal";

    export default {
        name: "inactive-partners",

        components: { CardCompanyInfo },

        setup() {

            ////////// init
            const store = useStore()

            ////////// mounted
            onMounted(async () => await store.dispatch('partner/fetchInactive'))


            ////////// computed
            const partners = computed((): Partner[] | null => store.getters['partner/inactivePartners'])

            ////////// methods
            const accept = (partner: Partner) => partner.accept()
                .then(async () => {
                    MainSuccess.fire()
                    return await store.dispatch('partner/fetchInactive');
                })
                .catch((error) => MainError.fire({ text: error.message }))
            const deny = (partner: Partner) =>
                MainWarning.fire({
                    html             : "<span>Êtes-vous sûr(e) de vouloir refuser cette inscription ? <br/><span class='small'>(Cette action est irréversible)</span></span>",
                    confirmButtonText: "Oui, j'en suis sûr",
                    showCancelButton : true,
                    cancelButtonText : "J'hésite encore",
                    allowOutsideClick: false,
                    customClass      : {
                        cancelButton : "rounded py-3 bg-warning",
                        confirmButton: "rounded py-3 bg-danger",
                    }
                }).then((answer: SweetAlertResult) => answer.isConfirmed && answer.value ? partner.deny().then(async () => {
                    MainSuccess.fire()
                    return await store.dispatch('partner/fetchInactive');
                }) : null)


            return {
                //// computed
                partners,

                //// methods
                accept,
                deny,

                //// tools
                Partner
            }
        },
        data: () => ({
            itemKeys: [ new CompanyInfo({
                icon     : 'at',
                key      : 'email',
                isLink   : true,
                urlPrefix: UrlPrefix.email,
                urlType  : UrlType.email,
                copyable : true
            }), new CompanyInfo({
                icon     : 'mobile',
                key      : 'phone',
                isLink   : true,
                urlPrefix: UrlPrefix.phone,
                urlType  : UrlType.phone,
                copyable : true
            })/*, new CompanyInfo({
                icon: 'circle-user',
                key : 'username',
            })*/, new CompanyInfo({
                icon     : 'file-certificate',
                key      : 'certificate',
                isLink   : true,
                title    : 'KBIS',
                urlPrefix: UrlPrefix.empty,
                urlType  : UrlType.image,
                titleOnly: true
            }), new CompanyInfo({
                icon : 'asterisk',
                key  : 'siret',
                title: 'Siret',
            }) ]
        })
    }
</script>

<style lang="scss" scoped>

    .inactive-partners {
        min-height: 100vh;

        .inactive-partner-action-button {
            height: 50px;
            width: 50px;
            padding: 0 !important;
        }

    }

</style>
