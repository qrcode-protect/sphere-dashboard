<template>
	<ssf-container name="x-footer" id="footer" class="position-relative" :style="{marginTop: `${isHome ? 0 : 0}px`}">

		<ssf-container name="footer-overlay" class="bg-color-1 py-4">

			<ssf-row>

				<ssf-col xs="12" md="4">
					<ssf-container name="footer-logo" class="py-2">
						<img src="@/assets/img/logo.png" alt="Logo" class="img-fluid px-2 px-md-0 mx-auto d-block">
					</ssf-container>

					<ssf-container name="footer-about" class="text-justify">
						<p>
							<router-link :to="{name: 'home'}">App</router-link>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi assumenda autem beatae distinctio
							dolorem ea est exercitationem id iure laborum, nostrum officiis porro praesentium quae quaerat quas?
							Laboriosam, quasi.
						</p>
					</ssf-container>
				</ssf-col>

				<ssf-col xs="6" md="4">

					<ssf-container name="footer-overlay-title" class="pt-2 text-center">
						<span class="h5-responsive font-italic">Menu</span>
						<hr class="w-50 my-2 border-color-black">
					</ssf-container>

					<ssf-row>
						<ul class="fa-ul mx-auto">
							<template v-for="link in links" :key="key(link)">
								<li v-if="!(link.show === false)">
									<span class="fa-li"><ssf-icon :icon="link.icon" la size="lg"/></span>
									<span class="mr-2"><ssf-icon icon="angle-right" la/></span>
									{{ link.label }}
								</li>
							</template>
						</ul>
					</ssf-row>

				</ssf-col>

				<ssf-col xs="6" md="4">

					<ssf-container name="footer-overlay-title" class="pt-2 text-center">
						<span class="h5-responsive font-italic">Contact</span>
						<hr class="w-50 my-2 border-color-black">
					</ssf-container>

					<ssf-row>
						<ul class="fa-ul mx-auto">
							<li v-for="contact in contacts">
								<span class="fa-li"><ssf-icon :icon="contact.icon" la size="lg"/></span>
								<span class="mr-2"><ssf-icon icon="angle-right" la/></span>
								{{ contact.title }}
							</li>
						</ul>
					</ssf-row>

				</ssf-col>

			</ssf-row>

		</ssf-container>

		<ssf-container name="footer-copyright" class="bg-color-5 text-white">

			<ssf-row class="align-flex">

				<ssf-col size="6">
					Copyright&nbsp;<ssf-icon icon="copyright" la/>
					2019&nbsp;
					<router-link :to="{name: 'home'}" class="text-white">{{ copyright }}</router-link>
				</ssf-col>

				<ssf-col size="6" class="text-right">
					Tous droits réservés
				</ssf-col>

			</ssf-row>

		</ssf-container>

	</ssf-container>
</template>

<script>

	import { mapping, exclude } from "@app/vue/router/mapping";

	import { key } from '@app/vue/utils'

	import { defineComponent } from "vue";

	import { map } from "lodash";

	export default defineComponent({
		name: "x-footer",

		data() {
			return {
				copyright: 'Application',

				links2  : [
					{ name: 'home', icon: 'home', title: 'Accueil', show: true },
				],
				contacts: [
					{ icon: 'at', title: 'email' },
					{ icon: 'mobile', title: 'mobile' },
					{ icon: 'phone', title: 'fixe' },
				]
			}
		},

		mounted() {
		},

		computed: {
			links() {
				const routes = _.filter(this.$router.options.routes, route => (route.path !== '/*' && route.path !== '*') && _.indexOf(exclude, route.name) < 0)
				let links = [];
				map(routes, route => route.name).forEach(route => links.push({ ...mapping[route], ...{ name: route } }));
				return links
			},

			isHome() {
				return this.$route.name === 'home'
			},
		},

		methods: {

			key: (link) => key({ id: link.name, name: link.name })

		}
	})
</script>

<style scoped lang="scss">

	.ssf__section--x-footer {
		background: #ffffff;

		.ssf__section--footer-overlay {
			width: 100%;

			.ssf__section--footer-logo > img {
				height: 75px;
			}

			& a {
				text-decoration: inherit !important;
				color: inherit !important;
			}
		}

		.ssf__section--footer-copyright {
			padding-top: 15px;
			padding-bottom: 15px;
		}

	}

</style>
