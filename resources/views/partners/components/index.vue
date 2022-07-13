<template>
	<ssf-container name="partners">

        <page-title title="Fournisseurs"/>

        <ssf-container class="partner-nav-tabs" not-full>

            <ssf-row class="px-3">

                <ssf-col class="partner-nav-tab-item py-3 cursor-pointer"
                         :class="{'border-bottom border-strong border-color-1': tab.tabIndex === currentTab}"
                         @click="onTabChange(tab.tabIndex)"
                         v-for="tab in tabs">
                    <span>{{ tab.title }}</span>
                </ssf-col>

            </ssf-row>

        </ssf-container>

        <ssf-container fluid>
            <active-partners v-if="currentTab === 1"/>
            <inactive-partners v-if="currentTab === 2"/>
        </ssf-container>


        <router-link :to="{name: 'partners.create'}" class="btn-create-partner">
            <ssf-shape size="75"  circle class="bg-color-2 full-flex text-white z-depth-1">
                <ssf-icon icon="layer-plus" size="2x" light/>
            </ssf-shape>
        </router-link>

	</ssf-container>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { useMeta }         from "vue-meta";
    import ActivePartners      from "@/views/partners/components/includes/active-partners.vue";
    import InactivePartners    from "@/views/partners/components/includes/inactive-partners.vue";
    import PageTitle           from "@/components/commons/partials/page-title.vue";

	export default defineComponent({
		name: "partners-index",

		components: { PageTitle, InactivePartners, ActivePartners },

		setup() {
			////////// init
			useMeta({ title: 'Fournisseurs', })


			////////// data


			////////// computed


			////////// methods


			return {
				//// data

				//// computed

				//// methods
			}
		},

        data: () => ({
            currentTab: 1,
            tabs: [ {
                title   : "Fournisseurs actifs",
                tabIndex: 1
            }, {
                title   : "En attente de validation",
                tabIndex: 2
            } ]
        }),

        methods: {
            onTabChange(tabItem: number) {
                this.currentTab = tabItem
            }
        }
	})
</script>

<style lang="scss" scoped>
    .ssf__section--partners {

        .partner-nav-tabs {
            width: 650px;
        }

        .btn-create-partner {
            position: fixed;
            right: 20px;
            bottom: 20px;
        }

    }

</style>
