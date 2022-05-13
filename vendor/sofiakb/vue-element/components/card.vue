<template>
	<div class="card">

		<ssf-container v-if="hasSlot('header')"
									 :class="headerClass"
									 class="card-header"
									 name="card-header">
			<slot name="header"/>
		</ssf-container>

		<ssf-container v-if="hasSlot('body')"
									 :class="bodyClass"
									 class="card-body"
									 name="card-body">
			<slot name="body"/>
		</ssf-container>

		<ssf-container v-if="hasSlot('footer')"
									 :class="footerClass"
									 class="card-footer"
									 name="card-footer">
			<slot name="footer"/>
		</ssf-container>

	</div>
</template>

<script>

	import { defineComponent } from "vue";
	import { hasSlot }         from "@sofiakb/vue-element/utils";

	export default defineComponent({
		name: 'ssf-card',

		props: {
			headerClass: { type: [ String, null ], required: false, default: null },
			bodyClass  : { type: [ String, null ], required: false, default: null },
			footerClass: { type: [ String, null ], required: false, default: null },
		},

		methods: {
			hasSlot(name = 'default') {
				return hasSlot(this, name)
			},
		}
	})
</script>

<style scoped>

</style>
