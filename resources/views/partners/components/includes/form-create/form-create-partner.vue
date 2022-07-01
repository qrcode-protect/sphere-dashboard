<template>

    <ssf-container class="mx-auto" name="form-create-partner" not-full>

        <ssf-container name="step-tabs">

            <ssf-row>

                <ssf-col v-for="(step, $idx) in steps" class="text-center">

                    <ssf-container class="py-4 my-3">

                        <ssf-container class="position-relative my-2">

                            <ssf-container
                                :class="{'border-color-2 color-2': step.step <= currentStep}"
                                class="step-item-value border full-flex mx-auto rounded-circle border-strong font-weight-bold bg-white"
                                not-full>

                                {{ step.step }}

                                <ssf-container v-if="$idx < steps.length - 1"
                                               :class="{'bg-color-5': step.step < currentStep}"
                                               class="position-absolute bg-color-1 my-auto step-progress"/>

                                <ssf-container
                                    class="position-absolute bg-white my-auto step-progress-border rounded-circle"
                                    not-full/>

                            </ssf-container>

                        </ssf-container>

                        <ssf-text
                            :class="{'color-2': step.step <= currentStep}">
                            {{ step.title }}
                        </ssf-text>

                    </ssf-container>


                </ssf-col>


            </ssf-row>

        </ssf-container>

        <ssf-container class="mt-5" name="step-content">

            <ssf-row v-if="error" class="mb-3">

                <ssf-col class="form-fallback-container align-flex text-danger"
                         size="12">

                    <ssf-icon class="mr-2"
                              icon="times-circle"
                              light
                              size="1x5"/>

                    <span v-html="error"></span>
                </ssf-col>

            </ssf-row>

            <form id="formCreatePartner" novalidate>

                <personal-informations v-if="currentStep === 1"
                                       :errors="errors"
                                       :partner="partner"
                                       @has:error="hasError"
                                       @next:step="nextStep"/>

                <company-informations v-else-if="currentStep === 2"
                                      :errors="errors"
                                      :partner="partner"
                                      @has:error="hasError"
                                      @next:step="nextStep"
                                      @previous:step="previousStep"/>

                <documents v-else-if="currentStep === 3"
                           :errors="errors"
                           :partner="partner"
                           @has:error="hasError"
                           @next:step="nextStep(true)"
                           @previous:step="previousStep"/>

            </form>

        </ssf-container>

        <modal-recap v-if="modals.recapBeforeSave.open"
                     :modal-name="modals.recapBeforeSave.name"
                     :open="modals.recapBeforeSave.open"
                     :partner="modals.recapBeforeSave.props.partner"
                     @close="onModalRecapClose"
                     @save="save"/>

    </ssf-container>

</template>

<script lang="ts">
    import { defineComponent, reactive, ref } from "vue"
    import Partner                            from "@app/modules/partner/partner";
    import PersonalInformations
                                       from "@/views/partners/components/includes/form-create/steps/personal-informations.vue";
    import CompanyInformations
                                       from "@/views/partners/components/includes/form-create/steps/company-informations.vue";
    import Documents
                                       from "@/views/partners/components/includes/form-create/steps/documents.vue";
    import { Nullable }                from "../../../../../../types/nullable";
    import { validator as xValidator } from "@app/commons/validation";
    import ModalRecap
                                       from "@/views/partners/components/includes/form-create/steps/modal-recap.vue";
    import { AxiosApiError }           from "@sofiakb/axios-api/lib/tools/api";
    import { MainSuccess }             from "@app/vue/utils/swal";
    import { useStore }                from "vuex";

    export default defineComponent({
        name      : "form-create-partner",
        components: { ModalRecap, Documents, CompanyInformations, PersonalInformations },
        setup() {
            ////////// init
            const store = useStore()

            ////////// data
            const currentStep = ref(1)
            const partner = ref<Partner>((new Partner()).__setItemAttributes({}))
            const modals = reactive({
                recapBeforeSave: {
                    open : false,
                    name : 'modal-recap',
                    props: <{ partner: Partner | null }>{
                        partner: partner.value
                    }
                }
            })
            //// form
            const error = ref<Nullable<string>>(null)
            const errors = ref([])
            const loading = ref(false)

            ////////// computed

            ////////// methods
            const storeLoading = (value = true) => store.dispatch('loading', value)


            return {
                //// data
                currentStep,
                partner,
                modals,
                // form
                error,
                errors,
                loading,

                //// methods
                storeLoading
            }
        },

        data: () => ({
            steps: [
                {
                    step : 1,
                    title: "Informations personnelles"
                }, {
                    step : 2,
                    title: "Société / Organisation"
                }, {
                    step : 3,
                    title: "Documents"
                }
            ]
        }),

        methods: {
            nextStep(last = false) {
                if (last) {
                    this.modals.recapBeforeSave.open = true
                    this.modals.recapBeforeSave.props.partner = this.partner
                }

                return this.currentStep += this.currentStep === this.steps.length ? 0 : 1
            },

            previousStep() {
                return this.currentStep -= this.currentStep === 0 ? 0 : 1
            },

            hasError(data: any) {
                this.errors = data.errors
                this.error = data.error
            },

            save() {
                if (this.loading)
                    return false

                this.loading = true

                this.error = null
                this.errors = []

                if (!this.partner.certificate) {
                    this.error = "Merci de choisir un kbis"
                    return false
                }

                if (!this.partner.activityId || this.partner.activityId === '') {
                    this.error = "Merci de choisir un domaine d'activité"
                    return false
                }

                this.modals.recapBeforeSave.open = false


                this.storeLoading(true)
                Partner.send(this.partner)
                    .then(() => {
                        MainSuccess.fire()
                        this.currentStep = 1
                        return this.partner = new Partner();
                    })
                    .catch((error: AxiosApiError) => this.error = error.message)
                    .finally(() => {
                        this.storeLoading(false)
                        return this.loading = false;
                    })
            },

            onModalRecapClose(previous = false) {
                this.modals.recapBeforeSave.open = false
                if (previous) this.previousStep()
            },

        }

    })
</script>

<style lang="scss" scoped>

    .form-create-partner {
        width: 500px;

        .step-item-value {
            height: 50px;
            width: 50px;
        }

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
    }

</style>
