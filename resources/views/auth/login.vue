<template>
    <auth id="login">

        <template v-if="error" v-slot:error><span v-html="error"></span></template>

        <template v-slot:form>

            <form id="formLogin" class="w-100" novalidate @submit.prevent="login()">

                <ssf-form-group :errors="errors"
                                :icon="{icon: 'user', weight: 'light'}"
                                :value="user.email"
                                col="col-12"
                                label="Adresse e-mail ou nom d'utilisateur"
                                name="email"
                                required
                                row
                                @update:value="event => user.email = event"/>

                <ssf-form-group :errors="errors"
                                :icon="{icon: 'lock', weight: 'light'}"
                                :value="user.password"
                                col="col-12"
                                label="Mot de passe"
                                name="password"
                                required
                                row
                                type="password"
                                @update:value="event => user.password = event"/>

                <ssf-form-group :value="user.remember"
                                col="col-12"
                                form-group-class="mid-flex"
                                label="Se souvenir de moi"
                                name="remember"
                                row
                                type="checkbox"
                                @update:value="event => user.remember = event"/>

                <!--                <ssf-row>

                                    <ssf-col class="ssf-form-group mt-1" size="12">

                                        <router-link :to="{name: 'password.forgot', query}" class="mid-flex">
                                            <icon class="mr-1" icon="lock-forgot-color"/>
                                            Mot de passe oublié
                                        </router-link>

                                    </ssf-col>

                                </ssf-row>-->

                <ssf-row>

                    <ssf-col class="ssf-form-group text-right mt-1" size="12">
                        <button class="btn bg-color-2 btn-block mb-0" type="submit">Connexion</button>
                    </ssf-col>

                </ssf-row>

                <!--                <ssf-row>

                                    <ssf-col class="ssf-form-group mt-0" size="12">
                                        <button class="btn bg-color-4 btn-block" @click.prevent="navigate.register()">
                                            Créer mon compte
                                        </button>
                                    </ssf-col>

                                </ssf-row>-->

            </form>

        </template>

    </auth>
</template>

<script lang="ts">
    import { defineComponent, onMounted, reactive, ref } from "vue";
    import { useMeta }                                   from "vue-meta";
    import Auth                                          from "./auth.vue";
    import { login, navigate, UserLoginParameter }       from "@/views/auth/utils";
    import Icon                                          from "@/components/commons/partials/icon.vue";
    import { urlParams }                                 from "@app/vue/utils";
    import { validator as xValidator }                   from "@app/commons/validation";
    // @ts-ignore
    import MainError                                     from "@app/vue/utils/swal/errors/main-error";
    import { Nullable }                                  from "../../../types/nullable";
    import { useStore }                                  from "vuex";

    import cookie from '@sofiakb/cookie'

    export default defineComponent({
        name      : "login",
        components: { Icon, Auth },
        setup() {
            useMeta({ title: 'Connexion', })

            ////////// data
            const error = ref<Nullable<string>>(null)
            const user = reactive<UserLoginParameter>({ email: null, password: null, remember: false })
            const query = ref({})
            const errors = ref([])
            const loading = ref(false)


            ////////// mounted
            onMounted(() => {
                query.value = urlParams()
            })


            ////////// methods
            const validator = () => {
                const result = xValidator(user)
                // errors.value = result.errors
                error.value = result.error
                return result.valid
            }
            // const login = () => login(user).catch((err) => error.value = err.message)

            return {
                //// data
                error,
                user,
                query,
                errors,
                loading,

                //// methods
                validator,
                // login,

                //// composition
                navigate,

                tokenName: (useStore()).getters.TOKEN_NAME
            }
        },

        methods: {
            login() {
                if (this.loading)
                    return false

                this.loading = true

                this.error = null

                if (this.validator())
                    return login(this.user)
                        .then((response) => {
                            cookie.set(this.tokenName, response.token.bearer)
                            this.$router.push({ name: 'members.index' })
                            this.loading = false
                        })
                        .catch((error) => {
                            this.loading = false
                            return this.error = error.message;
                        })
                        .finally(() => this.loading = false)
                else this.loading = false

                /*if (this.validator()) {
                    if (this.user.email === 'sphere-dev' && this.user.password === 'spheredev') {
                        this.$localStorage.set('token', 'ok')
                        this.$router.push({ name: 'members.index' })
                        // location.reload()
                    } else {
                        this.error = "Merci de vérifier vos identifiants."
                    }
                    this.loading = false
                } else {
                    this.loading = false
                }*/


                /*this.$controller.auth
                 .login(this.user)
                 .then(() => location.reload())
                 .catch((error) => this.error = error)*/
            },
            /*login() {

             if (this.loading)
             return false

             this.loading = true

             this.error = null
             if (this.validator())
             return login(this.user).catch((error) => this.error = error.message).finally(() => this.loading = false)
             else this.loading =false
             }*/
        }
    })
</script>

<style lang="scss" scoped>
</style>
