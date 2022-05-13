<template>

	<ssf-container name="inactive-members">

		<ssf-container class="inactive-members-container" v-if="members">

			<ssf-row>
				<ssf-card v-for="member in members"
									header-class="card-member-item-header position-absolute rounded border-0 p-0 z-depth-1 text-white"
									body-class="card-member-item-body"
									footer-class="bg-white border-0"
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

								<ssf-container v-if="item.isLink">


									<a :href="`${item.urlPrefix}${member[item.key]}`" v-if="item.urlType === UrlType.url"
										 class="item-link">
										<span>{{ item.title || member[item.key] }}</span>
									</a>
									<img v-else-if="item.urlType === UrlType.image" :src="member[item.key]"/>
								</ssf-container>
								<span v-else>
									<span v-if="item.title">{{ item.title }} : </span>
									{{ member[item.key] }}</span>

							</li>
						</ul>

					</template>

					<template #footer>
						<ssf-container class="text-center">
							<button class="btn bg-success rounded text-white" @click="validate(member)">valider</button>
						</ssf-container>

					</template>

				</ssf-card>
			</ssf-row>

		</ssf-container>

	</ssf-container>

</template>

<script lang="ts">
	import { useStore }            from "vuex";
	import { computed, onMounted } from "vue";
	import Member                  from "@app/modules/member/member";

	enum UrlType {
		email, phone, image, url
	}

	export default {
		name: "inactive-members",

		setup() {

			////////// init
			const store = useStore()

			////////// mounted
			onMounted(async () => await store.dispatch('member/fetchInactive'))


			////////// computed
			const members = computed((): Member[] | null => store.getters['member/inactiveMembers'])

			////////// methods
			const validate = (member: Member) => member.validate().then(async () => await store.dispatch('member/fetchInactive'))


			return {
				//// computed
				members,

				//// methods
				validate,

				UrlType
			}
		},
		data: () => ({
			itemKeys: [ {
				icon     : 'at',
				key      : 'email',
				isLink   : true,
				urlType  : UrlType.url,
				urlPrefix: 'mailto:'
			}, {
				icon     : 'mobile',
				key      : 'phone',
				isLink   : true,
				urlType  : UrlType.url,
				urlPrefix: 'tel:'
			}, {
				icon  : 'building',
				key   : 'companyName',
				isLink: false
			}, {
				icon  : 'circle-user',
				key   : 'username',
				isLink: false
			}, {
				icon     : 'file-certificate',
				key      : 'certificate',
				isLink   : true,
				title    : 'KBIS',
				urlPrefix: '',
				urlType  : UrlType.url,
			}, {
				icon  : 'asterisk',
				key   : 'siret',
				title : 'Siret',
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
