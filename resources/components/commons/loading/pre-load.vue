<template>
	<div id="preload" class="section--pre-loader position-fixed justify-content-center align-items-center"
			 :class="className">
		<triple-spinner :color1="colors.primary" :color2="colors.secondary" :color3="colors.ternary" :size="200"/>
	</div>
</template>

<script>

	let interval;

	import TripleSpinner from "../loader/triple-spinner";

	import { defineComponent, onMounted, reactive } from "vue";

	export default defineComponent({
		name: "pre-load",

		components: {
			TripleSpinner,
		},

		setup() {
			const colors = reactive({
				primary  : '#FBAC4C',
				secondary: '#D0427D',
				ternary  : '#7EC5C2',
			})

			onMounted(() => {

				// init colors
				(() => {
					const root = $(':root')
					colors.primary = root.css('--color-1')
					colors.secondary = root.css('--color-2')
					colors.ternary = root.css('--color-4')
				})()

			})

			return {
				colors
			}

		},

		data() {
			return {
				className: "d-flex",
				animate  : true
			}
		},

		created() {
			this.run()
		},

		methods: {

			close() {
				// this.className = "d-flex animated fadeOut";
				setTimeout(() => {
					// this.className = "d-none";
					clearInterval(interval);
					// this.$store.dispatch('preloading', false)
				}, 1000)
			},

			run() {
				let self = this, i = 0;
				interval = setInterval(() => {
					if ((document.readyState === "complete" || document.readyState === "ready") || i++ > 10) {
						self.close();
						clearInterval(interval);
						interval = null
					}
				}, 1000)

			}
		}
	})
</script>

<style scoped>

	#preload {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 16777271;
		background-color: #fff;
	}

</style>
