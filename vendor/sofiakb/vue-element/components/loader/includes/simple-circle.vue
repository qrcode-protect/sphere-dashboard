<template>
	<div :style="cssStyle" class="loader simple-circle">
	</div>
</template>

<script>
	import { computed, defineComponent, getCurrentInstance, inject } from "vue";

	export default defineComponent({
		name: "simple-circle",

		setup() {
			////////// data
			const ctx = getCurrentInstance().ctx
			const parent = inject('loaderParentProps')

			////////// computed
			const size = computed(() => {
				const size = parent.size;
				return typeof size === 'string' ? size : `${size}px`
			})

			const stroke = computed(() => {
				const stroke = parent.stroke;
				return typeof stroke === 'string' ? stroke : `${stroke}px`
			})

			const duration = computed(() => {
				const duration = parent.duration;
				return typeof duration === 'string' ? duration : `${duration}s`
			})

			const cssStyle = computed(() => ({
				'--reset'                 : 0,
				'--loader-width'          : size.value,
				'--loader-height'         : size.value,
				'--loader-color-primary'  : parent.colorPrimary,
				'--loader-color-secondary': parent.colorSecondary,
				'--line-width'            : stroke.value,
				'--animation-duration'    : duration.value,
				'--loader-initial-scale'  : 0.1
			}))


			return {
				//// computed
				cssStyle,
			}
		},
	})
</script>

<style lang="scss" scoped>

	.loader {
		&,
		&:before,
		&:after {
			content: '';
			box-sizing: border-box;
			-webkit-box-flex: 0;
			-ms-flex-positive: 0;
			flex-grow: 0;
			-ms-flex-negative: 0;
			flex-shrink: 0;
		}

		&.simple-circle {
			-webkit-transform-origin: center center;
			transform-origin: center center;
			border: var(--line-width, 4px) solid var(--loader-color-secondary, #fff);
			border-right-color: var(--loader-color-primary, #00f);
			width: var(--loader-width, 100px);
			height: var(--loader-height, 100px);
			border-radius: 50%;
			-webkit-animation: circle-loader var(--animation-duration, 1s) infinite ease-out;
			animation: circle-loader var(--animation-duration, 1s) infinite ease-out;
		}

		@-webkit-keyframes circle-loader {
			0% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}
			100% {
				-webkit-transform: rotate(360deg);
				transform: rotate(360deg);
			}
		}

		@keyframes circle-loader {
			0% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}
			100% {
				-webkit-transform: rotate(360deg);
				transform: rotate(360deg);
			}
		}
	}

</style>
