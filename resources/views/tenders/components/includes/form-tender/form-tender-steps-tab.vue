<template>
    <ssf-container name="step-tabs">

        <ssf-row>

            <ssf-col v-for="(step, $idx) in steps" class="text-center">

                <ssf-container class="py-4 my-3">

                    <ssf-container class="position-relative my-2">

                        <ssf-shape size="50" circle center
                            :class="{'border-color-2 color-2': step.step <= currentStep}"
                            class="step-item-value border mx-auto border-strong font-weight-bold bg-white">

                            {{ step.step }}

                            <ssf-container v-if="$idx < steps.length - 1"
                                           :class="{'bg-color-5': step.step < currentStep}"
                                           class="position-absolute bg-color-1 my-auto step-progress"/>

                            <ssf-container
                                class="position-absolute bg-white my-auto step-progress-border rounded-circle"
                                not-full/>

                        </ssf-shape>

                    </ssf-container>

                    <ssf-text
                        :class="{'color-2': step.step <= currentStep}">
                        {{ step.title }}
                    </ssf-text>

                </ssf-container>


            </ssf-col>


        </ssf-row>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import { FormTenderSteps } from "@/views/tenders/utils";

    export default defineComponent({
        name: "form-tender-step-tabs",

        props: {
            currentStep: { type: Number, required: true }
        },

        data: () => ({
            steps: [
                {
                    step : FormTenderSteps.informations,
                    title: "Informations"
                }, {
                    step : FormTenderSteps.address,
                    title: "Adresse"
                }, {
                    step : FormTenderSteps.dates,
                    title: "Dates"
                }, {
                    step : FormTenderSteps.documents,
                    title: "Documents"
                }
            ]
        }),
    })
</script>

<style lang="scss" scoped>

    .step-progress {
        height: 2px;
        left: 57%;
        top: 0;
        bottom: 0;
        z-index: -2;
    }

    .step-progress-border {
        height: 70px;
        width: 70px;
        z-index: -1;
    }

</style>
