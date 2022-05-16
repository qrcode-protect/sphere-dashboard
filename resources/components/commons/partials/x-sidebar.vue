<template>
	<ssf-container class="sidebar color-1 bg-color-1 z-depth-0 h-100" name="sidebar">

		<ssf-container fluid class="side-container sfkb-sphere-container">

			<!-- Navbar brand -->
			<ssf-container class=" py-4">
				<a class="sidebar-brand color-1" href="#">
					<logo :height="logoSize" id="sidebarLogo" class="d-block mx-auto"/>
				</a>
			</ssf-container>

			<!-- Collapsible content -->
			<div id="basicExampleNav" :class="{'show': visible}" class="collapse sidebar-collapse">


				<!-- Links -->
				<ul class="sidebar-side pl-0 fa-ul">

					<li v-for="link in links" :class="{'active': isActive(link), 'd-none': link.show === false}"
							class="side-item">


						<router-link :to="{name: link.name}" :class="{'active color-2': isActive(link)}"
												 class="side-link text-white p-0" v-if="link.show !== false">


							<ssf-row class="side-link-label">
								<span class="fa-li" v-if="link.icon">
									<ssf-icon :icon="link.icon" light/>
								</span>

								{{ link.label }}
							</ssf-row>

							<span v-if="isActive(link)" class="sr-only">(current)</span>

							<div class="active-hover-line bg-white mx-auto"></div>

						</router-link>

					</li>

					<li class="side-item position-absolute text-white cursor-pointer py-2" style="bottom: 0" @click="logout">


						<span>Déconnexion</span>

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

	import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
	import Logo                                                 from "@/components/commons/logo";
	import { map }                                              from "lodash";
	import { xWindow }                                          from "@app/vue/utils/helpers";

	import { exclude, mapping } from "@app/vue/router/mapping";

	export default defineComponent({
		name      : "x-sidebar",
		components: { Logo },
		setup() {
			////////// data
			const toggleVisible = ref(false)
			const isSmall = ref(xWindow.isSmall())
			const logoSize = ref(20)
			const visible = ref(isSmall.value ? toggleVisible.value : true)
						/*const links = reactive([
			 {
			 label : 'Devenir fournisseur',
			 divID : '#home',
			 active: true
			 },
			 {
			 label: 'Contact',
			 divID: '#contact',
			 },
			 {
			 label: 'À propos',
			 divID: '#about',
			 },
			 ])*/

			////////// methods
			// const navigate = (link) => scroll({ to: $(link.divID), animate: true, offset: 220 })
			const isActive = (link) => link.active === true
			const toggle = () => {
				toggleVisible.value = !toggleVisible.value;
				return onResize()
			}
			const onResize = () => {
				isSmall.value = xWindow.isSmall()
				logoSize.value = 20
				return visible.value = isSmall.value ? toggleVisible.value : true;
			}
			// const onScroll = () => {
			// 	const sections = $('.ssf-sphere-section')
			//
			// 	const current = filter(sections, section => {
			// 		const scrollTop = ($(window).scrollTop() + 210)
			// 		return $(section).position().top <= scrollTop && $(section).height() + $(section).position().top > scrollTop;
			// 	})[0] || null
			//
			// 	if (current) {
			// 		filter(links, link => {
			// 			link.active = link.divID === `#${$(current).attr('id')}`;
			// 		})
			// 	}
			//
			// }

			////////// computed
			// const visible = computed(() => xWindow.isSmall() ? toggleVisible.value : true)

			onMounted(() => {
				// window.addEventListener('scroll', onScroll);
				window.addEventListener('resize', onResize);
			})

			onBeforeUnmount(() => {
				// window.removeEventListener('scroll', onScroll);
				window.removeEventListener('resize', onResize);
			})

			return {
				//// data
				// links,
				toggleVisible,
				logoSize,
				isSmall,

				//// methods
				isActive,
				// navigate,
				toggle,

				//// computed
				visible,
			}


		},

		computed: {
			links() {
				const routes = _.filter(this.$router.options.routes, route => (route.path !== '/*' && route.path !== '*') && _.indexOf(exclude, route.name) < 0)
				let links = [];
				map(routes, route => route.name).forEach(route => links.push({
					...mapping[route], ...{
						name: route,
						show: !(mapping[route]?.show === false)
					}
				}));

				return links
			},

			isHome() {
				return this.$route.name === 'home'
			},
		},

		methods: {
			logout() {
				this.$localStorage.remove('token')
				location.reload()
			}
		}

	})
</script>

<style lang="scss">

	.ssf__section--sidebar.sidebar {
		z-index: 1050 !important;
		padding: 0 !important;

		.side-link-label {
			padding: 13px 20px !important;
		}

		#sidebarLogo {
			min-height: 20px !important;
		}

		.active-hover-line {
			height: 1px;
			width: 0;
			transition: width .5s;
			//margin-top: 13px;
		}

		.side-link {
			font-weight: 400;

			&:hover, &.active {
				.active-hover-line {
					width: 100% !important;
				}
			}
		}


		.join-us-button {
			line-height: 15px;
		}

	}


</style>
