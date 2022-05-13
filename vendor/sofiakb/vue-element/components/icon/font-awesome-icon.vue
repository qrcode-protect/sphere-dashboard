<template>
	<i :class="fontAwesomeClass"></i>
</template>

<script>
	
	import "./assets/font-awesome/font-awesome.min.css"
	
	import * as Icons from './utils/icons'
	
	export default {
		name: "ssf-font-awesome-icon",
		
		props: {
			/* STRONG */
			solid  : { type: Boolean, required: false, default: false },
			regular: { type: Boolean, required: false, default: false },
			light  : { type: Boolean, required: false, default: false },
			thin   : { type: Boolean, required: false, default: false },
			duotone: { type: Boolean, required: false, default: false },
			normal : { type: Boolean, required: false, default: false },
			brand  : { type: Boolean, required: false, default: false },
			
			/* ICON */
			icon    : { type: String, required: true, validator: (value) => Icons.fontAwesome.includes(value) || true },
			size    : { type: String, required: false, default: '' },
			fw      : { type: Boolean, required: false, default: false },
			animated: { type: Boolean, required: false, default: false },
			rotate  : { type: String, required: false, default: '' },
			pull    : { required: false, default: false }
		},
		
		computed: {
			
			fontAwesomeClass() {
				return `${this.strongClass}${this.iconClass}${this.sizeClass}${this.fwClass}${this.rotateClass}${this.animatedClass}${this.pullClass}`.trim()
			},
			
			strongClass() {
				// if (this.$parent.$props.weight)
				//   this[this.$parent.$props.weight] = true;

				const weights = {
					normal : 'fa',
					light  : 'fal',
					solid  : 'fas',
					brand  : 'fab',
					thin   : 'fa-thin',
					duotone: 'fa-duotone'
				}, weightsKeys = Object.keys(weights)

				for (let i = 0; i < weightsKeys.length; i++)
					if (this[weightsKeys[i]] === true)
						return weights[weightsKeys[i]]

				return "far";
			},
			
			iconClass() {
				return ` fa-${this.icon}`
			},
			
			sizeClass() {
				return this.size ? ' fa-' + this.size : ''
			},
			
			fwClass() {
				return this.fw ? ' fa-fw' : ''
			},
			
			animatedClass() {
				return this.animated ? ' fa-spin' : ''
			},
			
			rotateClass() {
				return ` ${this.rotate}`.trim()
			},
			
			pullClass() {
				return this.pull ? ` fa-pull-${this.pull}` : ''
			}
			
		},
	}
</script>
