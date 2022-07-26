<template>
    <thead class="table-request-head">

        <tr>

            <th v-for="key in tableKeys" :class="{'text-center': key.center}">
                {{ key.label }}
            </th>

            <th>

                <vue-popper :interactive="false" arrow>

                    <ssf-icon class="cursor-pointer" icon="filter" light size="lg"/>

                    <template #content>

                        <ul class="request-filter fa-ul">
                            <li v-for="filter in filters" :class="{'color-2': routeName === filter.route}" class="py-2 pr-2"
                                @click="executeFilterMethod(filter)">
                                <span class="fa-li">
                                    <ssf-icon :icon="filter.icon" class="color-2" duotone/>
                                </span>{{ filter.label }}
                            </li>
                        </ul>

                    </template>

                </vue-popper>
            </th>

            <th>

                <ssf-icon class="cursor-pointer" icon="cogs" light/>

            </th>

        </tr>

    </thead>
</template>

<script lang="ts">
    import { defineComponent, ref, watch } from "vue"
    import TableRequestRow                 from "./table-request-row.vue";
    import { useRequest }                  from "@app/modules/request/request-module";

    import VuePopper               from "vue3-popper";
    import { useRoute, useRouter } from "vue-router";
    import { Nullable }            from "../../../../../../types/nullable";


    export default defineComponent({
        name: "table-request-head",

        components: { TableRequestRow, VuePopper },

        setup() {
            ////////// init
            const router = useRouter()
            const route = useRoute()
            const executeFilterMethod = (filter: any) => {
                if (filter.route) {
                    return router.push({ name: filter.route })
                } else return filter.method()
            }

            const {
                tableKeys,
                fetchTerminated,
                fetchDeniedByMember
            } = useRequest()

            const routeName = ref<Nullable<string>>(null)

            watch(() => route.name, () => routeName.value = route.name?.toString(), { immediate: true })

            return {
                tableKeys,
                fetchTerminated,
                fetchDeniedByMember,

                executeFilterMethod,

                routeName,

                filters: [
                    { route: 'history.requests', icon: 'list', label: 'Toutes les demandes' },
                    { route: 'history.requests.accepted', icon: 'check', label: 'Acceptées' },
                    { route: 'history.requests.declined', icon: 'times', label: 'Refusées' },
                    { route: 'history.requests.pending', icon: 'hourglass', label: 'En attente' },
                    { route: 'history.requests.terminated', icon: 'check-double', label: 'Terminées' },
                    { route: 'history.requests.denied-by-member', icon: 'ban', label: 'Refusées par le client' },
                ]
            }
        },
    })
</script>

<style lang="scss" scoped>

    .request-filter {
        list-style: none;
        padding-left: 0 !important;

        li {
            cursor: pointer;
            border-bottom: 1px solid #ddd;

            &:hover,
            &.selected {
                color: var(--color-2);
            }
        }
    }

</style>

