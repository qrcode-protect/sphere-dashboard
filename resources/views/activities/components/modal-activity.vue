<template>

    <ssf-modal v-model="open"
               :click-to-close="false"
               :esc-to-close="false"
               :name="modalName"
               attach="#app"
               body-classes="pt-2 border-0"
               classes="modal-container modal-activity"
               content-class="modal-content z-depth-1 full-flex rounded mx-auto my-2"
               fit-parent
               header-classes="pt-4 pb-2 d-block border-0"
               lock-scroll
               scrollable>

        <template #header>

            <ssf-container>

                <ssf-container class="modal-header-icon full-flex mx-auto border-color-2" not-full>

                    <ssf-title h5>
                        <span v-if="isEditing">Modifier le domaine d'activité</span>
                        <span v-else>Ajouter un domaine d'activité</span>
                    </ssf-title>

                </ssf-container>

            </ssf-container>

            <hr class="w-75 mt-4">

        </template>

        <template #body>

            <form id="joinUsForm" class="join-us-form" @submit.prevent="save">


                <ssf-row>

                    <qrcp-input :errors="errors"
                                :value="activityObject.label"
                                icon="font"
                                label="Nom du domaine"
                                name="label"
                                required
                                row
                                @update:value="(event) => activityObject.label = event"/>

                </ssf-row>


                <ssf-row>

                    <ssf-container>

                        <ssf-title center class="h6-responsive w-100" h6>Sous-domaines d'activités</ssf-title>

                    </ssf-container>

                    <qrcp-input v-for="(subActivity, $idx) in activityObject.activities"
                                :errors="errors"
                                :label="`Nom du sous-domaine n°${$idx + 1}`"
                                :value="activityObject.activities[$idx].label"
                                icon="font"
                                name="label"
                                required
                                row
                                @update:value="(event) => activityObject.activities[$idx].label = event"/>

                    <ssf-shape center circle class="border border-color-2 color-2 cursor-pointer mx-auto my-2" size="50" @click="addSubDomain">
                        <ssf-icon icon="plus"/>
                    </ssf-shape>


                </ssf-row>


                <ssf-container>

                    <ssf-row>

                        <ssf-col class="text-center" size="6">

                            <button class="btn bg-danger text-white font-weight-normal" type="button"
                                    @click="$emit('close')">
                                <ssf-icon icon="ban" light/>
                                Annuler
                            </button>

                        </ssf-col>

                        <ssf-col class="text-center" size="6">

                            <button class="btn bg-color-2 text-white font-weight-normal" type="button" @click="save">
                                <ssf-icon icon="floppy-disk-pen" light/>
                                Enregistrer
                            </button>

                        </ssf-col>

                    </ssf-row>

                </ssf-container>


            </form>

        </template>

    </ssf-modal>

</template>

<script lang="ts">
    import { defineComponent, ref }   from "vue"
    import Activity                   from "@app/modules/activity/activity";
    import { MainError, MainSuccess } from "@app/vue/utils/swal";
    import { AxiosApiError }          from "@sofiakb/axios-api/lib/tools/api";
    import QrcpInput                  from "@/components/commons/qrcp-input.vue";

    export default defineComponent({
        name      : "modal-activity",
        components: { QrcpInput },
        props     : {
            modalName: { type: String, required: false, default: 'modal-activity' },
            open     : { type: Boolean, required: false, default: false },
            activity : { type: Activity, required: false },
        },

        emits: [ 'close', 'save' ],

        setup(props, { emit }) {
            ////////// init

            ////////// data
            const duplicated = ref(false)
            const activityObject = ref(props.activity ?? (new Activity()).__setItemAttributes({
                label     : null,
                activities: []
            }))
            const isEditing = ref(!!props.activity)
            //// form
            const errors = ref<string[]>([])

            ////////// computed

            ////////// methods
            const addSubDomain = () => activityObject.value.activities?.push((new Activity()).__setItemAttributes({ label: null }))
            const save = () => {
                if (!activityObject.value.label || activityObject.value.label.trim() === '')
                    return errors.value.push('label.required')


                errors.value = []

                return (isEditing.value ? activityObject.value.update() : activityObject.value.store())
                    .then(() => {
                        MainSuccess.fire()
                        return emit('save');
                    })
                    .catch((error: AxiosApiError) => MainError.fire({ text: error.message }));
            }

            return {
                //// data
                duplicated,
                activityObject,
                isEditing,
                // form
                errors,

                //// methods
                save,
                addSubDomain,
            }
        }

    })
</script>

<style lang="scss">

    .modal-activity {
        .modal-content {
            width: 500px !important;
            right: 0;
            left: 0;
        }
    }

</style>
