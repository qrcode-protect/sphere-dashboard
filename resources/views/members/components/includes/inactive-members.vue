<template>

    <ssf-container class="position-relative" name="inactive-members">

        <ssf-container v-if="members && members.length > 0" class="inactive-members-container">

            <ssf-row>

                <card-company-info v-for="member in members"
                                   :icon="Member.icon.name"
                                   :item-keys="itemKeys"
                                   :item="member"
                                   data-type="member"
                                   footer-class="bg-white border-0">

                    <template #footer>

                        <ssf-container class="text-right">

                            <button
                                class="btn text-danger rounded text-white border border-danger inactive-member-action-button d-inline-block mr-3"
                                @click="deny(member)">
                                <ssf-icon icon="ban" size="1x5" thin/>
                            </button>

                            <button
                                class="btn text-success rounded text-white border border-success inactive-member-action-button d-inline-block ml-2"
                                @click="accept(member)">
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
    import Member                  from "@app/modules/member/member";
    import CompanyInfo             from "@app/commons/company-info";
    import { UrlPrefix, UrlType }  from "@app/commons";

    // @ts-ignore
    import MainWarning from "@app/vue/utils/swal/warning/main-warning";
    // @ts-ignore
    import MainSuccess from "@app/vue/utils/swal/success/main-success";

    import CardCompanyInfo      from "@/components/commons/cards/card-company-info.vue";
    import { SweetAlertResult } from "sweetalert2";

    export default {
        name: "inactive-members",

        components: { CardCompanyInfo },

        setup() {

            ////////// init
            const store = useStore()

            ////////// mounted
            onMounted(async () => await store.dispatch('member/fetchInactive'))


            ////////// computed
            const members = computed((): Member[] | null => store.getters['member/inactiveMembers'])

            ////////// methods
            const accept = (member: Member) => member.accept().then(async () => {
                MainSuccess.fire()
                return await store.dispatch('member/fetchInactive');
            })
            const deny = (member: Member) =>
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
                }).then((answer: SweetAlertResult) => answer.isConfirmed && answer.value ? member.deny().then(async () => {
                    MainSuccess.fire()
                    return await store.dispatch('member/fetchInactive');
                }) : null)


            return {
                //// computed
                members,

                //// methods
                accept,
                deny,

                //// tools
                Member
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
            }), new CompanyInfo({
                icon: 'circle-user',
                key : 'username',
            }), new CompanyInfo({
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

    .inactive-members {
        min-height: 100vh;

        .inactive-member-action-button {
            height: 50px;
            width: 50px;
            padding: 0 !important;
        }

    }

</style>
