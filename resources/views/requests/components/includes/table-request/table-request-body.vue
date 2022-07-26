<template>
    <tbody class="table-request-body">

        <template v-for="request in requests">

            <table-request-row :request="request" @details="$emit('details', request)" @show-quotation="event => $emit('show-quotation', event)"/>

        </template>

    </tbody>
</template>

<script lang="ts">
    import { defineComponent, PropType } from "vue"

    import Request         from '@app/modules/request/request'
    import TableRequestRow from "./table-request-row.vue";

    export default defineComponent({
        name: "table-request-body",

        components: { TableRequestRow },

        props: {
            requests: { type: Array as PropType<Request[]>, required: true },
        },

        emits: [ 'details', 'show-quotation' ],

        setup() {
            ////////// init

            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>

