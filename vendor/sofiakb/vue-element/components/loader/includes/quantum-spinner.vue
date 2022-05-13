<template>
	<div :style="cssStyle" class="loader quantum-spinner"></div>
</template>

<script>
	import { computed, defineComponent, getCurrentInstance, inject } from "vue";


	export default defineComponent({
		name: "quantum-spinner",

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
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";

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

		@-webkit-keyframes momentum {
			0% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}
			100% {
				-webkit-transform: rotate(-360deg);
				transform: rotate(-360deg);
			}
		}

		@keyframes momentum {
			0% {
				-webkit-transform: rotate(0deg);
				transform: rotate(0deg);
			}
			100% {
				-webkit-transform: rotate(-360deg);
				transform: rotate(-360deg);
			}
		}

		&.quantum-spinner {
			--primary-circle-offset: calc(((var(--loader-width, 100px) * 0.2) / 2) - var(--line-width, 4px));
			--secondary-circle-offset: calc(((var(--loader-width, 100px) * 0.4) / 2) - var(--line-width, 4px)); /*- (var(--line-width,4px) * 2)*/
			position: relative;
			width: var(--loader-width, 100px);
			height: var(--loader-height, 100px);
			-webkit-transform-origin: center center;
			transform-origin: center center;
			border-radius: 50%;
			border: var(--line-width, 4px) solid rgba(0, 0, 0, 0);
			border-top-color: var(--loader-color-primary, #33f);
			-webkit-animation: momentum var(--animation-duration, 1s) linear infinite;
			animation: momentum var(--animation-duration, 1s) linear infinite;
		}

		&.quantum-spinner:before {
			content: "";
			position: absolute;
			-webkit-transform-origin: center center;
			transform-origin: center center;
			top: var(--primary-circle-offset, 10px);
			left: var(--primary-circle-offset, 10px);
			width: calc(var(--loader-width, 100px) * 0.8);
			height: calc(var(--loader-height, 100px) * 0.8);
			border-radius: 50%;
			border: var(--line-width, 4px) solid rgba(0, 0, 0, 0);
			border-top-color: var(--loader-color-primary, #33f);
			opacity: 0.7;
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";
			filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="hueRotate" color-interpolation-filters="sRGB" values="3" /></filter></svg>#filter');
			-webkit-filter: hue-rotate(3deg);
			filter: hue-rotate(3deg);
			-webkit-animation: momentum calc(var(--animation-duration, 1s) * 2) linear infinite;
			animation: momentum calc(var(--animation-duration, 1s) * 2) linear infinite;
		}

		filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="hueRotate" color-interpolation-filters="sRGB" values="3" /></filter></svg>#filter');
		filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="hueRotate" color-interpolation-filters="sRGB" values="6" /></filter></svg>#filter');

		&.quantum-spinner:after {
			content: "";
			position: absolute;
			top: var(--secondary-circle-offset, 20px);
			left: var(--secondary-circle-offset, 20px);
			width: calc(var(--loader-width, 100px) * 0.6);
			height: calc(var(--loader-height, 100px) * 0.6);
			border-radius: 50%;
			-webkit-transform-origin: center center;
			transform-origin: center center;
			border: var(--line-width, 4px) solid rgba(0, 0, 0, 0);
			border-top-color: var(--loader-color-primary, #33f);
			opacity: 0.3;
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";
			filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="hueRotate" color-interpolation-filters="sRGB" values="6" /></filter></svg>#filter');
			-webkit-filter: hue-rotate(6deg);
			filter: hue-rotate(6deg);
			-webkit-animation: momentum var(--animation-duration, 1s) linear infinite;
			animation: momentum var(--animation-duration, 1s) linear infinite;
		}

	}

</style>
