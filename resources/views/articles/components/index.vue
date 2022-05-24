<template>
	<ssf-container name="articles">

        Il n'y a rien à voir pour le moment !

	</ssf-container>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { useMeta }         from "vue-meta";

	export default defineComponent({
		name: "articles-index",

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
