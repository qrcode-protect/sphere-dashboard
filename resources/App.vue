<template>
	<div id="vueApp">


		<metainfo>
			<template v-slot:title="{ content }">{{ content }} | SPHÈRE</template>
		</metainfo>

		<!-- APPLICATION IS UP -->
		<ssf-container class="h-100 w-100" v-if="!maintenance" :style="`--sidebar-width: ${sidebarWidth}px;`">

			<ssf-row>
				<div  class="px-0 sidebar-col position-fixed h-100" style="z-index: 1" v-if="$route.name !=='login' ">
					<x-sidebar/>
				</div>

				<div  class="sidebar-col" v-if="$route.name !=='login'">
				</div>


				<ssf-col no-padding class="col">
					<!-- MAIN CONTAINER -->
					<div class="main-container">
						<router-view v-slot="{ Component }">
<!--							<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">-->
								<component :is="Component" v-if="loaded"/>
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
	import { computed, defineComponent, onMounted, ref } from "vue";
	import { useStore }                                  from "vuex";
	import { useMeta }                                   from 'vue-meta'

	import FormLoad    from '@/components/commons/loading/form-load'
	import PreLoad     from '@/components/commons/loading/pre-load'
	import XFooter     from '@/components/commons/partials/x-footer'
	import Maintenance from '@/components/maintenance'
	import XSidebar    from "@/components/commons/partials/x-sidebar";

	export default defineComponent({

		name      : 'App',
		components: { XSidebar, FormLoad, PreLoad, XFooter, Maintenance },

		setup() {
			useMeta({
				// if no subcomponents specify a metaInfo.title, this title will be used
				title: 'sphere-dashboard',
			})

			onMounted(() => {

			})

			const store = useStore()

			// data
			const loading = ref(false)
			const sidebarWidth = ref(200)

			// computed
			const loaded = computed(() => !loading.value && !store.getters.preload)
			const maintenance = computed(() => store.getters.APP_MAINTENANCE && (store.getters.APP_MAINTENANCE === 'true' || store.getters.APP_MAINTENANCE === true))

			return {
				sidebarWidth,

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
