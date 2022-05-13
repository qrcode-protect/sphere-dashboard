<template>
	<div :style="cssStyle" class="loader hour-glass"></div>
</template>

<script>
	import { computed, defineComponent, getCurrentInstance, inject } from "vue";

	export default defineComponent({
		name: "hour-glass",

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


		@-webkit-keyframes slide {
			0% {
				-webkit-transform: translateY(0%);
				transform: translateY(0%);
			}

			25% {
				-webkit-transform: translateY(100%);
				transform: translateY(100%);
			}

			50% {
				-webkit-transform: translateY(100%);
				transform: translateY(100%);
			}

			75% {
				-webkit-transform: translateY(0%);
				transform: translateY(0%);
			}

			100% {
				-webkit-transform: translateY(0%);
				transform: translateY(0%);
			}
		}


		@keyframes slide {
			0% {
				-webkit-transform: translateY(0%);
				transform: translateY(0%);
			}

			25% {
				-webkit-transform: translateY(100%);
				transform: translateY(100%);
			}

			50% {
				-webkit-transform: translateY(100%);
				transform: translateY(100%);
			}

			75% {
				-webkit-transform: translateY(0%);
				transform: translateY(0%);
			}

			100% {
				-webkit-transform: translateY(0%);
				transform: translateY(0%);
			}
		}

		@-webkit-keyframes spin {
			0% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}

			25% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}

			50% {
				-webkit-transform: rotate(180deg);
				transform: rotate(180deg);
			}

			75% {
				-webkit-transform: rotate(180deg);
				transform: rotate(180deg);
			}

			100% {
				-webkit-transform: rotate(360deg);
				transform: rotate(360deg);
			}
		}

		@keyframes spin {
			0% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}

			25% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}

			50% {
				-webkit-transform: rotate(180deg);
				transform: rotate(180deg);
			}

			75% {
				-webkit-transform: rotate(180deg);
				transform: rotate(180deg);
			}

			100% {
				-webkit-transform: rotate(360deg);
				transform: rotate(360deg);
			}
		}

		&.hour-glass {
			position: relative;
			width: var(--loader-width, 100px);
			height: var(--loader-height, 100px);
			background-color: var(--loader-color-primary, #00f);
			-webkit-clip-path: polygon(0% 0%, 100% 0%, 50% 50%, 100% 100%, 0% 100%, 50% 50%);
			clip-path: polygon(0% 0%, 100% 0%, 50% 50%, 100% 100%, 0% 100%, 50% 50%);
			overflow: hidden;
			-webkit-animation: spin var(--animation-duration, 4s) infinite ease-in-out;
			animation: spin var(--animation-duration, 4s) infinite ease-in-out;
		}

		&.hour-glass:before {
			content: "";
			position: absolute;
			top: 0px;
			left: 0px;
			width: var(--loader-width, 100px);
			height: 50%;
			background-color: var(--loader-color-secondary, #eee);
			-webkit-animation: slide var(--animation-duration, 4s) infinite ease-in-out;
			animation: slide var(--animation-duration, 4s) infinite ease-in-out;
		}
	}

</style>
