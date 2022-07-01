<template>
    <ssf-modal v-model="visible"
               :name="modalName"
               attach="#app"
               body-classes="p-5 border-0"
               classes="modal-container modal-recap-partner"
               content-class="modal-content z-depth-1 full-flex modal-data-information rounded mx-auto"
               fit-parent
               footer-classes="p-2 border-0 align-flex"
               header-classes="pt-4 d-block border-0"
               lock-scroll
               scrollable
               @before-close="closeModal">

        <template #body>

            <ssf-container>

                <ssf-row v-for="itemKey in itemKeys" class="py-1">

                    <ssf-col size="5" style="font-weight: 600">
                        {{ partner.attributes[itemKey].comment ?? itemKey }}
                    </ssf-col>

                    <ssf-col v-if="itemKey === 'activities'" size="7">
                        <ul v-if="subDomains && subDomains.length" class="fa-ul">
                            <li v-for="subDomain in subDomains">
                                <span class="fa-li"><ssf-icon icon="circle-arrow-right" light size="sm"/></span>
                                {{ subDomain.label ?? 'N/D' }}
                            </li>
                        </ul>
                        <ssf-text v-else>Aucun</ssf-text>
                    </ssf-col>

                    <ssf-col v-else size="7">
                        {{ itemKey === 'activityId' ? (activity.label ?? 'N/D') : partner[itemKey].substring(0, 80) }}
                    </ssf-col>

                </ssf-row>

                <ssf-row class="py-1">

                    <ssf-col size="5" style="font-weight: 600">
                        KBIS
                    </ssf-col>

                    <ssf-col size="7">
                        {{ partner.certificate.name }}
                    </ssf-col>

                </ssf-row>

                <ssf-row class="py-1">

                    <ssf-col size="5" style="font-weight: 600">
                        Avatar
                    </ssf-col>

                    <ssf-col size="7">
                        {{ partner.avatar.name }}
                    </ssf-col>

                </ssf-row>

            </ssf-container>

        </template>

        <template #footer>

            <ssf-row>

                <ssf-col class="text-center" size="12">
                    <button class="btn bg-color-2 text-white" @click="save">
                        valider
                        <ssf-icon class="ml-1" icon="floppy-disk-circle-arrow-right" light/>
                    </button>
                </ssf-col>


            </ssf-row>

        </template>


    </ssf-modal>
</template>

<script lang="ts">
    import { computed, defineComponent, onMounted, ref, watch } from "vue"
    import Partner                                              from "@app/modules/partner/partner";
    import { activities, fetchActivities }                      from "@app/commons/activities";
    import { filter, find, includes }                           from "lodash";
    import Activity                                             from "@app/modules/activity/activity";

    export default defineComponent({
        name: "modal-recap",

        props: {
            modalName: { type: String, required: false, default: 'modal-recap' },
            open     : { type: Boolean, required: false, default: false },
            partner  : { type: Partner, required: true },
        },

        emits: [ 'save', 'close' ],

        setup(props, { emit }) {
            ////////// init

            ////////// data
            const visible = ref<boolean>(false)

            ////////// computed
            // @ts-ignore
            const activity = computed((): Activity => find(activities.value, item => item.id === props.partner.activityId))
            const subDomains = computed((): Activity[] => activity.value ? filter(activity.value.activities, item => includes(props.partner.activities, item.id)) : [])

            ////////// methods
            const save = () => emit('save')
            const closeModal = () => emit('close')

            onMounted(async () => await fetchActivities(true))
            watch(() => props.open, () => visible.value = props.open, { immediate: true })

            return {
                visible,
                //// computed
                activity,
                subDomains,

                //// methods
                save,
                closeModal,
            }
        },

        data: () => ({
            itemKeys: [
                'lastname',
                'firstname',
                'email',
                'phone',
                'companyName',
                'siret',
                'activityId',
                'activities',
                'description',
            ]
        })

    })
</script>

<style lang="scss">

    .modal-recap-partner {
        .modal-content {
            width: 600px !important;
            right: 0;
            left: 0;
        }
    }

</style>
