<template>
	<div :style="cssStyle" class="loader bouncing-circle"
	></div>
</template>

<script>
	import { computed, defineComponent, getCurrentInstance, inject } from "vue";

	export default defineComponent({
		name: "bouncing-circle",
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

		@-webkit-keyframes bounce {
			0% {
				-webkit-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
			}
			50% {
				-webkit-transform: translate3d(0, var(--bounce-height, 20px), 0);
				transform: translate3d(0, var(--bounce-height, 20px), 0);
			}
			100% {
				-webkit-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
			}
		}

		@keyframes bounce {
			0% {
				-webkit-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
			}
			50% {
				-webkit-transform: translate3d(0, var(--bounce-height, 20px), 0);
				transform: translate3d(0, var(--bounce-height, 20px), 0);
			}
			100% {
				-webkit-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
			}
		}

		@-webkit-keyframes shadow {
			0% {
				-webkit-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
				box-shadow: 0px 0px 4px 2px var(--loader-color-secondary, #666);
			}
			50% {
				-webkit-transform: translate3d(0, -var(--bounce-height, 20px), 0);
				transform: translate3d(0, -var(--bounce-height, 20px), 0);
				box-shadow: 0px 0px 4px 10px var(--loader-color-secondary, #666);
			}
			100% {
				-webkit-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
				box-shadow: 0px 0px 4px 2px var(--loader-color-secondary, #666);
			}
		}

		@keyframes shadow {
			0% {
				-webkit-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
				box-shadow: 0px 0px 4px 2px var(--loader-color-secondary, #666);
			}
			50% {
				-webkit-transform: translate3d(0, -var(--bounce-height, 20px), 0);
				transform: translate3d(0, -var(--bounce-height, 20px), 0);
				box-shadow: 0px 0px 4px 10px var(--loader-color-secondary, #666);
			}
			100% {
				-webkit-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
				box-shadow: 0px 0px 4px 2px var(--loader-color-secondary, #666);
			}
		}

		&.bouncing-circle {
			--bounce-height: calc(var(--loader-height, 100px) / 5);
			position: relative;
			-webkit-perspective: calc(var(--loader-width, 100px) * 3);
			perspective: calc(var(--loader-width, 100px) * 3);
			border-radius: 50%;
			width: var(--loader-width, 100px);
			height: var(--loader-height, 100px);
			background-color: var(--loader-color-primary, #00f);
			background: -webkit-radial-gradient(calc(var(--loader-width, 100px) / 3) calc(var(--loader-width, 100px) / 3), circle, var(--loader-color-primary, #00f), #000);
			background: radial-gradient(circle at calc(var(--loader-width, 100px) / 3) calc(var(--loader-width, 100px) / 3), var(--loader-color-primary, #00f), #000);
			-webkit-animation: bounce var(--animation-duration, 1s) infinite ease-in-out;
			animation: bounce var(--animation-duration, 1s) infinite ease-in-out;
		}

		&.bouncing-circle:after {
			content: "";
			display: block;
			width: 6px;
			height: 3px;
			position: absolute;
			border-radius: 50%;
			top: calc(var(--loader-height, 100px) + 10px);
			left: calc((var(--loader-width, 100px) / 2) - 3px);
			background-color: var(--loader-color-secondary, #666);
			-webkit-animation: shadow var(--animation-duration, 1s) infinite ease-in-out;
			animation: shadow var(--animation-duration, 1s) infinite ease-in-out;
		}
	}

</style>
