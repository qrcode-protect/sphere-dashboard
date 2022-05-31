<template>
    <ssf-container name="networks">
        <!--        {{ regions }}-->

        <page-title title="Réseaux"/>

        <ssf-container container>

            <france-map @selected="onSelected"/>

            <!--            <ssf-container class="border rounded table-container mx-auto" not-full>

                            <table class="table table-sm table-striped mb-0 table-networks">

                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Région</th>
                                        <th class="text-center" colspan="2">
                                            <ssf-icon class="cursor-pointer" icon="plus-circle"
                                                      @click="modals.networks.open = true"/>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    <tr v-for="(networks, $idx) in networks">
                                        <td>{{ $idx + 1 }}</td>
                                        <td>{{ networks.name.capitalize() }}</td>
                                        <td class="text-center" colspan="2">
                                            <ssf-icon class="mx-2 cursor-pointer" icon="eyes" @click="onShowDepartments(networks)"/>
                                        </td>
                                    </tr>

                                </tbody>

                            </table>

                        </ssf-container>-->

        </ssf-container>


        <modal-departments v-if="modals.network.open"
                           :modal-name="modals.network.name"
                           :network="modals.network.props.network"
                           :open="modals.network.open"
                           @close="modals.network.open = false"/>

    </ssf-container>
</template>

<script lang="ts">
    import { computed, defineComponent, onMounted, reactive } from "vue";
    import { useMeta }                                        from "vue-meta";
    import { useStore }                                       from "vuex";
    import PageTitle                                          from "@/components/commons/partials/page-title.vue";
    import Network                                            from "@app/modules/_network/network/network";
    import ModalDepartments                                   from "@/views/networks/components/modal-departments.vue";
    import { filter, groupBy, map, sortBy }                   from "lodash";
    import departments                                        from "@/assets/data/departments";
    import FranceMap                                          from "@/components/france-map/france-map.vue";
    import { MainError }                                      from "@app/vue/utils/swal";
    import { fetchNetworks }                                  from "@app/modules/_network/utils/networks";

    export default defineComponent({
        name: "networks-index",

        components: { FranceMap, ModalDepartments, PageTitle },

        setup() {
            ////////// init
            useMeta({ title: 'Réseaux', })
            const store = useStore()

            onMounted(async () => await fetchNetworks(true))


            ////////// data
            const modals = reactive({
                network: {
                    open : false,
                    name : 'modal-network',
                    props: <{ network: Network | null }>{
                        network: null
                    }
                }
            })


            ////////// computed
            const networks = computed(() => store.getters['network/networks'])
            const regions = computed(() => {
                return sortBy(map(groupBy(departments, 'region_name'), (item, key) => {
                    console.log(key)
                    return {
                        name       : key,
                        departments: sortBy(map(item, department => ({
                            code: department.num_dep.toString(),
                            name: department.dep_name
                        })), 'code'),
                    }
                }), 'name');
            })


            ////////// methods


            return {
                //// data
                modals,

                //// computed
                networks,
                regions,

                //// methods
            }
        },

        methods: {

            onShowDepartments(network: Network) {
                this.modals.network.props.network = network
                this.modals.network.open = true
            },

            onSelected(region: string | undefined) {
                if (region) {
                    const network = filter(this.networks, item => item.id === region)[0] ?? null
                    if (network === null) {
                        MainError.fire({ text: "Une erreur est survenue, merci de contacter le support informatique." })
                    } else this.onShowDepartments(network)
                }
            }

        }
    })
</script>

<style lang="scss" scoped>

    .ssf__section--networks {

        .table-container {

            width: 600px;

            .table-networks {
                border-collapse: separate;
                border-spacing: 0;

                tbody tr:last-child {

                    td:first-child {
                        border-bottom-left-radius: var(--border-radius, 50px);
                    }

                    td:last-child {
                        border-bottom-right-radius: var(--border-radius, 50px);
                    }
                }

            }

        }

    }

</style>
