<template>
	<ssf-container name="members">

		<ssf-container class="member-nav-tabs" not-full>

			<ssf-row class="px-3">

				<ssf-col class="member-nav-tab-item py-3 cursor-pointer"
								 :class="{'border-bottom border-strong border-color-1': tab.tabIndex === currentTab}"
								 @click="onTabChange(tab.tabIndex)"
								 v-for="tab in tabs">
					<span>{{ tab.title }}</span>
				</ssf-col>

			</ssf-row>

		</ssf-container>

		<ssf-container fluid>
			<active-members v-if="currentTab === 1"/>
			<inactive-members v-if="currentTab === 2"/>
		</ssf-container>

	</ssf-container>
</template>

<script>
	import { defineComponent, ref } from "vue";
	import { useMeta }              from "vue-meta";
	import ActiveMembers            from "@/views/members/components/active-members";
	import InactiveMembers          from "@/views/members/components/inactive-members";

	export default defineComponent({
		name: "members-index",

		components: { InactiveMembers, ActiveMembers },

		setup() {
			////////// init
			useMeta({ title: 'Adhérents' })


			////////// data
			const currentTab = ref(1)


			////////// computed


			////////// methods
			const onTabChange = (tabItem) => currentTab.value = tabItem


			return {
				//// data
				currentTab,

				//// computed

				//// methods
				onTabChange
			}
		},

		data: () => ({
			tabs: [ {
				title   : "Adhérents actifs",
				tabIndex: 1
			}, {
				title   : "En attente de validation",
				tabIndex: 2
			} , {
				title   : "Premium",
				tabIndex: 3
			} ]
		})
	})
</script>

<style lang="scss" scoped>

	.ssf__section--members {

		.member-nav-tabs {
			width: 400px;
		}

	}

</style>
