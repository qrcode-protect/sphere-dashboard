<template>
    <ssf-container name="form-tender">

        <form-tender-step-tabs :current-step="currentStep"/>


    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue"
    import FormTenderStepTabs       from "@/views/tenders/components/includes/form-tender/form-tender-steps-tab.vue";
    import { FormTenderSteps }      from "@/views/tenders/utils";

    export default defineComponent({
        name      : "form-tender",
        components: { FormTenderStepTabs },
        setup() {

            const currentStep = ref(FormTenderSteps.informations)

            return {

                ////
                currentStep
            }
        }
    })
</script>

<style lang="scss" scoped>

    .form-tender {
        width: 500px;
        max-width: 100%;

    }

</style>
