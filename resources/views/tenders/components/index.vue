<template>
    <ssf-container name="tenders">

        <page-title title="Bourse aux affaires"/>

        <ssf-container class="tender-nav-tabs mx-auto" not-full>

            <ssf-row class="px-3">

                <ssf-col v-for="tab in tabs"
                         :class="{'border-bottom border-strong border-color-1': tab.tabIndex === currentTab}"
                         class="tender-nav-tab-item py-3 cursor-pointer"
                         @click="onTabChange(tab.tabIndex)">
                    <span>{{ tab.title }}</span>
                </ssf-col>

            </ssf-row>

        </ssf-container>

        <list-tenders v-if="hasTenders" :tenders="tenders"/>

        <ssf-container v-else class="p-3" full-flex>

            <ssf-text class="secondary-item">
                Aucune affaire
            </ssf-text>

        </ssf-container>

        <!--        <router-link :to="{name: 'partners.create'}" class="btn-create-tender">
                    <ssf-shape size="75"  circle class="bg-color-2 full-flex text-white z-depth-1">
                        <ssf-icon icon="layer-plus" size="2x" light/>
                    </ssf-shape>
                </router-link>-->

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, ref, watch } from "vue";
    import { useMeta }                     from "vue-meta";
    import { useTenders }                  from "@app/modules/tender/tender-module";
    import ListTenders                     from "@/views/tenders/components/includes/list-tenders/list-tenders.vue";
    import PageTitle                       from "@/components/commons/partials/page-title.vue";


    enum TenderTabs {
        active,
        inactive
    }

    export default defineComponent({
        name: "tenders-index",

        components: { PageTitle, ListTenders },

        setup() {
            ////////// init
            useMeta({ title: 'Bourse aux affaires', })


            const { hasTenders, tenders, fetchAllTenders, fetchActiveTenders, fetchInactiveTenders } = useTenders()


            // onMounted(() => fetchAllTenders())

            const currentTab = ref<TenderTabs>(TenderTabs.active)
            const onTabChange = (tabItem: TenderTabs) => currentTab.value = tabItem

            watch(() => currentTab.value, async () => {
                if (currentTab.value === TenderTabs.active) {
                    await fetchActiveTenders()
                } else await  fetchInactiveTenders()
            }, { immediate: true })

            return {
                //// tender module
                tenders,
                hasTenders,

                currentTab,
                onTabChange
            }
        },

        data: () => ({
            tabs: [ {
                title   : "Affaires validées",
                tabIndex: TenderTabs.active
            }, {
                title   : "En attente de validation",
                tabIndex: TenderTabs.inactive
            } ]
        })
    })
</script>

<style lang="scss" scoped>

    .ssf__section--tenders {

        .tender-nav-tabs {
            width: 650px;
        }

        .btn-create-tender {
            position: fixed;
            right: 20px;
            bottom: 20px;
        }

    }

</style>
