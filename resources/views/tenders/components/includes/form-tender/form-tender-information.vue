<template>
    <ssf-container name="form-tender-information">

        <ssf-row>

            <qrcp-input :errors="errors"
                        :value="tender.title"
                        col="col-12 col-md-8"
                        icon="font"
                        label="Titre de l'affaire"
                        name="title"
                        required
                        @update:value="(event) => tender.title = event"/>

            <qrcp-input :errors="errors"
                        :value="tender.amount"
                        col="col-12 col-md-4"
                        icon="euro-sign"
                        label="Budget maximum"
                        min="1"
                        name="amount"
                        type="number"
                        @update:value="(event) => tender.amount = event"/>

        </ssf-row>

        <qrcp-input :errors="errors"
                    :value="tender.description"
                    icon="message-captions"
                    label="Description"
                    name="description"
                    required
                    row
                    textarea
                    @update:value="(event) => tender.description = event"/>

        <qrcp-input v-if="!isEdition"
                    :errors="errors"
                    :value="searchPremiumMember"
                    form-group-class="mb-0"
                    icon="magnifying-glass"
                    input-class="members-search"
                    label="Rechercher un adhérent (avec l'adresse e-mail)"
                    name="searchPremiumMember"
                    row
                    @input="onSearchInput"
                    @update:value="onSearchPremiumMemberUpdateValue"/>

        <qrcp-input v-if="members && !isEdition"
                    :errors="errors"
                    :icon="Member.icon.name"
                    :option-items="members"
                    :value="tender.memberId"
                    form-group-class="mt-0"
                    input-class="border-top-0 members-select"
                    label="Adhérents"
                    name="memberId"
                    option-field="id"
                    option-label="companyName"
                    required
                    row
                    select
                    @update:value="(event) => tender.memberId = event"/>

        <qrcp-input v-if="activities"
                    :errors="errors"
                    :icon="Activity.icon.name"
                    :option-items="activities"
                    :value="tender.activityId"
                    label="Domaine d'activité"
                    name="activityId"
                    option-field="id"
                    option-label="label"
                    required
                    row
                    select
                    wheel-propagation
                    @update:value="(event) => tender.activityId = event"/>

        <ssf-row v-if="subActivitiesVisible" class="mb-4 col-12">

            <ssf-container>

                <ssf-title class="h6-responsive" h6>Sous-domaines d'activités</ssf-title>

            </ssf-container>

            <ssf-container>

                <ssf-row>

                    <subdomain-checkbox v-for="subActivity in activity.activities"
                                        :activity="subActivity"
                                        :selected="tender.activities?.includes(subActivity.id)"
                                        @select="onSubDomainSelect"
                                        @unselect="onSubDomainUnselect"/>

                </ssf-row>

            </ssf-container>


        </ssf-row>

        <form-next-button @next="onNext"/>

    </ssf-container>
</template>

<script lang="ts">
    import { computed, defineComponent, onMounted, ref, watch } from "vue"
    import { useTenderForm }                                    from "@app/modules/tender/tender-module";
    import QrcpInput                                            from "@/components/commons/qrcp-input.vue";
    import { useForm }                                          from "@app/commons/form";
    import { Nullable }                                         from "../../../../../../types/nullable";
    import Member                                               from "@app/modules/member/member";

    import { debounce, filter, includes } from "lodash";
    import FormNextButton                 from "@/views/tenders/components/includes/form-tender/form-next-button.vue";
    import Tender                         from "@app/modules/tender/tender";
    import { useActivity }                from "@app/modules/activity/activity-module";
    import Activity                       from "@app/modules/activity/activity";
    import SubdomainCheckbox              from "@/components/commons/subdomain-checkbox.vue";

    export default defineComponent({
        name: "form-tender-information",

        components: { SubdomainCheckbox, FormNextButton, QrcpInput },

        emits: [ 'next' ],

        props: {
            tender   : { type: Tender, required: true },
            isEdition: { type: Boolean, required: false, default: false },
        },

        setup(props, { emit }) {
            ////////// init

            const { members, fetchMembersByEmail, fetchMembers } = useTenderForm()
            const { errors, validator } = useForm()

            const searchPremiumMember = ref<Nullable<string>>(null)
            const isTyping = ref<boolean>(false)
            const onSearchPremiumMemberUpdateValue = (value: string) => {
                isTyping.value = true
                searchPremiumMember.value = value
            }
            const onSearchInput = debounce(async () => {
                isTyping.value = false
                props.tender.memberId = null
                if (searchPremiumMember.value && searchPremiumMember.value.trim() !== '')
                    await fetchMembersByEmail(searchPremiumMember.value)
                else await fetchMembers()
            }, 500)

            onMounted(async () => {
                await fetchMembers();
                await fetchAllActivities();
            })

            const onNext = () => {
                const tenderValue = props.tender
                return props.isEdition || validator({
                    title      : tenderValue.title,
                    description: tenderValue.description,
                    memberId   : tenderValue.memberId,
                    activityId : tenderValue.activityId,
                    activities : tenderValue.activities,
                }) ? emit('next') : null
            }

            const { fetchAllActivities, fetchActivityById, activities, activity } = useActivity()
            watch(() => props.tender.activityId, async (value: any) => value ? activity.value = await fetchActivityById(props.tender.activityId!).catch(() => null) : null, { immediate: true })
            const subActivitiesVisible = computed(() => props.tender.activityId && activity.value && activity.value.activities && activity.value.activities.length)
            const onSubDomainSelect = (subDomainId: string) => {
                if (!props.tender.activities) {
                    props.tender.activities = []
                }
                return includes(props.tender.activities, subDomainId) ? null : props.tender.activities.push(subDomainId);
            }
            const onSubDomainUnselect = (subDomainId: string) => {
                if (!props.tender.activities) {
                    props.tender.activities = []
                }
                if (includes(props.tender.activities, subDomainId)) {
                    props.tender.activities = filter(props.tender.activities, item => item !== subDomainId);
                }
            }

            return {
                //// form module
                errors,

                //// activity module
                activities,
                Activity,
                activity,
                subActivitiesVisible,
                onSubDomainSelect,
                onSubDomainUnselect,

                onNext,

                //// tender form module
                members,

                onSearchInput,
                onSearchPremiumMemberUpdateValue,
                searchPremiumMember,
                Member
            }
        }
    })
</script>

<style lang="scss" scoped>

    .form-tender-information {

        :deep(.members-search) {
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }

        :deep(.members-select) {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
        }

    }

</style>
