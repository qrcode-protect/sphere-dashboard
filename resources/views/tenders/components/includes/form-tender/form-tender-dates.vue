<template>
    <ssf-container name="form-tender-dates">

        <ssf-row>

            <ssf-col  v-for="date in dates" size="12" md="5" lg="4" center>

                <ssf-container class="ssf-form-group qrcp-form-group has-slot">

                    <!-- TYPE : DEFAULT -->

                    <ssf-container class="ssf-input-container ssf-form-text">

                        <label class="active ssf__input-label" :class="{'label-required': date.required}">

                            <i class="fal fa-calendar-days fa-1x mr-1"></i>

                            <span>{{ date.label }}</span>

                        </label>

                        <input id="beginAt" v-model="tender[date.key]"
                               class="ssf-form-control qrcp-form-control qrcp-form-control"
                               inputmode="date"
                               :name="date.key"
                               :required="date.required"
                               type="date">

                    </ssf-container>

                </ssf-container>

            </ssf-col>


        </ssf-row>

        <ssf-row>

            <ssf-col no-padding size="6">

                <form-prev-button @prev="$emit('prev')"/>

            </ssf-col>

            <ssf-col no-padding size="6">

                <form-next-button @next="onNext"/>

            </ssf-col>

        </ssf-row>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue"
    import { useTenderForm }        from "@app/modules/tender/tender-module";
    import QrcpInput                from "@/components/commons/qrcp-input.vue";
    import { useForm }              from "@app/commons/form";
    import FormNextButton           from "@/views/tenders/components/includes/form-tender/form-next-button.vue";
    import FormPrevButton           from "@/views/tenders/components/includes/form-tender/form-prev-button.vue";
    import Tender                   from "@app/modules/tender/tender";

    export default defineComponent({
        name: "form-tender-dates",

        components: { FormPrevButton, FormNextButton, QrcpInput },

        emits: [ 'next', 'prev' ],

        props: {
            tender: { type: Tender, required: true }
        },

        setup(props, { emit }) {
            ////////// init

            const { errors, validator } = useForm()

            const dates = ref([
                { key: 'beginAt', required: false, label: 'Date de début' },
                { key: 'endAt', required: false, label: 'Date de fin' },
                { key: 'expiresAt', required: false, label: "Date d'expiration" },
            ])

            const onNext = () => {
                const tenderValue = props.tender
                return validator({
                    // beginAt    : tenderValue.beginAt,
                    // endAt: tenderValue.endAt,
                    // expiresAt   : tenderValue.expiresAt,
                }) ? emit('next') : null
            }

            return {
                //// form module
                errors,

                onNext,
                dates,
            }
        }
    })
</script>

<style lang="scss" scoped>

    .form-tender-dates {

        :deep(.members-search) {
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }

        :deep(.members-select) {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
        }

    }

</style>
