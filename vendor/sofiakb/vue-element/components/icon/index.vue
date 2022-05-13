<template>
	<ssf-font-awesome-icon
			v-if="isFontAwesome"
			:animated="animated"
			:brand="options.brand"
			:fw="fw"
			:icon="icon"
			:light="options.light"
			:thin="options.thin"
			:duotone="options.duotone"
			:normal="options.normal"
			:pull="pull"
			:regular="options.regular"
			:rotate="rotate"
			:size="size"
			:solid="options.solid"/>
	
	<ssf-line-awesome-icon
			v-else-if="isLineAwesome"
			:animated="animated"
			:brand="options.brand"
			:fw="fw"
			:icon="icon"
			:light="options.light"
			:normal="options.normal"
			:pull="pull"
			:regular="options.regular"
			:rotate="rotate"
			:size="size"
			:solid="options.solid"/>
</template>

<script>
	import SsfFontAwesomeIcon from "./font-awesome-icon";
	import SsfLineAwesomeIcon from "./line-awesome-icon";
	import * as Icons         from "./utils/icons";
	
	export default {
		name: "ssf-icon",
		
		components: { SsfLineAwesomeIcon, SsfFontAwesomeIcon },
		
		props: {
			
			/* ICON TYPE */
			type    : { type: String, required: false, default: 'fa' },
			fa      : { type: Boolean, required: false, default: false },
			la      : { type: Boolean, required: false, default: false },
			material: { type: Boolean, required: false, default: false },
			
			/* STRONG */
			// FONT AND LINE AWESOME
			solid  : { type: Boolean, required: false, default: false },
			regular: { type: Boolean, required: false, default: false },
			light  : { type: Boolean, required: false, default: false },
			thin   : { type: Boolean, required: false, default: false },
			duotone: { type: Boolean, required: false, default: false },
			normal : { type: Boolean, required: false, default: false },
			brand  : { type: Boolean, required: false, default: false },
			
			// MATERIAL
			outlined: { type: Boolean, required: false, default: true },
			rounded : { type: Boolean, required: false, default: false },
			filled  : { type: Boolean, required: false, default: false },
			twoTone : { type: Boolean, required: false, default: false },
			sharp   : { type: Boolean, required: false, default: false },
			
			// COMPATIBILITY OLD VERSION
			weight: { type: String, required: false },
			
			/* ICON */
			icon: { type: String, required: true, validator: (value) => Icons.fontAwesome.includes(value) || true },
			size: { type: String, required: false, default: '' },
			
			/* FONT AWESOME */
			fw      : { type: Boolean, required: false, default: false },
			animated: { type: Boolean, required: false, default: false },
			rotate  : { type: String, required: false, default: '' },
			pull    : { required: false, default: false }
		},
		
		data() {
			return {
				options: {
					regular : false,
					solid   : false,
					light   : false,
					thin   : false,
					duotone : false,
					normal  : false,
					brand   : false,
					outlined: false,
					rounded : false,
					filled  : false,
					twoTone : false,
					sharp   : false,
				}
			}
		},
		
		watch: {
			icon() {
				return this.$forceUpdate()
			},
			
			weight() {
				return this.initWeight()
			}
		},
		
		mounted() {
			return this.initWeight()
		},
		
		computed: {
			isFontAwesome() {
				return !this.isLineAwesome && !this.isMaterial && this.type === 'fa' || this.fa
			},
			
			isLineAwesome() {
				return this.type === 'la' || this.la
			},
			
			isMaterial() {
				return this.type === 'material' || this.material
			}
		},
		
		methods: {
			initWeight() {
				const weights = [
					'regular',
					'solid',
					'light',
					'thin',
					'duotone',
					'normal',
					'brand',
					'outline',
					'rounded',
					'filled',
					'twoTone',
					'sharp',
				]
				
				if (this.weight)
					this.options[this.weight] = true
				else
					for (let weight of weights)
						this.options[weight] = this[weight]
				this.$forceUpdate()
			}
		}
	}
</script>

<style>
	
	.fa-1x5,
	.la-1x5 {
		font-size: 1.5em !important;
	}

</style>
