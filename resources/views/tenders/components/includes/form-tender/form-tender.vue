<template>
    <ssf-container center name="form-tender" not-full>

        <form-tender-step-tabs :current-step="currentStep"/>

        <ssf-row v-if="error || success" class="mb-3">

            <ssf-col :class="{'text-danger': error, 'text-success': success}"
                     class="form-fallback-container align-flex"
                     size="12">

                <ssf-icon :icon="`${error ? 'times-circle' : 'check-circle'}`"
                          class="mr-2"
                          light
                          size="1x5"/>

                <span v-html="error || success"></span>
            </ssf-col>

        </ssf-row>

        <form id="tender" novalidate>

            <form-tender-information v-if="currentStep === FormTenderSteps.informations"
                                     :is-edition="isEdition"
                                     :tender="tender"
                                     @next="onNextStep"/>

            <form-tender-address v-else-if="currentStep === FormTenderSteps.address"
                                 :is-edition="isEdition"
                                 :tender="tender"
                                 icon="user"
                                 @next="onNextStep"
                                 @prev="onPrevStep"/>

            <form-tender-dates v-else-if="currentStep === FormTenderSteps.dates"
                               :is-edition="isEdition"
                               :tender="tender"
                               @next="onNextStep"
                               @prev="onPrevStep"/>

            <form-tender-documents v-else-if="currentStep === FormTenderSteps.documents"
                                   :is-edition="isEdition"
                                   :tender="tender"
                                   @next="save"
                                   @prev="onPrevStep"/>

        </form>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from "vue"
    import FormTenderStepTabs
                                               from "@/views/tenders/components/includes/form-tender/form-tender-steps-tab.vue";
    import { FormTenderSteps }                 from "@/views/tenders/utils";
    import FormTenderInformation
                                               from "@/views/tenders/components/includes/form-tender/form-tender-information.vue";
    import FormTenderAddress
                                               from "@/views/tenders/components/includes/form-tender/form-tender-address.vue";
    import FormTenderDates
                                               from "@/views/tenders/components/includes/form-tender/form-tender-dates.vue";
    import FormTenderDocuments
                                               from "@/views/tenders/components/includes/form-tender/form-tender-documents.vue";
    import { useForm }                         from "@app/commons/form";
    import { useTenderForm }                   from "@app/modules/tender/tender-module";
    import { AxiosApiError }                   from "@sofiakb/axios-api/lib/tools/api";
    import { loading }                         from "@app/vue/utils/helpers";

    export default defineComponent({
        name: "form-tender",

        components: {
            FormTenderDocuments,
            FormTenderDates,
            FormTenderAddress,
            FormTenderInformation,
            FormTenderStepTabs
        },

        props: {
            isEdition: { type: Boolean, required: false, default: false },
            tenderId : { type: String, required: false, default: null },
        },

        setup(props) {

            const currentStep = ref<FormTenderSteps>(FormTenderSteps.documents)
            // const currentStep = ref<FormTenderSteps>(FormTenderSteps.informations)

            const onNextStep = () => currentStep.value += 1
            const onPrevStep = () => currentStep.value -= 1

            const { tender, storeTender, editTender, fetchById } = useTenderForm()
            const { error, success, validator, setSuccess, setError } = useForm()

            onMounted(() => {
                if (props.tenderId) {
                    fetchById(props.tenderId)
                }
            })

            const save = () => {
                if (currentStep.value === FormTenderSteps.documents) {
                    const tenderValue = tender.value
                    if (props.isEdition || validator({
                        title        : tenderValue.title,
                        description  : tenderValue.description,
                        memberId     : tenderValue.memberId,
                        street_number: tenderValue.address.street_number,
                        address      : tenderValue.address.address,
                        city         : tenderValue.address.city,
                        zipcode      : tenderValue.address.zipcode,
                        file         : tenderValue.file,
                    })) {
                        loading(true)
                        (props.tenderId ? editTender() : storeTender())
                            .then(() => setSuccess("L'affaire a bien été ajoutée !"))
                            .catch((error: AxiosApiError) => setError(error.message))
                            .finally(() => {
                                loading(false)
                                return currentStep.value = FormTenderSteps.informations;
                            })

                    }
                }

            }

            return {

                save,

                //// form module
                error,
                success,

                //// tender module
                tender,
                isEdition: props.isEdition,

                ////
                currentStep,
                onNextStep,
                onPrevStep,

                FormTenderSteps
            }
        }
    })
</script>

<style lang="scss" scoped>

    .form-tender {
        width: 650px;
        max-width: 100%;

    }

</style>
