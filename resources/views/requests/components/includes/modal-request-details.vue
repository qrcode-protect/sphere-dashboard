<template>
    <ssf-modal v-model="visible"
               :name="modalName"
               attach="#app"
               body-classes="pt-2 border-0"
               classes="modal-container modal-request-details"
               content-class="modal-content z-depth-1 full-flex rounded mx-auto"
               fit-parent
               header-classes="pt-4 pb-2 d-block border-0"
               lock-scroll
               scrollable
               @before-close="closeModal">

        <template #header>

            <ssf-title center class="font-weight-semi-bold" h5>{{ request.title?.toUpperCase() }}</ssf-title>

        </template>

        <template #body>

            <ul style="list-style: none">
                <li v-for="key in keys" class="py-2">

                    <ssf-row>

                        <ssf-col class="border-right font-weight-bold" max-width="150">{{ key.label }}</ssf-col>
                        <ssf-col>{{ key.casts ? key.casts(request[key.prop]) : request[key.prop] }}</ssf-col>

                    </ssf-row>

                </li>
            </ul>

            <ssf-row v-if="request.accepted">

                <ssf-col class="text-center" size="12">

                    <ssf-title h5>
                        Devis <span class="secondary-item-small"> - {{ quotationStatus }}</span>
                    </ssf-title>

                </ssf-col>

                <ssf-col class="text-center py-2" size="12">

                    <button class="btn border border-color-1 color-1" @click="$emit('show-quotation', request.quote)">
                        Voir le devis
                    </button>

                </ssf-col>

            </ssf-row>


        </template>

    </ssf-modal>
</template>

<script lang="ts">
    import { defineComponent, ref, watch } from "vue"

    import Request        from '@app/modules/request/request'
    import { Moment }     from "moment";
    import { useRequest } from "@app/modules/request/request-module";
    import { useStore }   from "vuex";

    // @ts-ignore
    import SwalConfig   from "@app/vue/utils/swal/config";
    import { Nullable } from "../../../../../types/nullable";

    interface SendMessageParameters {
        amount?: number,
        expiresAt?: Nullable<Moment>
    }

    export default defineComponent({
        name: "modal-request-details",


        props: {
            modalName: { type: String, required: false, default: 'modal-request-details' },
            open     : { type: Boolean, required: false, default: false },
            request  : { type: Request, required: true },
        },

        emits: [ 'close', 'show-quotation' ],

        setup(props, { emit }) {
            ////////// init

            const store = useStore()

            const visible = ref<boolean>(false)

            watch(() => props.open, () => visible.value = props.open, { immediate: true })

            const { quotationStatus } = useRequest(props.request)

            return {
                quotationStatus,

                visible,
                closeModal: () => emit('close'),

                keys: ([
                    {
                        icon : 'user',
                        prop : 'fullName',
                        label: "Nom complet",
                        casts: (value: Nullable<string>) => value?.wordCapitalize()
                    },
                    {
                        icon : 'user',
                        prop : 'email',
                        label: "Adresse e-mail",
                        casts: () => props.request?.member.email?.toLowerCase() ?? 'N/D'
                    },
                    {
                        icon : 'user-cowboy',
                        prop : 'user.company.label',
                        label: "Société",
                        casts: () => props.request?.member.companyName?.capitalize() ?? 'N/D'
                    },
                    {
                        icon : 'tally',
                        prop : 'description',
                        label: "Description",
                    }
                ])

            }
        },

        methods: {}
    })
</script>

<style lang="scss">

    .modal-request-details {
        z-index: 99999;

        .modal-content {
            width: 650px !important;
            top: 80px;
            right: 0;
            left: 0;
        }
    }

</style>
