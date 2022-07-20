<template>

    <ssf-modal v-model="visible"
               :name="modalName"
               attach="#app"
               body-classes="pt-2 border-0"
               classes="modal-container modal-edit-partner"
               content-class="modal-content z-depth-1 full-flex rounded mx-auto"
               fit-parent
               header-classes="pt-4 pb-2 d-block border-0"
               scrollable
               lock-scroll
               @before-close="closeModal">

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
                                <h5 class="h5-responsive color-2 font-weight-semi-bold">Informations personnelles</h5>
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
                                <h5 class="h5-responsive color-2 font-weight-semi-bold">Société / organisation</h5>
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
    import { computed, defineComponent, onMounted, PropType, ref, watch } from "vue"
    import Partner                                                        from "@app/modules/partner/partner";
    import Activity                                                       from "@app/modules/activity/activity";
    import { MainError, MainSuccess }                                     from "@app/vue/utils/swal";
    import { AxiosApiError }                                              from "@sofiakb/axios-api/lib/tools/api";
    import { filter, includes }                                           from "lodash";
    import { useActivity } from "@app/modules/activity/activity-module";
    import SubdomainCheckbox
                           from "@/components/commons/subdomain-checkbox.vue";

    export default defineComponent({
        name: "modal-edit-partner",
        components: { SubdomainCheckbox },
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
            const visible = ref<boolean>(false)

            ////////// computed

            ////////// methods
            const save = () =>
                props.partner.update()
                    .then(() => MainSuccess.fire() && emit('close'))
                    .catch((error: AxiosApiError) => MainError.fire({ text: error.message }))

            const { activity, fetchActivityById } = useActivity()
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

            watch(() => props.open, () => visible.value = props.open, { immediate: true })

            return {
                //// data
                duplicated,
                visible,

                //// methods
                save,
                closeModal: () => emit('close'),

                activity,
                subActivitiesVisible,
                onSubDomainSelect,
                onSubDomainUnselect
            }
        }

    })
</script>

<style lang="scss">

    .modal-edit-partner {
        .modal-content {
            width: 650px !important;
            right: 0;
            left: 0;
        }
    }

</style>
