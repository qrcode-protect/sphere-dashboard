<template>
	<div :style="cssStyle" class="loader box-rotation"></div>
</template>

<script>
	import { computed, defineComponent, getCurrentInstance, inject } from "vue";

	export default defineComponent({
		name: "box-rotation",

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
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";

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

		@-webkit-keyframes rect-rotate {
			0% {
				-webkit-transform: rotate(0);
				transform: rotate(0);
			}
			50%, 100% {
				-webkit-transform: rotate(360deg);
				transform: rotate(360deg);
			}
		}

		@keyframes rect-rotate {
			0% {
				-webkit-transform: rotate(0);
				transform: rotate(0);
			}
			50%, 100% {
				-webkit-transform: rotate(360deg);
				transform: rotate(360deg);
			}
		}

		@-webkit-keyframes fill-rect {
			0%, 50% {
				height: 0px;
			}
			100% {

				height: inherit;
			}
		}

		@keyframes fill-rect {
			0%, 50% {
				height: 0px;
			}
			100% {

				height: inherit;
			}
		}

		&.box-rotation {
			-webkit-transform-origin: center center;
			transform-origin: center center;
			color: var(--loader-color-primary, #33f);
			width: var(--loader-width, 100px);
			height: var(--loader-height, 100px);
			position: relative;
			border: var(--line-width, 4px) solid;
			display: inline-block;
			-webkit-animation: rect-rotate var(--animation-duration, 1s) linear infinite;
			animation: rect-rotate var(--animation-duration, 1s) linear infinite;
		}

		&.box-rotation:after {
			content: "";
			height: 0px;
			width: 100%;
			height: 100%;
			display: block;
			background: var(--loader-color-primary, #33f);
			opacity: 0.5;
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
			-webkit-animation: fill-rect var(--animation-duration, 1s) linear infinite;
			animation: fill-rect var(--animation-duration, 1s) linear infinite;
		}
	}

</style>
