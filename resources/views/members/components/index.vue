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
            <active-premium-members v-if="currentTab === 3"/>
		</ssf-container>

        <router-link :to="{name: 'members.create'}" class="btn-create-member">
            <ssf-shape size="75"  circle class="bg-color-2 full-flex text-white z-depth-1">
                <ssf-icon icon="layer-plus" size="2x" light/>
            </ssf-shape>
        </router-link>

	</ssf-container>
</template>

<script>
	import { defineComponent, ref } from "vue";
	import { useMeta }              from "vue-meta";
	import ActiveMembers            from "@/views/members/components/includes/active-members";
	import InactiveMembers          from "@/views/members/components/includes/inactive-members";
    import ActivePremiumMembers     from "@/views/members/components/includes/active-premium-members";

	export default defineComponent({
		name: "members-index",

		components: { ActivePremiumMembers, InactiveMembers, ActiveMembers },

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
			width: 650px;
		}

        .btn-create-member {
            position: fixed;
            right: 20px;
            bottom: 20px;
        }

	}

</style>
