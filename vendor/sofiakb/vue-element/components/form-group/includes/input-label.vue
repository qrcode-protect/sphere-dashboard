<template>
	<label v-if="showLabel" :class="{active, 'label-required': $parent.$parent.required}" class="ssf__input-label" @click="$emit('label-click')">
		<ssf-icon
				v-if="icon"
				:icon="icon.icon"
				:size="icon.size"
				:type="icon.type"
				:weight="icon.weight"
				class="space-icon"/>
		<span v-html="label"></span>
		<slot/>
	</label>
</template>

<script>

	export default {
		name: "ssf-input-label",

		emits: [ 'label-click' ],

		components: {},

		props: {
			label      : { type: [ String ], required: true },
			placeholder: { type: [ String, Boolean ] },
			icon       : { type: [ String, Boolean, Object ] },
		},

		computed: {
			active() {
				if (this.$parent.focused || !!this.placeholder)
					return true;

				if (this.$parent.$parent.select && this.$parent.$parent.multiple)
					return Array.isArray(this.$parent.$parent.value) && this.$parent.$parent.value.length > 0;

				if (this.$parent.$parent.type === 'number')
					return ((this.$parent.$parent.value || this.$parent.$parent.value === 0) && this.$parent.$parent.value.toString().trim() !== '');

				return (this.$parent.$parent.value && ((typeof this.$parent.$parent.value === "string" && this.$parent.$parent.value.trim() !== '') || typeof this.$parent.$parent.value !== "string"))
			},

			showLabel() {
				return this.label && this.placeholder !== true
			}

		}

	}
</script>

<style lang="scss" scoped>
	.ssf__input-label {
		margin-bottom: 0 !important;

		.space-icon {
			margin-right: 5px;
		}
	}
</style>
