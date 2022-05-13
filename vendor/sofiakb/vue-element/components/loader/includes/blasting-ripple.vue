<template>
	<div :style="cssStyle" class="loader blasting-ripple"></div>
</template>

<script>
	import { computed, defineComponent, getCurrentInstance, inject } from "vue";

	export default defineComponent({
		name: "blasting-ripple",
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
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
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

		/*
				Blasting Ripple Styles
		*/
		@-webkit-keyframes blast-ripple {
			0% {
				top: calc(var(--loader-height, 100px) / 2 - var(--line-width, 4px));
				left: calc(var(--loader-width, 100px) / 2 - var(--line-width, 4px));
				width: 0;
				height: 0;
				opacity: 1;
				-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			}
			100% {
				top: -1px;
				left: -1px;
				width: calc(var(--loader-width, 100px) - var(--line-width, 4px));
				height: calc(var(--loader-height, 100px) - var(--line-width, 4px));
				opacity: 0;
				-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
			}
		}
		@keyframes blast-ripple {
			0% {
				top: calc(var(--loader-height, 100px) / 2 - var(--line-width, 4px));
				left: calc(var(--loader-width, 100px) / 2 - var(--line-width, 4px));
				width: 0;
				height: 0;
				opacity: 1;
				-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			}
			100% {
				top: -1px;
				left: -1px;
				width: calc(var(--loader-width, 100px) - var(--line-width, 4px));
				height: calc(var(--loader-height, 100px) - var(--line-width, 4px));
				opacity: 0;
				-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
			}
		}

		&.blasting-ripple {
			position: relative;
			width: var(--loader-width, 100px);
			height: var(--loader-height, 100px);
		}

		&.blasting-ripple:after {
			opacity: 0;
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
			content: "";
			position: absolute;
			border: var(--line-width, 4px) solid var(--loader-color-primary, #00f);
			opacity: 1;
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			border-radius: 50%;
			-webkit-animation: blast-ripple var(--animation-duration, 1s) cubic-bezier(0, 0.2, 0.8, 1) infinite;
			animation: blast-ripple var(--animation-duration, 1s) cubic-bezier(0, 0.2, 0.8, 1) infinite;
		}

		&.blasting-ripple:before {
			opacity: 0;
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
			top: calc(var(--loader-height, 100px) / 2 - var(--line-width, 4px));
			left: calc(var(--loader-width, 100px) / 2 - var(--line-width, 4px));
			content: "";
			position: absolute;
			border: var(--line-width, 4px) solid var(--loader-color-primary, #00f);
			opacity: 1;
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			border-radius: 50%;
			-webkit-animation: blast-ripple var(--animation-duration, 1s) cubic-bezier(0, 0.2, 0.8, 1) infinite;
			animation: blast-ripple var(--animation-duration, 1s) cubic-bezier(0, 0.2, 0.8, 1) infinite;
			-webkit-animation-delay: calc(var(--animation-duration, 1s) / 2);
			animation-delay: calc(var(--animation-duration, 1s) / 2);
		}
	}
</style>
