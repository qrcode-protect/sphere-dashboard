<template>

    <ssf-modal v-model="open"
               :click-to-close="false"
               :esc-to-close="false"
               :name="modalName"
               attach="#app"
               body-classes="pt-4 border-0"
               classes="modal-container full-flex"
               content-class="modal-content z-depth-1 full-flex modal-data-information rounded"
               fit-parent
               footer-classes="p-2 border-0 align-flex"
               header-classes="pt-4 d-block border-0"
               lock-scroll>

        <template #header>

            <ssf-container>

                <ssf-container class="modal-header-icon full-flex mx-auto border-color-2 btn--corners" not-full>
                    <span><ssf-icon icon="user-plus" size="1x5" thin/></span>
                </ssf-container>

            </ssf-container>

            <hr class="w-75 mt-4">

        </template>

        <template #body>

            <ssf-row v-if="error" class="mb-3">

                <ssf-col class="form-fallback-container align-flex text-danger"
                         size="12">

                    <ssf-icon class="mr-2"
                              icon="times-circle"
                              light
                              size="1x5"/>

                    <span v-html="error"></span>
                </ssf-col>

            </ssf-row>

            <form style="padding-bottom: 75px" @submit.prevent="save">

                <qrcp-input :errors="errors"
                            :value="user.lastname"
                            icon="user"
                            label="Nom de famille"
                            name="lastname"
                            required
                            row
                            @update:value="event => user.lastname = event"/>

                <qrcp-input :errors="errors"
                            :value="user.firstname"
                            icon="user-alt"
                            label="Prénom"
                            name="firstname"
                            required
                            row
                            @update:value="event => user.firstname = event"/>

                <qrcp-input :errors="errors"
                            :value="user.email"
                            icon="at"
                            label="Adresse e-mail"
                            name="email"
                            required
                            row
                            @input="onEmailInput"
                            @update:value="event => user.email = event"/>

                <qrcp-input :errors="errors"
                            :option-items="roles"
                            :value="user.roleType"
                            name="roleType"
                            option-field="name"
                            option-label="label"
                            required
                            row
                            select
                            wheel-propagation
                            @update:value="event => user.roleType = event"/>

            </form>

        </template>

        <template #footer>
            <ssf-row class="cursor-pointer">

                <ssf-col class="text-center" size="6" @click="cancel">

                    <button class="btn text-danger" type="button">

                        <ssf-icon icon="ban" light size="2x"/>

                    </button>

                </ssf-col>

                <ssf-col class="text-center" size="6" @click="save">

                    <button class="btn text-success" type="button">

                        <ssf-icon icon="floppy-disk-circle-arrow-right" light size="2x"/>

                    </button>

                </ssf-col>

            </ssf-row>

        </template>

    </ssf-modal>

</template>

<script>

    import { computed, defineComponent, getCurrentInstance, ref } from "vue";
    import { filter }                                             from 'lodash'

    import { filled }          from "@app/commons";
    import { roles as xRoles } from "@app/commons/auth";
    import { create }          from "../utils";

    import { validate, validator as xValidator } from "@app/commons/validation";
    import QrcpInput                             from "@/components/commons/qrcp-input";
    import MainSuccess                           from "@app/vue/utils/swal/success/main-success";

    export default defineComponent({
        name      : "modal-create-user",
        components: { QrcpInput },
        props     : {
            modalName: { type: String, required: false, default: 'modal-create-user' },
            open     : { type: Boolean, required: false, default: false },
        },

        emits: [ 'close', 'save', 'created' ],

        setup(props, { emit }) {

            ////////// init
            const ctx = getCurrentInstance().ctx

            ////////// data
            const user = ref({
                lastname : null,
                firstname: null,
                email    : null,
                roleType : null
            })
            // form
            const errors = ref([])
            const error = ref(null)
            const success = ref(null)
            const loading = ref(false)


            ////////// methods
            const close = () => emit('close')
            const cancel = () => close()
            const validator = () => {
                if (validate.email(user.value.email)) {
                    const result = xValidator(user.value)
                    error.value = result.error
                    errors.value = result.errors
                    return result.valid
                }
                ctx.onEmailInput()
                error.value = 'Merci de vérifier le formulaire.'
                return false
            }
            const save = () => {
                if (loading.value)
                    return false

                if (validator()) {

                    if (filled(user.value.firstname) && filled(user.value.lastname) && filled(user.value.email)) {
                        loading.value = true

                        error.value = null

                        create({
                            lastname : user.value.lastname,
                            firstname: user.value.firstname,
                            email    : user.value.email,
                            roleType : user.value.roleType
                        })
                            .then(() => {
                                MainSuccess.fire({ allowOutsideClick: false }).then(() => {
                                    close()
                                    emit('created')
                                })
                                // return close();
                            })
                            .catch((e) => error.value = e?.message ?? 'Merci de réessayer plus tard')
                            .finally(() => loading.value = false)
                    }
                }
            }

            ////////// computed
            const roles = computed(() => filter(xRoles(), role => role.label = role.label.capitalize()))


            return {
                //// data
                user,
                // form
                errors,
                error,
                success,
                loading,

                //// computed
                roles,

                //// methods
                save,
                cancel


                //// tools
            }
        },

        methods: {
            onEmailInput() {
                this.onFieldInput('email')
            },

            onFieldInput(field) {
                if (!validate[field](this.user[field])) {
                    if (!this.errors.includes(`${field}.format`))
                        this.errors.push(`${field}.format`)
                } else this.errors = this.errors.filter(item => item !== `${field}.format`)
            },

        }

    })
</script>

<style lang="scss">

    .modal-data-information {

        width: 500px !important;
        overflow-x: hidden;

        .records-input {
            .ssf-form-number {
                .ssf-number-control {
                    display: none !important;
                }
            }
        }

        .ssf-form-checkbox {
            label {
                margin-bottom: 0 !important;
            }
        }

        .modal-header-icon {
            position: relative;
            display: inline-block;
            border: 4px double black;
            border-radius: 50%;
            width: 60px;
            height: 60px;

            span {
                z-index: 1050 !important;
            }

            &:before, &:after {
                content: "";
                position: absolute;
                background-color: white;
                border-radius: 30%;
            }

            &::before {
                height: calc(100% + 10px);
                width: 50%;
                top: -5px;
                left: 25%;
            }

            &::after {
                height: 50%;
                width: calc(100% + 10px);
                top: 25%;
                left: -5px;
            }
        }
    }

</style>
