<template>

    <ssf-container class="position-relative" name="active-partners">

        <ssf-container v-if="partners && partners.length > 0" class="active-partners-container">

            <ssf-row>
                <ssf-col md="9" no-padding xs="12">
                    <ssf-row>

                        <active-partner-card v-for="partner in partners"
                                             :icon="Partner.icon.name"
                                             :item-keys="itemKeys"
                                             :partner="partner"
                                             @destroyed="onDestroyed"
                                             @edit:partner="onEditPartnerOpen"/>

                    </ssf-row>
                </ssf-col>

            </ssf-row>


        </ssf-container>

        <ssf-container v-else class="full-absolute full-flex">
			<span class="secondary-item">
				Aucun partenaire
			</span>
        </ssf-container>

        <ssf-col class="position-fixed ml-auto activity-selector" md="3" no-padding>

            <ul class="p-3 bg-white border rounded">

                <li v-for="activity in allActivities"
                    :class="{'bg-light': activity.id === currentActivityId}"
                    class="p-2 rounded cursor-pointer"
                    @click="changeActivityId(activity.id)">
                    {{ activity.label }}
                </li>

            </ul>

        </ssf-col>

        <modal-edit-partner v-if="modals.editPartner.open"
                            :activities="activities"
                            :modal-name="modals.editPartner.name"
                            :open="modals.editPartner.open"
                            :partner="modals.editPartner.props.partner"
                            @close="onEditPartnerClose"
                            @created="onCreated"/>

    </ssf-container>

</template>

<script lang="ts">
    import { useStore }                                                   from "vuex";
    import { computed, defineComponent, onMounted, reactive, ref, watch } from "vue";

    import Partner                from "@app/modules/partner/partner";
    import CompanyInfo            from "@app/commons/company-info";
    import { UrlPrefix, UrlType } from "@app/commons";

    import CardCompanyInfo   from "@/components/commons/cards/card-company-info.vue";
    import ActivePartnerCard from "@/views/partners/components/includes/active-partner-card.vue";
    import ModalEditPartner  from "@/views/partners/components/includes/modal-edit-partner.vue";
    import Activity            from "@app/modules/activity/activity";
    import { filter, reverse } from "lodash";

    export default defineComponent({
        name      : "active-partners",
        components: { ActivePartnerCard, CardCompanyInfo, ModalEditPartner },
        setup() {

            ////////// init
            const store = useStore()

            ////////// methods
            const fetchActive = () => store.dispatch('partner/fetchActive', { activityId: currentActivityId.value });
            const onDestroyed = () => fetchActive()

            ////////// mounted
            onMounted(() => {
                fetchActive()

                if (activities.value === null) {
                    store.dispatch('activity/fetchAll');
                }
            })

            ////////// computed
            const partners = computed((): Partner[] | null => store.getters['partner/activePartners'])
            const activities = computed((): Activity[] | null => store.getters['activity/activities'])

            ////////// data
            const currentActivityId = ref<string | null>(null)
            const activity = ref<Activity>((new Activity).__setItemAttributes({
                id   : null,
                label: "Tous",
                name : "all"
            }))
            const modals = reactive({
                editPartner: {
                    open : false,
                    name : 'modal-edit-partner',
                    props: <{ partner: Partner | null }>{
                        partner: null
                    }
                }
            })

            watch(() => currentActivityId.value, () => fetchActive())

            return {
                //// data
                modals,
                currentActivityId,
                activity,

                //// computed
                partners,
                activities,

                //// methods
                onDestroyed,

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
                icon : 'stamp',
                key  : 'siret',
                title: 'Siret',
            }) ]
        }),

        computed: {
            allActivities() {
                let activities = reverse(this.activities ?? [])
                if (activities && activities.length) {
                    if (filter(activities, activity => activity.name === "all" && activity.id === null).length === 0)
                        activities.push(this.activity)
                }

                return reverse(activities)
            }
        },

        methods: {
            toggleModal(value = true, modalName: string = 'editPartner') {
                // @ts-ignore
                this.modals[modalName].open = value
            },

            onEditPartnerOpen(partner: Partner) {
                this.modals.editPartner.props.partner = partner
                this.toggleModal()
            },

            onEditPartnerClose() {
                this.toggleModal(false)
            },

            onCreated() {
            },

            changeActivityId(activityId: string) {
                this.currentActivityId = activityId
            }
        }
    })
</script>

<style lang="scss" scoped>

    .active-partners {
        min-height: 100vh;


        .activity-selector {
            top: 60px;
            left: 0;
            right: 15px;
            bottom: 0;
        }
    }

</style>
