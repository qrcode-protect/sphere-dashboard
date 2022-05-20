<template>
    <div id="vueApp">


        <metainfo>
            <template v-slot:title="{ content }">{{ content }} | SPHÈRE Dashboard</template>
        </metainfo>

        <!-- APPLICATION IS UP -->
        <ssf-container v-if="!maintenance" :style="`--sidebar-width: ${sidebarWidth}px;`" class="h-100 w-100">

            <ssf-row>
                <div v-if="$route.name !=='login' " class="px-0 sidebar-col position-fixed h-100" style="z-index: 1">
                    <x-sidebar :links="links"/>
                </div>

                <div v-if="$route.name !=='login'" class="sidebar-col">
                </div>


                <ssf-col class="col" no-padding>
                    <!-- MAIN CONTAINER -->
                    <div class="main-container">
                        <router-view v-slot="{ Component }">
                            <!--							<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">-->
                            <component :is="Component" v-if="loaded" :key="componentKey"/>
                            <!--							</transition>-->
                        </router-view>
                    </div>
                </ssf-col>

            </ssf-row>

            <!-- PRE LOAD -->
            <pre-load/>

            <!-- FORM LOAD-->
            <form-load/>

            <!-- FOOTER -->
            <!--			<x-footer/>-->

        </ssf-container>

        <maintenance v-else-if="maintenance"/>
    </div>
</template>

<script>
    import { computed, defineComponent, onBeforeMount, ref, watch } from "vue";
    import { useStore }                                             from "vuex";
    import { useMeta }                                              from 'vue-meta'
    import { filter, find, values }                                 from "lodash";

    import FormLoad    from '@/components/commons/loading/form-load'
    import PreLoad     from '@/components/commons/loading/pre-load'
    import XFooter     from '@/components/commons/partials/x-footer'
    import Maintenance from '@/components/maintenance'
    import XSidebar    from "@/components/commons/partials/x-sidebar";

    import { authorized, redirect, roles } from "@app/commons/auth";
    import { mapping }                     from "@app/vue/router/mapping";
    import { useRoute }                    from "vue-router";

    export default defineComponent({

        name      : 'App',
        components: { XSidebar, FormLoad, PreLoad, XFooter, Maintenance },

        setup() {
            ////////// init
            useMeta({
                // if no subcomponents specify a metaInfo.title, this title will be used
                title: '',
            })
            const store = useStore()
            const route = useRoute()

            ////////// data
            const loading = ref(true)
            const sidebarWidth = ref(200)
            const links = ref(values(mapping))
            const componentKey = ref(0)

            ////////// methods
            const update = {
                links: async () => links.value = await Promise.all(filter(links.value, async link => {
                    link.visible = await authorized((find(roles(), role => role.name === link.level) || { level: -1 }).level)
                    return link
                }))
            }

            ////////// computed
            const loaded = computed(() => !loading.value && !store.getters.preload)
            const maintenance = computed(() => store.getters.APP_MAINTENANCE && (store.getters.APP_MAINTENANCE === 'true' || store.getters.APP_MAINTENANCE === true))

            ////////// mount
            onBeforeMount(async () => {
                await store.dispatch('user/fetchCurrent').catch(error => error?.status === 401 || error?.status === 403 ? redirect.login.view() : null)
                await store.dispatch('role/fetchAll').catch(() => null)
                loading.value = false
            })

            ////////// watch
            watch(() => route.name, () => componentKey.value += 1)
            watch(() => componentKey.value, () => $(window).scrollTop(0))
            watch(() => store.getters['role/roles'], async () => await update.links());

            return {
                //// data
                links,
                sidebarWidth,
                componentKey,

                //// computed
                loaded,
                maintenance
            }
        },

        methods: {

            /*onCustomAction(action) {
             return eval(this[action]())
             },

             navigate(name) {
             return this.$router.push({ name })
             },*/

        }

    })
</script>

<style lang="scss">
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .main-container {
        min-height: 100vh;
    }

    .sidebar-col {
        height: 100vh;
        flex: 0 0 var(--sidebar-width);
        max-width: var(--sidebar-width);
        width: var(--sidebar-width);
    }

    .v--modal-overlay {
        z-index: 1051 !important;
    }
</style>
