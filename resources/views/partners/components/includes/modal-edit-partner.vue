<template>

    <ssf-modal v-model="open"
               :click-to-close="false"
               :esc-to-close="false"
               :name="modalName"
               attach="#app"
               body-classes="pt-2 border-0"
               classes="modal-container full-flex modal-edit-partner"
               content-class="modal-content z-depth-1 full-flex rounded"
               fit-parent
               header-classes="pt-4 pb-2 d-block border-0"
               lock-scroll>

        <template #header>

            <ssf-container>

                <ssf-container class="modal-header-icon full-flex mx-auto border-color-2" not-full>

                    {{ partner.companyName.toUpperCase() }}

                </ssf-container>

            </ssf-container>

            <hr class="w-75 mt-4">

        </template>

        <template #body>

            <form id="joinUsForm" class="join-us-form" @submit.prevent="save">

                <ssf-row>

                    <ssf-container>

                        <ssf-row>
                            <ssf-col class="text-center" size="12">
                                <h5 class="h5-responsive color-2 font-weight-bold">Informations personnelles</h5>
                            </ssf-col>
                        </ssf-row>

                        <ssf-row>


                            <ssf-form-group :value="partner.lastname"
                                            col="col-12 col-md-6"
                                            label="Nom"
                                            name="lastname"
                                            placeholder="Nom"
                                            required
                                            @update:value="(event) => partner.lastname = event"/>

                            <ssf-form-group :value="partner.firstname"
                                            col="col-12 col-md-6"
                                            label="Prénom"
                                            name="firstname"
                                            placeholder="Prénom"
                                            required
                                            @update:value="(event) => partner.firstname = event"/>
                        </ssf-row>

                        <ssf-row>

                            <ssf-form-group :input-class="{'is-invalid': duplicated}"
                                            :value="partner.email"
                                            col="col-8"
                                            label="Adresse e-mail"
                                            name="email"
                                            placeholder="Adresse e-mail"
                                            required
                                            @update:value="(event) => partner.email = event"/>

                            <ssf-form-group :value="partner.phone"
                                            col="col-4"
                                            label="Numéro de téléphone"
                                            name="phone"
                                            placeholder="Mobile / fixe"
                                            required
                                            type="tel"
                                            @update:value="(event) => partner.phone = event"/>

                        </ssf-row>

                    </ssf-container>


                    <ssf-container>

                        <ssf-row>
                            <ssf-col class="text-center" size="12">
                                <h5 class="h5-responsive color-2 font-weight-bold">Société / organisation</h5>
                            </ssf-col>
                        </ssf-row>

                        <ssf-row>

                            <ssf-form-group :value="partner.companyName"
                                            col="col-6"
                                            name="companyName"
                                            placeholder="Nom de la société"
                                            required
                                            @update:value="(event) => partner.companyName = event"/>

                            <ssf-form-group :value="partner.siret"
                                            col="col-6"
                                            label="Siret"
                                            name="siret"
                                            placeholder="Siret"
                                            required
                                            @update:value="(event) => partner.siret = event"/>

                        </ssf-row>

                        <ssf-form-group :option-items="activities"
                                        :value="partner.activityId"
                                        label="Domaine d'activité"
                                        name="activityId"
                                        option-field="id"
                                        option-label="label"
                                        placeholder="Domaine d'activité"
                                        row
                                        select
                                        @update:value="(event) => partner.activityId = event"/>

                    </ssf-container>


                    <ssf-container>

                        <ssf-row>

                            <ssf-col class="text-center" size="12">

                                <button class="btn bg-color-2 text-white font-weight-normal">
                                    <ssf-icon icon="floppy-disk-pen" light/>
                                    Enregistrer les modifications
                                </button>

                            </ssf-col>

                        </ssf-row>

                    </ssf-container>

                </ssf-row>

            </form>

        </template>

    </ssf-modal>

</template>

<script lang="ts">
    import { defineComponent, PropType, ref } from "vue"
    import Partner                             from "@app/modules/partner/partner";
    import Activity                           from "@app/modules/activity/activity";
    import { MainError, MainSuccess }         from "@app/vue/utils/swal";
    import { AxiosApiError }                  from "@sofiakb/axios-api/lib/tools/api";

    export default defineComponent({
        name: "modal-edit-partner",

        props: {
            modalName : { type: String, required: false, default: 'modal-create-user' },
            open      : { type: Boolean, required: false, default: false },
            partner    : { type: Partner, required: true },
            activities: { type: [ Array, null ] as PropType<Activity[]>, required: true },
        },

        emits: [ 'close', 'save', 'edited' ],

        setup(props, { emit }) {
            ////////// init

            ////////// data
            const duplicated = ref(false)

            ////////// computed

            ////////// methods
            const save = () =>
                props.partner.update()
                    .then(() => MainSuccess.fire() && emit('close'))
                    .catch((error: AxiosApiError) => MainError.fire({ text: error.message }))

            return {
                //// data
                duplicated,

                //// methods
                save
            }
        }

    })
</script>

<style lang="scss">

    .modal-edit-partner {
        .modal-content {
            width: 650px !important;
        }
    }

</style>
