<template>

    <ssf-container name="step-personal-information">

        <ssf-row>

            <qrcp-input :errors="errors"
                        :value="member.lastname"
                        col="col-12 col-md-6"
                        icon="member"
                        label="Nom"
                        name="lastname"
                        required
                        @update:value="(event) => member.lastname = event"/>

            <qrcp-input :errors="errors"
                        :value="member.firstname"
                        col="col-12 col-md-6"
                        icon="member-alt"
                        label="Prénom"
                        name="firstname"
                        required
                        @update:value="(event) => member.firstname = event"/>
        </ssf-row>

        <ssf-row>

            <qrcp-input :errors="errors"
                        :value="member.email"
                        icon="at"
                        label="Adresse e-mail"
                        name="email"
                        required
                        row
                        @input="onEmailInput"
                        @update:value="(event) => member.email = event"/>

            <qrcp-input :errors="errors"
                        :value="member.phone"
                        icon="mobile"
                        label="Numéro de téléphone"
                        name="phone"
                        required
                        row
                        type="tel"
                        @input="onPhoneInput"
                        @update:value="(event) => member.phone = event"/>

        </ssf-row>

        <next-button @next:step="next"/>

    </ssf-container>

</template>

<script lang="ts">
    import { defineComponent, getCurrentInstance, PropType } from "vue"
    import Partner                                           from "@app/modules/member/member";
    import NextButton
                                                             from "@/views/members/components/includes/form-create/steps/next-button.vue";
    import QrcpInput                                         from "@/components/commons/qrcp-input.vue";
    import { validate, validator as xValidator }             from "@app/commons/validation";
    import { Nullable }                                      from "../../../../../../../types/nullable";

    export default defineComponent({
        name: "personal-informations",

        components: { QrcpInput, NextButton },

        props: {
            member: { type: Partner, required: true },
            errors : { type: Array, required: true },
        },

        emits: [ 'next:step', 'has:error' ],

        setup(props, { emit }) {
            ////////// init
            // @ts-ignore
            const ctx: any = getCurrentInstance()?.ctx

            ////////// methods
            const next = () => {

                const result = xValidator({
                    email    : props.member.email,
                    firstname: props.member.firstname,
                    lastname : props.member.lastname,
                    phone    : props.member.phone,
                })

                if (!result.valid) {
                    return emit('has:error', { error: result.error, errors: result.errors })
                } else if (validate.email(props.member.email!) && validate.phone(props.member.phone!)) {
                    return emit('next:step');
                } else {
                    ctx.onEmailInput()
                    ctx.onPhoneInput()
                }

            }

            return {
                next
            }
        },

        methods: {
            onEmailInput() {
                this.onFieldInput('email')
            },

            onPhoneInput() {
                this.onFieldInput('phone')
            },

            onFieldInput(field: any) {
                // @ts-ignore
                if (!validate[field](this.member[field])) {
                    if (!this.errors.includes(`${field}.format`))
                        this.errors.push(`${field}.format`)
                } else this.$emit('has:error', { errors: this.errors.filter(item => item !== `${field}.format`) })
            },
        }

    })
</script>

<style lang="scss" scoped>

</style>
