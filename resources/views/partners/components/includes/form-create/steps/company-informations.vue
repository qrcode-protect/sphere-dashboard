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
    import { defineComponent, onBeforeMount } from "vue"
    import { activities, fetchActivities }    from "@app/commons/activities";
    import Partner                            from "@app/modules/partner/partner";
    import NextButton
                                              from "@/views/partners/components/includes/form-create/steps/next-button.vue";
    import PreviousButton
                                              from "@/views/partners/components/includes/form-create/steps/previous-button.vue";
    import QrcpInput                          from "@/components/commons/qrcp-input.vue";
    import { validator as xValidator }        from "@app/commons/validation";

    export default defineComponent({
        name: "company-informations",
        components: { QrcpInput, PreviousButton, NextButton },
        props: {
            partner: { type: Partner, required: true },
            errors : { type: Array, required: true },
        },

        emits: [ 'next:step', 'previous:step', 'has:error' ],

        setup(props, { emit }) {
            ////////// init
            onBeforeMount(() => fetchActivities())

            ////////// data

            ////////// computed

            ////////// methods
            const next = () => {

                const result = xValidator({
                    companyName: props.partner.companyName,
                    siret      : props.partner.siret,
                    activityId : props.partner.activityId,
                    description : props.partner.description,
                })

                return result.valid ? emit('next:step') : emit('has:error', {
                    error : result.error,
                    errors: result.errors
                })
            }

            return {
                //// computed
                activities,

                //// methods
                next
            }
        }

    })
</script>

<style lang="scss" scoped>

</style>
