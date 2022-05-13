<template>

	<ssf-container name="active-members">

		<ssf-container class="active-members-container" v-if="members && members.length > 0">

			<ssf-row>
				<ssf-card v-for="member in members"
									header-class="card-member-item-header position-absolute rounded border-0 p-0 z-depth-1 text-white"
									body-class="card-member-item-body"
									class="position-relative card-member-item rounded mx-3 z-depth-1">

					<template #header>

						<ssf-container class="full-flex h-100">

							<ssf-icon icon="user" light/>

						</ssf-container>

					</template>

					<template #body>

						<ssf-container>
							<h4 class="h4-responsive">
								{{ member.lastname.capitalize() }}
								{{ member.firstname.capitalize() }}
							</h4>
						</ssf-container>

						<ul class="fa-ul">
							<li v-for="item in itemKeys">

							<span class="fa-li">
								<ssf-icon :icon="item.icon" regular class="color-2"/>
							</span>

								<a :href="`${item.urlPrefix}${member[item.key]}`" v-if="item.isLink" class="item-link">
									<span>{{ member[item.key] }}</span>
								</a>
								<span v-else>{{ member[item.key] }}</span>

							</li>
						</ul>

					</template>

				</ssf-card>
			</ssf-row>

		</ssf-container>

		<ssf-container v-else>
			<span class="secondary-item">
				Aucun adhérent
			</span>
		</ssf-container>

	</ssf-container>

</template>

<script lang="ts">
	import { useStore }            from "vuex";
	import { computed, onMounted } from "vue";
	import Member                  from "@app/modules/member/member";

	export default {
		name: "active-members",

		setup() {

			////////// init
			const store = useStore()

			////////// mounted
			onMounted(() => store.dispatch('member/fetchActive'))

			////////// computed
			const members = computed((): Member[] | null => store.getters['member/activeMembers'])

			return {
				//// computed
				members
			}
		},

		data: () => ({
			itemKeys: [ {
				icon     : 'at',
				key      : 'email',
				isLink   : true,
				urlPrefix: 'mailto:'
			}, {
				icon     : 'mobile',
				key      : 'phone',
				isLink   : true,
				urlPrefix: 'tel:'
			}, {
				icon  : 'building',
				key   : 'companyName',
				isLink: false
			}, {
				icon  : 'circle-user',
				key   : 'username',
				isLink: false
			} ]
		})
	}
</script>

<style lang="scss">

	.card-member-item {
		margin-top: 40px;
		min-width: 270px;
		max-width: 450px;

		.card-member-item-header {
			background-color: var(--color-1);
			width: 50px !important;
			height: 50px !important;
			top: -25px;
			left: 18px;
		}

		.card-member-item-body {
			padding-top: 35px !important;
		}

		a.item-link {
			color: var(--color-1) !important;
		}

	}
</style>
