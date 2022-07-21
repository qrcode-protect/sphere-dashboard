<template>
    <ssf-container name="step-company-information">

        <ssf-row>

            <qrcp-input :errors="errors"
                        :value="member.companyName"
                        icon="building"
                        label="Nom commercial"
                        name="companyName"
                        required
                        row
                        @update:value="(event) => member.companyName = event"/>

            <qrcp-input :errors="errors"
                        :value="member.siret"
                        icon="stamp"
                        label="Siret"
                        name="siret"
                        required
                        row
                        @input="onSiretInput"
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
    import { defineComponent, getCurrentInstance, onBeforeMount } from "vue"
    import { activities, fetchActivities }                        from "@app/commons/activities";
    import Member                                                 from "@app/modules/member/member";
    import NextButton
                                                                  from "@/views/members/components/includes/form-create/steps/next-button.vue";
    import PreviousButton
                                                                  from "@/views/members/components/includes/form-create/steps/previous-button.vue";
    import QrcpInput                                              from "@/components/commons/qrcp-input.vue";
    import { validate, validator as xValidator }                  from "@app/commons/validation";

    export default defineComponent({
        name      : "company-informations",
        components: { QrcpInput, PreviousButton, NextButton },
        props     : {
            member: { type: Member, required: true },
            errors: { type: Array, required: true },
        },

        emits: [ 'next:step', 'previous:step', 'has:error' ],

        setup(props, { emit }) {
            ////////// init
            onBeforeMount(() => fetchActivities())

            ////////// data

            ////////// computed

            // @ts-ignore
            const ctx: any = getCurrentInstance()?.ctx

            ////////// methods
            const next = () => {

                const result = xValidator({
                    companyName: props.member.companyName,
                    siret      : props.member.siret,
                    activityId : props.member.activityId,
                })

                if (!validate.siret(props.member.siret!)) {
                    // @ts-ignore
                    result.error = "Merci de vérifier le formulaire"
                    ctx.onSiretInput()
                    return emit('has:error', {
                        error : result.error,
                        errors: props.errors
                    })
                }

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
        },

        methods: {
            onSiretInput() {
                this.onFieldInput('siret')
            },

            onFieldInput(field: any) {
                // @ts-ignore
                if (!validate[field](this.member[field])) {
                    if (!this.errors.includes(`${field}.format`))
                        this.errors.push(`${field}.format`)
                } else this.$emit('has:error', { errors: this.errors.filter(item => item !== `${field}.format`) })
            },
        }

    })
</script>

<style lang="scss" scoped>

</style>
