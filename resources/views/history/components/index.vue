<template>
	<ssf-container name="history">

        <page-title title="historique des conversations"/>

        <list-conversations :conversations="conversations" v-if="hasConversations"/>

	</ssf-container>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from "vue";
	import { useMeta }                    from "vue-meta";
    import PageTitle                      from "@/components/commons/partials/page-title.vue";
    import { useConversations }           from "@app/modules/conversation/conversation-module";
    import ListConversations
                                          from "@/views/history/components/includes/list-conversations/list-conversations.vue";

	export default defineComponent({
		name: "example-index",

		components: { ListConversations, PageTitle },

		setup() {
			////////// init
			useMeta({ title: 'Historique des conversations', })


			const {conversations, hasConversations, fetchAllConversations,} = useConversations()

            onMounted(() => fetchAllConversations())


			return {
				//// conversation module
                conversations,
                hasConversations
			}
		},
	})
</script>

<style lang="scss" scoped>

</style>
