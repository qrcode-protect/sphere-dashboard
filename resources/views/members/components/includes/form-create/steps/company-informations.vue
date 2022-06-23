<template>
    <ssf-container name="step-company-information">

        <ssf-row>

            <qrcp-input :errors="errors"
                        :value="member.companyName"
                        col="col-8"
                        icon="building"
                        label="Nom commercial"
                        name="companyName"
                        required
                        @update:value="(event) => member.companyName = event"/>

            <qrcp-input :errors="errors"
                        :value="member.siret"
                        col="col-4"
                        icon="stamp"
                        label="Siret"
                        name="siret"
                        required
                        @update:value="(event) => member.siret = event"/>

        </ssf-row>

        <qrcp-input :errors="errors"
                    :option-items="activities"
                    :value="member.activityId"
                    icon="chart-network"
                    label="Domaine d'activité"
                    name="activityId"
                    option-field="id"
                    option-label="label"
                    required
                    row
                    select
                    @update:value="(event) => member.activityId = event"/>

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
    import Partner                            from "@app/modules/member/member";
    import NextButton
                                              from "@/views/members/components/includes/form-create/steps/next-button.vue";
    import PreviousButton
                                              from "@/views/members/components/includes/form-create/steps/previous-button.vue";
    import QrcpInput                          from "@/components/commons/qrcp-input.vue";
    import { validator as xValidator }        from "@app/commons/validation";

    export default defineComponent({
        name: "company-informations",
        components: { QrcpInput, PreviousButton, NextButton },
        props: {
            member: { type: Partner, required: true },
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
                    companyName: props.member.companyName,
                    siret      : props.member.siret,
                    activityId : props.member.activityId,
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
