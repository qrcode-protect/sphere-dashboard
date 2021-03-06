<template>
    <ssf-container name="step-document">

        <qrcp-input v-if="showInputFile"
                    :errors="errors"
                    :value="member.certificate"
                    icon="file-certificate"
                    label="KBIS adhérent"
                    mimes="jpg, jpeg, png, gif, pdf"
                    name="certificate"
                    required
                    row
                    type="file"
                    @change="onFileChange"/>

        <ssf-row>

            <ssf-col no-padding size="6">
                <previous-button @previous:step="$emit('previous:step')"/>
            </ssf-col>

            <ssf-col no-padding size="6">
                <next-button @next:step="next"/>
            </ssf-col>

        </ssf-row>

        <file-preview v-if="certificateUrl" :src="certificateUrl"/>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, ref }    from "vue"
    import Partner                     from "@app/modules/member/member";
    import PreviousButton              from "@/views/members/components/includes/form-create/steps/previous-button.vue";
    import NextButton                  from "@/views/members/components/includes/form-create/steps/next-button.vue";
    import QrcpInput                   from "@/components/commons/qrcp-input.vue";
    import { validator as xValidator } from "@app/commons/validation";
    import { Nullable }                from "../../../../../../../types/nullable";
    import { isPdf }                   from "@app/commons/file";
    import FilePreview                 from "@/components/commons/file-preview.vue";
    import { defined }                 from "@app/commons";

    export default defineComponent({
        name      : "documents",
        components: { FilePreview, QrcpInput, NextButton, PreviousButton },

        props: {
            member: { type: Partner, required: true },
            errors: { type: Array, required: true },
        },

        emits: [ 'next:step', 'previous:step', 'has:error' ],

        setup(props, { emit }) {
            ////////// init

            ////////// data
            const showInputFile = ref(true)
            const isCertificatePdf = ref<Nullable<boolean>>(null)
            const certificateUrl = ref<Nullable<string>>(null)

            ////////// computed

            ////////// methods
            const onFileChange = (e: any) => {
                let event = (e || window.event);
                props.member.certificate = ((event.target || event.dataTransfer).files ?? [])[0] ?? null;
                // @ts-ignore
                isCertificatePdf.value = isPdf(props.member.certificate?.type);
                // @ts-ignore
                certificateUrl.value = defined(props.member.certificate) && !isCertificatePdf.value ? URL.createObjectURL(props.member.certificate!) : null;
            }
            const next = () => {

                const result = xValidator({
                    certificate: props.member.certificate,
                })

                return result.valid ? emit('next:step') : emit('has:error', {
                    error : result.error,
                    errors: result.errors
                })
            }

            return {
                //// data
                showInputFile,
                isCertificatePdf,
                certificateUrl,

                //// methods
                onFileChange,
                next
            }
        }

    })
</script>

<style lang="scss" scoped>

</style>
