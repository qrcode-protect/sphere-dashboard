<template>
	<ssf-container class="ssf-parallax parallax-container" name="parallax" not-full>

		<ssf-container v-if="hasSlot('overlayContent')" class="parallax-overlay" not-full>

			<slot name="overlayContent"/>

		</ssf-container>

		<div ref="parallaxContainer" class="parallax" not-full>

			<img :src="src(image)"
					 :style="`--ssf-parallax-img-bottom: ${imageBottom}`"
					 alt="Parallax image"
					 @load="loaded++"/>

		</div>

	</ssf-container>
</template>

<script>

	import './assets/parallax.min.scss'

	// import './assets/jquery.min.js'
	import './assets/parallax.min.js'

	import { defineComponent, onMounted, ref, watch } from "vue";
	import { hasSlot, src }                           from "@sofiakb/vue-element/utils";


	export default defineComponent({
				name: "ssf-parallax",

				props: {
					image      : { type: String, required: true },
					power      : { type: [ String, Number ], required: false, default: 2.6 },
					imageBottom: { type: [ String, Number ], required: false, default: 0 }
				},

				setup(props) {

					////////// data
					const loaded = ref(0)
					const parallaxContainer = ref(null)

					////////// methods
					const parallax = () => $(parallaxContainer.value).parallax(props.power)

					////////// watch
					watch(loaded, () => {
						if (loaded.value > 0 && parallaxContainer.value) {
							parallax()
						}
					})

					// onMounted(() => {
					// 	parallax()
					// })

					return {
						loaded,
						parallaxContainer
					}

				},

				// created() {
				// this.loaded = 0;
				// },

				// data() {
				// 	return { loaded: 0 }
				// },

				// watch: {
				// 	loaded() {
				// 		if (this.loaded > 0)
				// 			$(this.$refs.parallaxContainer).parallax(this.power)
				// 	}
				// },

				methods: {
					hasSlot(name = 'default') {
						return hasSlot(this, name)
					},

					src: (image) => src(image)
				},
			}
	)
</script>

<style lang="scss" scoped>

	.parallax > img {
		bottom: var(--ssf-parallax-img-bottom, 0) !important;
	}

</style>
