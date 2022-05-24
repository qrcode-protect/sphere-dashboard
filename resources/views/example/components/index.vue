<template>
	<ssf-container name="example">
		<h1>Welcome to Your Vue.js + TypeScript App</h1>
	</ssf-container>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { useMeta }         from "vue-meta";

	export default defineComponent({
		name: "example-index",

		components: {},

		setup() {
			////////// init
			useMeta({ title: 'Example', })


			////////// data


			////////// computed


			////////// methods


			return {
				//// data

				//// computed

				//// methods
			}
		},
	})
</script>

<style lang="scss" scoped>

</style>
