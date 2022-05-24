<template>
	<ssf-container name="partners">
		<h1>Welcome to Your Vue.js + TypeScript App</h1>

        <router-link :to="{name: 'partners.create'}">Ajouter un partenaire</router-link>

        <button>Ajouter un partenaire</button>
	</ssf-container>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { useMeta }         from "vue-meta";

	export default defineComponent({
		name: "partners-index",

		components: {},

		setup() {
			////////// init
			useMeta({ title: 'Partenaires', })


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
