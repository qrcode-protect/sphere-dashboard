<template>
    <tr class="table-request-row box-ite">

        <td v-for="key in tableKeys" :class="{'text-center': key.center}">
            <span v-html="key.casts ? key.casts(request[key.prop]) : request[key.prop]"/>
        </td>
        <td>
            <vue-popper :content="requestStatusPopper" hover>
                <ssf-icon :class="requestStatusColor" :icon="requestStatusIcon" light/>
            </vue-popper>
        </td>

        <td>

            <vue-popper :interactive="false" arrow>

                <ssf-icon class="cursor-pointer" icon="ellipsis" light size="lg"/>

                <template #content>

                    <ul class="request-action fa-ul">
                        <li class="py-1" @click="$emit('details')">
                            <span class="fa-li">
                                <ssf-icon class="color-2" duotone icon="eye"/>
                            </span>Afficher les détails
                        </li>
                        <li v-if="request.quote" class="py-1" @click="$emit('show-quotation', request.quote)">
                            <span class="fa-li">
                                <ssf-icon class="color-2" duotone icon="file-pdf"/>
                            </span>Voir le devis
                        </li>
                        <li v-if="request.pending" class="py-1" @click="declineRequest">
                            <span class="fa-li">
                                <ssf-icon class="color-2" duotone icon="times"/>
                            </span>Refuser
                        </li>
                        <!--                        <li class="py-1" @click="fetchAccepted">Acceptées</li>-->
                        <!--                        <li class="py-1" @click="fetchDeclined">Refusées</li>-->
                        <!--                        <li class="py-1" @click="fetchPending">En attente</li>-->
                    </ul>

                </template>

            </vue-popper>
        </td>

    </tr>
</template>

<script lang="ts">
    import { computed, defineComponent, watch } from "vue"
    import Request                              from "@app/modules/request/request";
    import { useRequest }                       from "@app/modules/request/request-module";

    import VuePopper from 'vue3-popper'

    export default defineComponent({

        name: "table-request-row",

        props: {
            request: { type: Request, required: true }
        },

        components: { VuePopper },

        emits: [ 'details', 'show-quotation' ],

        setup(props) {
            ////////// init

            const { tableKeys, declineRequest, setRequest } = useRequest(props.request)
            // const { downloadQuotation } = useQuotation(props.request.quote)

            const requestStatusIcon = computed(() => props.request.accepted ? props.request.quote?.accepted ? 'check' : props.request.quote?.isPending() ? 'hourglass' : 'times' : props.request.declined ? 'times' : 'question-circle');
            const requestStatusPopper = computed(() => props.request.accepted ? props.request.quote?.accepted ? 'Terminé' : props.request.quote?.isPending() ? 'Attente du client' : 'Refusé (client)' : props.request.declined ? 'Refusé (fournisseur)' : 'Attente du fournisseur');
            const requestStatusColor = computed(() => props.request.accepted ? 'text-success' : props.request.declined ? 'text-danger' : 'text-warning');


            watch(() => props.request, () => setRequest(props.request), { immediate: true })

            return {
                //// request module
                tableKeys,
                declineRequest,

                requestStatusIcon,
                requestStatusColor,
                requestStatusPopper,

                //// quotation module
                // downloadQuotation
            }
        }
    })
</script>

<style lang="scss" scoped>

    :deep(.popper) {
        border-radius: var(--border-radius);
    }

    .request-action {
        list-style: none;
        padding-left: 0 !important;

        li {
            cursor: pointer;

            &:hover {
                color: var(--color-2)
            }

            //border-bottom: 1px solid #ddd;
        }
    }

</style>

