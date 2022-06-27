<template>

	<blasting-circle v-if="blast"/>
	<rotating-plane v-else-if="rotatingPlane"/>
	<bouncing-circle v-else-if="bouncing"/>
	<blasting-ripple v-else-if="ripple"/>
	<color-pulse-ball v-else-if="pulse"/>
	<clock v-else-if="clock"/>
	<double-circle v-else-if="double"/>
	<quantum-spinner v-else-if="spinner"/>
	<box-rotation v-else-if="box"/>
	<hour-glass v-else-if="hour"/>

    <simple-circle v-else/>

</template>

<script>
	import BlastingCircle from "./includes/blasting-circle";
	import BlastingRipple from "./includes/blasting-ripple";
	import BouncingCircle from "./includes/bouncing-circle";
	import BoxRotation    from "./includes/box-rotation";
	import Clock          from "./includes/clock";
	import ColorPulseBall from "./includes/color-pulse-ball";
	import DoubleCircle   from "./includes/double-circle";
	import HourGlass      from "./includes/hour-glass";
	import QuantumSpinner from "./includes/quantum-spinner";
	import RotatingPlane  from "./includes/rotating-plane";
	import SimpleCircle   from "./includes/simple-circle";
	import { ref, watch } from "vue";

	export default {
		name      : "ssf-loader",
		components: {
			HourGlass,
			BoxRotation,
			QuantumSpinner,
			DoubleCircle,
			Clock,
			ColorPulseBall,
			BlastingRipple,
			BouncingCircle,
			RotatingPlane,
			BlastingCircle,
			SimpleCircle
		},

		props: {
			/* AVAILABLE LOADERS */
			circle       : { type: Boolean, required: false, default: false },
			blast        : { type: Boolean, required: false, default: false },
			rotatingPlane: { type: Boolean, required: false, default: false },
			bouncing     : { type: Boolean, required: false, default: false },
			ripple       : { type: Boolean, required: false, default: false },
			pulse        : { type: Boolean, required: false, default: false },
			clock        : { type: Boolean, required: false, default: false },
			double       : { type: Boolean, required: false, default: false },
			spinner      : { type: Boolean, required: false, default: false },
			box          : { type: Boolean, required: false, default: false },
			hour         : { type: Boolean, required: false, default: false },

			colorPrimary  : { type: String, required: false, default: '#27AE60' },
			colorSecondary: { type: String, required: false, default: '#eee' },

			size    : { type: [ String, Number ], required: false, default: 70 },
			stroke  : { type: [ String, Number ], required: false, default: 3 },
			duration: { type: [ String, Number ], required: false, default: 2 },
		},

		setup(props) {
			const loaderParentProps = ref({
				colorPrimary  : props.colorPrimary,
				colorSecondary: props.colorSecondary,

				size    : props.size,
				stroke  : props.stroke,
				duration: props.duration,
			})

			for (const key in props)
				watch(() => props[key], () => loaderParentProps.value[key] = props[key], { immediate: true })

			return { loaderParentProps }
		},

		provide() {
			return {
				loaderParentProps: this.loaderParentProps
			}
		}
	}
</script>

<style scoped>

</style>
