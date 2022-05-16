<template>
    <ssf-container class="auth-container" name="auth" not-full>

        <ssf-row class="h-100">

            <ssf-col :sm="formContainerCol.sm"
                     :xs="formContainerCol.xs"
                     :md="formContainerCol.md"
                     :lg="formContainerCol.lg"
                     :xl="formContainerCol.xl"
                     class="mr-auto p-2"
                     style="transition: all .5s">

                <ssf-container class="bg-color-1 rounded h-100">

                    <ssf-container class="mx-auto form-container full-flex h-100" name="auth-form" not-full>

                        <ssf-container>

                            <ssf-row>

                                <ssf-col class="text-center my-4" size="12">
                                    <ssf-container class="p-3 mb-2 rounded" not-full>
                                        <logo class="d-block mx-auto auth-logo"/>
                                    </ssf-container>

                                    <label class="small grey-text font-italic">{{ application.label }}</label>
                                    <hr class="w-75 my-4 bg-white">
                                </ssf-col>

                            </ssf-row>

                            <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut">

                                <ssf-row v-if="hasSlot('error') || hasSlot('success')" class="col-12 mb-3">

                                    <ssf-col :class="{'danger': hasSlot('error'), 'success': hasSlot('success')}"
                                             class="form-fallback-container align-flex"
                                             size="12">

                                        <ssf-icon :icon="`${hasSlot('error') ? 'times-circle': 'check-circle'}`"
                                                  class="mr-2"
                                                  size="1x5"
                                                  light/>

                                        <slot name="error"/>
                                        <slot name="success"/>

                                    </ssf-col>

                                </ssf-row>

                            </transition>

                            <ssf-row>
                                <slot name="form"/>
                            </ssf-row>

                        </ssf-container>

                    </ssf-container>

                </ssf-container>


            </ssf-col>

            <ssf-container
                v-if="background"
                class="full-absolute position-fixed bg-overlay bg-white behind" style="opacity: .2"/>

            <img :src="background"
                 v-if="background"
                 alt="Background image"
                 class="full-absolute position-fixed auth-img-bg img-fluid behind" style="z-index: -2 !important;">

        </ssf-row>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from "vue";
    import { useStore }                        from "vuex";
    import { hasSlot }                         from "@app/vue/utils";
    import Logo                                from "@/components/commons/logo.vue";


    export default defineComponent({
        name      : "auth",
        components: { Logo },

        setup() {

            const store = useStore()

            const application: Nullable<any> = ref({ label: "Dashboard" })
            const background = ref(null)
            const formContainerCol = ref({
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12,
                xl: 12,
            })

            onMounted(() => {
                application.value = { label: "Dashboard" }
                const image = 'auth.jpg'
                background.value = require(`@/assets/img/backgrounds/${image}`)
                formContainerCol.value = {
                    xs: 12,
                    sm: 10,
                    md: 9,
                    lg: 8,
                    xl: 7,
                }
                /*if (application) {
                    try {
                        const image = filter(applications, app => app.name === application.value.name)[0]?.image
                        background.value = require(`@/assets/img/backgrounds/${image}`)
                        formContainerCol.value = {
                            xs: 12,
                            sm: 9,
                            md: 8,
                            lg: 7,
                            xl: 6,
                        }
                    } catch (e) {
                        background.value = null
                    }
                }*/

            })

            return {
                application,
                background,
                formContainerCol,
                hasSlot
            }

        }

    })
</script>

<style lang="scss">
    .auth-container {
        height: 100vh;

        color: #FFFFFF;

        .ssf-form-group .ssf-form-control:focus + label, .ssf-form-group label.active {
            background-color: var(--color-1);
        }

        .ssf-form-group label {
            color: #FFFFFF;
        }

        .ssf-form-group .ssf-form-control {

                color: #FFFFFF !important;
            &, &:-webkit-autofill {
            }
        }

        .auth-bg-color {
            background: rgba(255, 255, 255, .9) !important;
        }

        .auth-img-bg {
            z-index: -1;
            min-width: calc(100vw + 10px);
            min-height: calc(100vh + 10px);
            -webkit-filter: blur(2px);
            filter: blur(2px);
            margin-top: -5px;
            margin-left: -5px;
        }

        .img-bg img {
            position: fixed !important;
        }

        .form-container {
            //min-height: 100vh;
            width: 450px;
            padding-left: 25px;
            padding-right: 25px;
            max-width: 100vh;
        }

        .auth-logo {
            height: 35px;
            width: auto;
        }

        .btn:not(:hover) {
            border-color: transparent !important;
        }

        @media screen and (max-width: 768px) {
            padding-left: 15px !important;
            padding-right: 15px !important;
        }

        .form-fallback-container {
            padding: 10px 15px;
            color: #ffffff;
            border-radius: var(--border-radius);
            border: 2px solid transparent;

            &.success {
                //border-left-color: var(--color-success) !important;
                //border-right-color: var(--color-success) !important;
                border-color: var(--color-success) !important;
                color: var(--color-success) !important;
            }

            &.danger {
                //border-left-color: var(--color-danger) !important;
                //border-right-color: var(--color-danger) !important;
                border-color: var(--color-danger) !important;
                color: var(--color-danger) !important;
            }
        }
    }
</style>
