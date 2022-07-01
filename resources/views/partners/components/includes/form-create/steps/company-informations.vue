<template>
    <ssf-container name="step-company-information">

        <ssf-row>

            <qrcp-input :errors="errors"
                        :value="partner.companyName"
                        col="col-12 col-md-8"
                        icon="building"
                        label="Nom commercial"
                        name="companyName"
                        required
                        @update:value="(event) => partner.companyName = event"/>

            <qrcp-input :errors="errors"
                        :value="partner.siret"
                        col="col-12 col-md-4"
                        icon="stamp"
                        label="Siret"
                        name="siret"
                        required
                        @update:value="(event) => partner.siret = event"/>

        </ssf-row>

        <qrcp-input :errors="errors"
                    :option-items="activities"
                    :value="partner.activityId"
                    icon="chart-network"
                    label="Domaine d'activité"
                    name="activityId"
                    option-field="id"
                    option-label="label"
                    required
                    row
                    select
                    @update:value="(event) => partner.activityId = event"/>

        <ssf-row v-if="subActivitiesVisible" class="mb-4 col-12">

            <ssf-container>

                <ssf-title class="h6-responsive" h6>Sous-domaines d'activités</ssf-title>

            </ssf-container>

            <ssf-container>

                <ssf-row>

                    <subdomain-checkbox v-for="subActivity in activity.activities"
                                        :activity="subActivity"
                                        :selected="partner.activities?.includes(subActivity.id)"
                                        @select="onSubDomainSelect"
                                        class="mx-auto"
                                        @unselect="onSubDomainUnselect"/>

                </ssf-row>

            </ssf-container>


        </ssf-row>

        <qrcp-input :errors="errors"
                    :option-items="activities"
                    :value="partner.description"
                    icon="text"
                    label="Description"
                    name="description"
                    required
                    row
                    textarea
                    @update:value="(event) => partner.description = event"/>

        <ssf-row>

            <ssf-col no-padding size="6">
                <previous-button @previous:step="$emit('previous:step')"/>
            </ssf-col>

            <ssf-col no-padding size="6">
                <next-button @next:step="next"/>
            </ssf-col>

        </ssf-row>


    </ssf-container>
</template>

<script lang="ts">
    import { computed, defineComponent, onBeforeMount, watch } from "vue"
    import { activities, fetchActivities }                     from "@app/commons/activities";
    import Partner                                             from "@app/modules/partner/partner";
    import NextButton
                                                               from "@/views/partners/components/includes/form-create/steps/next-button.vue";
    import PreviousButton
                                                               from "@/views/partners/components/includes/form-create/steps/previous-button.vue";
    import QrcpInput                                           from "@/components/commons/qrcp-input.vue";
    import { validator as xValidator }                         from "@app/commons/validation";
    import { useActivity }                                     from "@app/modules/activity/activity-module";
    import SubdomainCheckbox
                                                               from "@/views/partners/components/includes/form-create/steps/subdomain-checkbox.vue";
    import { filter, includes }                                from "lodash";

    export default defineComponent({
        name      : "company-informations",
        components: { SubdomainCheckbox, QrcpInput, PreviousButton, NextButton },
        props     : {
            partner: { type: Partner, required: true },
            errors : { type: Array, required: true },
        },

        emits: [ 'next:step', 'previous:step', 'has:error' ],

        setup(props, { emit }) {
            ////////// init
            onBeforeMount(() => fetchActivities())

            ////////// data
            const { activity, fetchActivityById } = useActivity()

            ////////// computed

            ////////// methods
            const next = () => {

                const result = xValidator({
                    companyName: props.partner.companyName,
                    siret      : props.partner.siret,
                    activityId : props.partner.activityId,
                    description: props.partner.description,
                })

                return result.valid ? emit('next:step') : emit('has:error', {
                    error : result.error,
                    errors: result.errors
                })
            }

            watch(() => props.partner.activityId, async (value: any) => value ? activity.value = await fetchActivityById(props.partner.activityId!).catch(() => null) : null, { immediate: true })
            const subActivitiesVisible = computed(() => props.partner.activityId && activity.value && activity.value.activities && activity.value.activities.length)
            const onSubDomainSelect = (subDomainId: string) => {
                if (!props.partner.activities) {
                    props.partner.activities = []
                }
                return includes(props.partner.activities, subDomainId) ? null : props.partner.activities.push(subDomainId);
            }
            const onSubDomainUnselect = (subDomainId: string) => {
                if (!props.partner.activities) {
                    props.partner.activities = []
                }
                if (includes(props.partner.activities, subDomainId)) {
                    props.partner.activities = filter(props.partner.activities, item => item !== subDomainId);
                }
            }

            return {
                //// computed
                activities,

                //// methods
                next,

                activity,
                subActivitiesVisible,
                onSubDomainSelect,
                onSubDomainUnselect
            }
        }

    })
</script>

<style lang="scss" scoped>

</style>
