<template>
    <ssf-modal v-model="open"
               :click-to-close="false"
               :esc-to-close="false"
               :name="modalName"
               attach="#app"
               body-classes="p-5 border-0"
               classes="modal-container full-flex"
               content-class="modal-content z-depth-1 full-flex modal-data-information rounded"
               fit-parent
               footer-classes="p-2 border-0 align-flex"
               header-classes="pt-4 d-block border-0"
               lock-scroll>

        <template #body>

            <ssf-container>

                <ssf-row v-for="itemKey in itemKeys" class="py-1">

                    <ssf-col size="5" style="font-weight: 600">
                        {{ partner.attributes[itemKey].comment ?? itemKey }}
                    </ssf-col>

                    <ssf-col size="7">
                        {{ itemKey === 'activityId' ? activity : partner[itemKey] }}
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
    import { computed, defineComponent } from "vue"
    import Partner                       from "@app/modules/partner/partner";
    import { activities }                from "@app/commons/activities";
    import { find }                      from "lodash";

    export default defineComponent({
        name: "modal-recap",

        props: {
            modalName: { type: String, required: false, default: 'modal-recap' },
            open     : { type: Boolean, required: false, default: false },
            partner  : { type: Partner, required: true },
        },

        setup(props, { emit }) {
            ////////// init

            ////////// data

            ////////// computed
            // @ts-ignore
            const activity = computed(() => find(activities.value, item => item.id === props.partner.activityId).label ?? 'N/D')

            ////////// methods
            const save = () => emit('save')

            return {
                //// computed
                activity,

                //// methods
                save
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
            ]
        })

    })
</script>

<style lang="scss" scoped>

</style>
