<template>
	<ssf-container name="rfa">

        <under-construction/>

	</ssf-container>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { useMeta }         from "vue-meta";
    import UnderConstruction   from "@/components/commons/under-construction.vue";

	export default defineComponent({
		name: "rfa-index",

		components: { UnderConstruction },

		setup() {
			////////// init
			useMeta({ title: 'RFA', })


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
