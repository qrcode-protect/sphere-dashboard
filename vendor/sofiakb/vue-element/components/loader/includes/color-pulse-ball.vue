<template>
	<div :style="cssStyle" class="loader color-pulse-ball"></div>
</template>

<script>
	import { computed, defineComponent, getCurrentInstance, inject } from "vue";

	export default defineComponent({
		name: "color-pulse-ball",

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
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";

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

		@-webkit-keyframes colorpulse {
			0% {
				filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="hueRotate" color-interpolation-filters="sRGB" values="0" /></filter></svg>#filter');
				-webkit-filter: hue-rotate(0deg);
				filter: hue-rotate(0deg);
			}
			100% {
				filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="hueRotate" color-interpolation-filters="sRGB" values="359.9" /></filter></svg>#filter');
				-webkit-filter: hue-rotate(359.9deg);
				filter: hue-rotate(359.9deg);
			}
		}

		@keyframes colorpulse {
			0% {
				filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="hueRotate" color-interpolation-filters="sRGB" values="0" /></filter></svg>#filter');
				-webkit-filter: hue-rotate(0deg);
				filter: hue-rotate(0deg);
			}
			100% {
				filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="hueRotate" color-interpolation-filters="sRGB" values="359.9" /></filter></svg>#filter');
				-webkit-filter: hue-rotate(359.9deg);
				filter: hue-rotate(359.9deg);
			}
		}

		@-webkit-keyframes pulse {
			0%, 1% {
				opacity: 1;
				-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
				-webkit-transform: scale(0.1);
				transform: scale(0.1);
			}
			100% {
				opacity: 0;
				-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
				-webkit-transform: scale(1);
				transform: scale(1);
			}
		}

		@keyframes pulse {
			0%, 1% {
				opacity: 1;
				-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
				-webkit-transform: scale(0.1);
				transform: scale(0.1);
			}
			100% {
				opacity: 0;
				-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
				-webkit-transform: scale(1);
				transform: scale(1);
			}
		}
		filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="hueRotate" color-interpolation-filters="sRGB" values="0" /></filter></svg>#filter');
		filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="hueRotate" color-interpolation-filters="sRGB" values="359.9" /></filter></svg>#filter');

		&.color-pulse-ball {
			width: var(--loader-width, 100px);
			height: var(--loader-height, 100px);
			border-radius: 50%;
			background-color: var(--loader-color-primary, #00f);
			-webkit-animation: colorpulse calc(3 * var(--animation-duration, 1s)) infinite ease-in-out,
			pulse var(--animation-duration, 1s) infinite ease;
			animation: colorpulse calc(3 * var(--animation-duration, 1s)) infinite ease-in-out,
			pulse var(--animation-duration, 1s) infinite ease;
		}

	}
</style>
