<template>
    <ssf-container class="sidebar color-1 bg-color-1 z-depth-0 h-100" name="sidebar">

        <ssf-container class="side-container sfkb-sphere-container">

            <!-- Navbar brand -->
            <ssf-container class=" py-4">
                <a class="sidebar-brand color-1" href="#">
                    <logo id="sidebarLogo" :height="22" class="d-block mx-auto"/>
                </a>
            </ssf-container>

            <!-- Collapsible content -->
            <div id="basicExampleNav" class="collapse sidebar-collapse show">


                <!-- Links -->
                <ul class="sidebar-side pl-0">

                    <li v-for="link in links"
                        :class="{'active': isActive(link), 'd-none': link.visible === false}"
                        class="side-item">

                        <!--                                     :class="{'active color-2': isActive(link)}"-->
                        <router-link v-if="link.name && exists(link.name) && link.visible !== false"
                                     :class="linkClass(link)"
                                     :to="{name: link.name, params: link.params}"
                                     class="side-link text-white p-0">


                            <ssf-row class="side-link-label">

                                <ssf-container class="side-link-label-content">

                                    <ssf-row>

                                        <ssf-col class="" no-padding size="2">

                                            <span v-if="link.icon">
                                                <ssf-icon :icon="link.icon" light/>
                                            </span>

                                        </ssf-col>

                                        <ssf-col no-padding size="10">

                                            {{ link.label }}

                                        </ssf-col>

                                    </ssf-row>

                                </ssf-container>

                            </ssf-row>

                            <span v-if="isActive(link)" class="sr-only">(current)</span>

                            <div class="active-hover-line bg-white mx-auto"></div>

                        </router-link>

                        <a v-else-if="link.url" :href="link.url" class="side-link align-flex" target="_blank">
                            {{ link.label }}
                        </a>

                    </li>

                    <li class="side-item position-absolute text-white cursor-pointer py-2 w-100"
                        style="bottom: 20px; left: 0; right: 0"
                        @click="logout">

                        <ssf-row class="side-link-label">

                            <ssf-container class="side-link-label-content">

                                <ssf-row>

                                    <ssf-col no-padding size="2">

                                            <span>
                                                <ssf-icon icon="sign-out" light/>
                                            </span>

                                    </ssf-col>

                                    <ssf-col no-padding size="10">

                                        Déconnexion

                                    </ssf-col>

                                </ssf-row>

                            </ssf-container>

                        </ssf-row>


                        <div class="active-hover-line bg-white mx-auto"></div>

                    </li>

                    <li class="side-item position-absolute text-white py-1 w-100"
                        style="bottom: 0; left: 0; right: 0">

                        <ssf-row class="side-link-label">

                            <ssf-container class="side-link-label-content">

                                <ssf-row>

                                    <ssf-col no-padding size="10" class="text-center small ml-0">

                                        <span class="small">v{{ version }}</span>

                                    </ssf-col>

                                </ssf-row>

                            </ssf-container>

                        </ssf-row>


                        <div class="active-hover-line bg-white mx-auto"></div>

                    </li>

                </ul>


                <!-- Links -->
            </div>
            <!-- Collapsible content -->

        </ssf-container>


    </ssf-container>
</template>

<script>

    // import '@sofiakb/vue-element/assets/mdb.min'

    import { computed, defineComponent, onBeforeMount, onMounted, ref, watch } from "vue";
    import { useStore }                                                        from "vuex";
    import { useRouter }                              from "vue-router";
    import cookie                                     from "@sofiakb/cookie";

    import Logo                    from "@/components/commons/logo";
    import { user as currentUser } from "@app/commons/auth";
    import { routeExists }         from "@app/commons";

    export default defineComponent({
        name: "x-sidebar",

        components: { Logo },


        props: {
            links: { type: Array, required: true }
        },

        setup() {
            ////////// init
            const router = useRouter()

            ////////// data
            const user = ref(null)
            const firstname = ref(null)

            onBeforeMount(async () => user.value = await currentUser())
            watch(() => user.value, () => firstname.value = user.value?.firstname?.capitalize(), { immediate: true })

            const version = computed(() => process.env.VERSION)

            ////////// methods
            const exists = routeExists

            return {
                version,
                user,
                firstname,
                exists,
                tokenName: (useStore()).getters.TOKEN_NAME
            }
        },

        methods: {
            isActive(link) {
                if (!this.$route.name)
                    return false
                return (link.routes && link.routes.includes((this.$route.name ? this.$route.name.toLowerCase() : ''))) || (link.name && link.name.toLowerCase() === this.$route.name.toLowerCase())
            },

            linkClass(link) {
                if (this.$route.name)
                    return this.isActive(link)
                           ? `active ${link.color}`
                           : ''
                return ''
            },

            logout() {
                cookie.delete(this.tokenName)
                location.reload()
            }
        }

    })
</script>

<style lang="scss">

    .ssf__section--sidebar.sidebar {
        z-index: 1050 !important;
        padding: 0 !important;


        #sidebarLogo {
            min-height: 20px !important;
        }

        .active-hover-line {
            height: 1px;
            width: 0;
            transition: width .5s;
            //margin-top: 13px;
        }

        .side-item {

            list-style-type: none !important;

            &.active {
                .side-link-label .side-link-label-content {
                    border-left: 2px solid var(--color-2) !important;
                    color: var(--color-2)
                }
            }

            .side-link-label {
                .side-link-label-content {
                    padding-left: 13px;
                }

                padding: 13px 20px 13px 0 !important;
            }

            .side-link {
                font-weight: 400;

                &:hover /*, &.active*/
                {
                    .active-hover-line {
                        width: 100% !important;
                    }
                }
            }

        }

    }


</style>
