<template>

    <ssf-container class="position-relative" name="active-premium-members">

        <ssf-container v-if="members && members.length > 0" class="active-premium-members-container">

            <ssf-row>

                <ssf-col md="9" no-padding xs="12">

                    <ssf-row>

                        <active-member-card v-for="member in members"
                                                    :icon="Member.icon.name"
                                                    :item-keys="itemKeys"
                                                    :member="member"
                                                    @destroyed="onDestroyed"
                                                    @edit:member="onEditMemberOpen"/>

                    </ssf-row>

                </ssf-col>

            </ssf-row>

        </ssf-container>

        <ssf-container v-else class="full-absolute full-flex">
			<span class="secondary-item">
				Aucun adhérent premium
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

        <modal-edit-member v-if="modals.editMember.open"
                           :activities="activities"
                           :member="modals.editMember.props.member"
                           :modal-name="modals.editMember.name"
                           :open="modals.editMember.open"
                           @close="onEditMemberClose"
                           @created="onCreated"/>

    </ssf-container>

</template>

<script lang="ts">
    import { useStore }                                                   from "vuex";
    import { computed, defineComponent, onMounted, reactive, ref, watch } from "vue";

    import Member                 from "@app/modules/member/member";
    import CompanyInfo            from "@app/commons/company-info";
    import { UrlPrefix, UrlType } from "@app/commons";

    import CardCompanyInfo  from "@/components/commons/cards/card-company-info.vue";
    import ActiveMemberCard from "@/views/members/components/includes/active-member-card.vue";
    import ModalEditMember  from "@/views/members/components/includes/modal-edit-member.vue";
    import Activity         from "@app/modules/activity/activity";

    export default defineComponent({
        name      : "active-premium-members",
        components: { ActiveMemberCard, CardCompanyInfo, ModalEditMember },
        setup() {

            ////////// init
            const store = useStore()

            ////////// methods
            const fetchActive = () => store.dispatch('member/fetchPremium', { activityId: currentActivityId.value });
            const onDestroyed = () => fetchActive()

            ////////// mounted
            onMounted(() => {
                fetchActive()

                if (activities.value === null) {
                    store.dispatch('activity/fetchAll');
                }
            })

            ////////// computed
            const members = computed((): Member[] | null => store.getters['member/premiumMembers'])
            const activities = computed((): Activity[] | null => store.getters['activity/activities'])

            ////////// data
            const currentActivityId = ref<string | null>(null)
            const activity = ref<Activity>((new Activity).__setItemAttributes({
                id   : null,
                label: "Tous",
                name : "all"
            }))
            const modals = reactive({
                editMember: {
                    open : false,
                    name : 'modal-edit-member',
                    props: <{ member: Member | null }>{
                        member: null
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
                members,
                activities,

                //// methods
                onDestroyed,

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
                icon : 'stamp',
                key  : 'siret',
                title: 'Siret',
            }) ]
        }),

        computed: {
            allActivities() {
                return this.activities && this.activities.length ? [ this.activity ].concat(this.activities!) : this.activities;
            }
        },

        methods: {
            toggleModal(value = true, modalName: string = 'editMember') {
                // @ts-ignore
                this.modals[modalName].open = value
            },

            onEditMemberOpen(member: Member) {
                this.modals.editMember.props.member = member
                this.toggleModal()
            },

            onEditMemberClose() {
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

    .active-premium-members {
        min-height: 100vh;

        .activity-selector {
            top: 60px;
            left: 0;
            right: 15px;
            bottom: 0;
        }
    }

</style>
