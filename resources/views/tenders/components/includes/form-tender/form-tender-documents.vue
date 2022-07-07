<template>
    <ssf-container name="form-tender-documents">

        <qrcp-input v-for="_document in documents"
                    v-if="showInputFile"
                    :errors="errors"
                    :label="_document.label"
                    :name="_document.key"
                    :required="_document.required"
                    :value="tender[_document.key]"
                    icon="file-pdf"
                    mimes="jpg, jpeg, png, gif, pdf"
                    row
                    type="file"
                    @change="onFileChange"/>

        <ssf-row>

            <ssf-col no-padding size="6">

                <form-prev-button @prev="$emit('prev')"/>

            </ssf-col>

            <ssf-col no-padding size="6">

                <form-next-button @next="onNext" text="Enregistrer"/>

            </ssf-col>

        </ssf-row>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, ref, watch } from "vue"
    import { useTenderForm }               from "@app/modules/tender/tender-module";
    import QrcpInput                       from "@/components/commons/qrcp-input.vue";
    import { useForm }                     from "@app/commons/form";
    import FormNextButton                  from "@/views/tenders/components/includes/form-tender/form-next-button.vue";
    import FormPrevButton                  from "@/views/tenders/components/includes/form-tender/form-prev-button.vue";
    import { useFormFile }                 from "@app/modules/common-module";
    import Tender                          from "@app/modules/tender/tender";

    export default defineComponent({
        name: "form-tender-documents",

        components: { FormPrevButton, FormNextButton, QrcpInput },

        emits: [ 'next', 'prev' ],

        props: {
            tender: { type: Tender, required: true },
            isEdition: { type: Boolean, required: false, default: false },
        },

        setup(props, { emit }) {
            ////////// init

            const { errors, validator } = useForm()
            const { showInputFile, onFileChange, file } = useFormFile()

            const documents = ref([
                { key: 'file', required: true, label: 'Appel d\'offres' },
            ])

            const onNext = () => {
                const tenderValue = props.tender
                return props.isEdition || validator({
                    file    : tenderValue.file,
                }) ? emit('next') : null
            }

            watch(() => file.value, () => props.tender.file = file.value, { immediate: true })

            return {
                //// form module
                errors,

                onNext,
                documents,

                //// form file module
                showInputFile,
                onFileChange
            }
        }
    })
</script>

<style lang="scss" scoped>

    .form-tender-documents {

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
