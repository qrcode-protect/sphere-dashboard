<template>
	<ssf-container name="partners">

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

        <router-link :to="{name: 'partners.create'}">Ajouter un partenaire</router-link>

        <button>Ajouter un partenaire</button>
	</ssf-container>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { useMeta }         from "vue-meta";
    import ActivePartners      from "@/views/partners/components/includes/active-partners.vue";
    import InactivePartners    from "@/views/partners/components/includes/inactive-partners.vue";

	export default defineComponent({
		name: "partners-index",

		components: { InactivePartners, ActivePartners },

		setup() {
			////////// init
			useMeta({ title: 'Partenaires', })


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
                title   : "Partenaires actifs",
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

    }

</style>
