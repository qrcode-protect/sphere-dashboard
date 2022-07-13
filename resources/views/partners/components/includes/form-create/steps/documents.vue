<template>
    <ssf-container name="step-document">

        <qrcp-input v-if="showInputFile"
                    :errors="errors"
                    :value="partner.certificate"
                    icon="file-certificate"
                    label="KBIS fournisseur"
                    mimes="jpg, jpeg, png, gif, pdf"
                    name="certificate"
                    required
                    row
                    type="file"
                    @change="onFileChange"/>

        <qrcp-input v-if="showInputFile"
                    :errors="errors"
                    :value="partner.avatar"
                    icon="image-polaroid"
                    label="Logo de la société"
                    mimes="jpg, jpeg, png, gif"
                    name="avatar"
                    required
                    row
                    type="file"
                    @change="onAvatarChange"/>

        <ssf-row>

            <ssf-col no-padding size="6">
                <previous-button @previous:step="$emit('previous:step')"/>
            </ssf-col>

            <ssf-col no-padding size="6">
                <next-button @next:step="next"/>
            </ssf-col>

        </ssf-row>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, ref }    from "vue"
    import Partner                     from "@app/modules/partner/partner";
    import PreviousButton              from "@/views/partners/components/includes/form-create/steps/previous-button.vue";
    import NextButton                  from "@/views/partners/components/includes/form-create/steps/next-button.vue";
    import QrcpInput                   from "@/components/commons/qrcp-input.vue";
    import { validator as xValidator } from "@app/commons/validation";

    export default defineComponent({
        name      : "documents",
        components: { QrcpInput, NextButton, PreviousButton },

        props: {
            partner: { type: Partner, required: true },
            errors : { type: Array, required: true },
        },

        emits: [ 'next:step', 'previous:step', 'has:error' ],

        setup(props, {emit}) {
            ////////// init

            ////////// data
            const showInputFile = ref(true)

            ////////// computed

            ////////// methods
            const onFileChange = (e: any) => {
                let event = (e || window.event);
                props.partner.certificate = ((event.target || event.dataTransfer).files ?? [])[0] ?? null;
            }
            const onAvatarChange = (e: any) => {
                let event = (e || window.event);
                props.partner.avatar = ((event.target || event.dataTransfer).files ?? [])[0] ?? null;
            }
            const next = () => {

                const result = xValidator({
                    certificate: props.partner.certificate,
                    avatar: props.partner.avatar,
                })

                return result.valid ? emit('next:step') : emit('has:error', {
                    error : result.error,
                    errors: result.errors
                })
            }

            return {
                //// data
                showInputFile,

                //// methods
                onFileChange,
                onAvatarChange,
                next
            }
        }

    })
</script>

<style lang="scss" scoped>

</style>
