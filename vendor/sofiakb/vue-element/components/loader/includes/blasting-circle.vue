<template>
	<div :style="cssStyle" class="loader blasting-circle"></div>
</template>

<script>
	import { computed, defineComponent, getCurrentInstance, inject } from "vue";

	export default defineComponent({
		name: "blasting-circle",
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
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=NaN)";

		&,
		&:before,
		&:after {
			box-sizing: border-box;
			-webkit-box-flex: 0;
			-ms-flex-positive: 0;
			flex-grow: 0;
			-ms-flex-negative: 0;
			flex-shrink: 0;
		}

		/*
			Blasting Circle Styles
		*/
		@-webkit-keyframes blast {
			0% {
				opacity: var(--loader-initial-scale, 0.1);
				-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=NaN)";
				-webkit-transform: scale(var(--loader-initial-scale, 0.1));
				transform: scale(var(--loader-initial-scale, 0.1));
			}
			100% {
				-webkit-transform: scale(1);
				transform: scale(1);
				opacity: 1;
				-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			}
		}
		@keyframes blast {
			0% {
				opacity: var(--loader-initial-scale, 0.1);
				-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=NaN)";
				-webkit-transform: scale(var(--loader-initial-scale, 0.1));
				transform: scale(var(--loader-initial-scale, 0.1));
			}
			100% {
				-webkit-transform: scale(1);
				transform: scale(1);
				opacity: 1;
				-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			}
		}

		&.blasting-circle {
			width: var(--loader-width, 100px);
			height: var(--loader-height, 100px);
			border-radius: 50%;
			background-color: var(--loader-color-primary, #00f);
			-webkit-animation: blast var(--animation-duration, 1s) infinite ease-out;
			animation: blast var(--animation-duration, 1s) infinite ease-out;
		}
	}


</style>
